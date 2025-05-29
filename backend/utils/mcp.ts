import * as dotenv from 'dotenv';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
dotenv.config();

// Environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;


// Type definitions
interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  language: string | null;
}

interface CreateRepoOptions {
  name: string;
  description?: string;
  private?: boolean;
  auto_init?: boolean;
}

interface FileToUpload {
  path: string;
  content: string;
}

interface GitHubTreeItem {
  path: string;
  mode: string;
  type: string;
  content: string;
}

interface GitHubTree {
  tree: GitHubTreeItem[];
}

// GitHub: List Repositories
async function listGitHubRepos():Promise<any> {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN is not set in environment variables');
    return;
  }

  try {
    const response:any = await axios.get(
      'https://api.github.com/user/repos',
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        },
        params: {
          sort: 'updated',
          per_page: 100
        }
      }
    );

    console.log('\n🐙 GitHub Repositories:');
    console.log('━'.repeat(50));
    
    if (response.data.length === 0) {
      console.log('No repositories found');
      return;
    }

    response.data.forEach((repo:any, index:any) => {
      const privacy = repo.private ? '🔒' : '🌍';
      const language = repo.language ? `[${repo.language}]` : '[No language]';
      console.log(`${index + 1}. ${privacy} ${repo.full_name} ${language}`);
      if (repo.description) {
        console.log(`   📝 ${repo.description}`);
      }
      console.log(`   🔗 ${repo.html_url}`);
      console.log('');
    });
  } catch (error:any) {
    if (error) {
        
      console.error('❌ GitHub API Error:', error.response?.status, error.response?.statusText);
      if (error.response?.status === 401) {
        console.error('   Check your GITHUB_TOKEN - it may be invalid or expired');
      }
    } else {
      console.error('❌ Unexpected error fetching GitHub repos:', error);
    }
  }
}

// GitHub: Create Repository
async function createGitHubRepo(options: CreateRepoOptions): Promise<GitHubRepo | null> {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN is not set in environment variables');
    return null;
  }

  try {
    const response: any = await axios.post(
      'https://api.github.com/user/repos',
      {
        name: options.name,
        description: options.description || '',
        private: options.private || false,
        auto_init: options.auto_init || false
      },
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    );

    console.log(`✅ Repository '${options.name}' created successfully!`);
    console.log(`🔗 ${response.data.html_url}`);
    return response.data;
  } catch (error:any) {
    if (error){
      console.error('❌ GitHub API Error creating repo:', error.response?.status, error.response?.statusText);
      if (error.response?.data?.message) {
        console.error(`   Message: ${error.response.data.message}`);
      }
    } else {
      console.error('❌ Unexpected error creating GitHub repo:', error);
    }
    return null;
  }
}

// Helper function to read files from a directory
function readFilesFromDirectory(dirPath: string): FileToUpload[] {
  const files: FileToUpload[] = [];
  
  function readDirRecursive(currentPath: string, basePath: string = '') {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const relativePath = basePath ? path.join(basePath, item) : item;
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules, .git, and other common directories
        if (!['node_modules', '.git', '.DS_Store', 'dist', 'build'].includes(item)) {
          readDirRecursive(fullPath, relativePath);
        }
      } else {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          files.push({
            path: relativePath.replace(/\\/g, '/'), // Normalize path separators
            content
          });
        } catch (error) {
          console.warn(`⚠️  Could not read file ${fullPath}:`, error);
        }
      }
    }
  }
  
  readDirRecursive(dirPath);
  return files;
}

// GitHub: Push files to repository
async function pushFilesToGitHubRepo(repoName: string, files: FileToUpload[], commitMessage: string = 'Initial commit'): Promise<boolean> {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN is not set in environment variables');
    return false;
  }

  try {
    // Get the current user to construct the repo path
    const userResponse:any = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    
    const username = userResponse.data.login;
    const repoPath = `${username}/${repoName}`;

    // Get the default branch (usually 'main' or 'master')
    const repoResponse:any = await axios.get(`https://api.github.com/repos/${repoPath}`, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const defaultBranch = repoResponse.data.default_branch;
    let baseSha: string | null = null;

    // Try to get the latest commit SHA (for existing repos)
    try {
      const branchResponse:any = await axios.get(`https://api.github.com/repos/${repoPath}/git/refs/heads/${defaultBranch}`, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      baseSha = branchResponse.data.object.sha;
    } catch (error) {
      // Repository might be empty, which is fine
      console.log('📝 Repository appears to be empty, creating initial commit');
    }

    // Create a tree with all files
    const tree: GitHubTreeItem[] = files.map(file => ({
      path: file.path,
      mode: '100644',
      type: 'blob',
      content: file.content
    }));

    const treeResponse:any = await axios.post(`https://api.github.com/repos/${repoPath}/git/trees`, {
      tree,
      base_tree: baseSha
    }, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const treeSha = treeResponse.data.sha;

    // Create a commit
    const commitData: any = {
      message: commitMessage,
      tree: treeSha
    };

    if (baseSha) {
      commitData.parents = [baseSha];
    }

    const commitResponse:any = await axios.post(`https://api.github.com/repos/${repoPath}/git/commits`, commitData, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const commitSha = commitResponse.data.sha;

    // Update the reference (branch)
    await axios.patch(`https://api.github.com/repos/${repoPath}/git/refs/heads/${defaultBranch}`, {
      sha: commitSha
    }, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    console.log(`✅ Successfully pushed ${files.length} files to ${repoName}`);
    console.log(`📝 Commit: ${commitMessage}`);
    return true;
  } catch (error:any) {
    if (error) {
      console.error('❌ GitHub API Error pushing files:', error.response?.status, error.response?.statusText);
      if (error.response?.data?.message) {
        console.error(`   Message: ${error.response.data.message}`);
      }
    } else {
      console.error('❌ Unexpected error pushing files:', error);
    }
    return false;
  }
}

// GitHub: Create repository and push files
async function createRepoAndPushFiles(
  repoName: string,
  filesOrDirectory: string | FileToUpload[],
  options: {
    description?: string;
    private?: boolean;
    commitMessage?: string;
  } = {}
): Promise<boolean> {
  console.log(`🚀 Creating repository '${repoName}' and pushing files...`);

// Then in createRepoAndPushFiles, modify the call:
const repo = await createGitHubRepo({
    name: repoName,
    description: options.description || '',  
    private: options.private || false,
    auto_init: false
  });

  if (!repo) {
    console.error('❌ Failed to create repository');
    return false;
  }

  // Prepare files
  let files: FileToUpload[];
  if (typeof filesOrDirectory === 'string') {
    // It's a directory path
    if (!fs.existsSync(filesOrDirectory)) {
      console.error(`❌ Directory not found: ${filesOrDirectory}`);
      return false;
    }
    console.log(`📁 Reading files from directory: ${filesOrDirectory}`);
    files = readFilesFromDirectory(filesOrDirectory);
  } else {
    // It's an array of files
    files = filesOrDirectory;
  }

  if (files.length === 0) {
    console.warn('⚠️  No files to push');
    return false;
  }

  console.log(`📤 Preparing to push ${files.length} files:`);
  files.forEach(file => console.log(`   - ${file.path}`));

  // Push files to the repository
  const success = await pushFilesToGitHubRepo(repoName, files, options.commitMessage || 'Initial commit');
  
  if (success) {
    console.log(`🎉 Repository '${repoName}' created and files pushed successfully!`);
    console.log(`🔗 https://github.com/${repo.full_name}`);
  }

  return success;
}

// Main execution function
async function main(): Promise<void> {
  console.log('🚀 Fetching Git repositories...');
  
  const promises = [];
  
  if (GITHUB_TOKEN) {
    promises.push(listGitHubRepos());
  } else {
    console.log('⚠️  Skipping GitHub - GITHUB_TOKEN not provided');
  }
  
  if (promises.length === 0) {
    console.error('❌ No tokens provided. Please set GITHUB_TOKEN and/or GITLAB_TOKEN in your .env file');
    process.exit(1);
  }
  
  try {
    await Promise.all(promises);
    console.log('✅ Repository listing completed!');
  } catch (error) {
    console.error('❌ Error during execution:', error);
    process.exit(1);
  }
}

// Execute if this file is run directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

export { 
  listGitHubRepos, 
  createGitHubRepo,
  pushFilesToGitHubRepo,
  createRepoAndPushFiles,
  main 
};