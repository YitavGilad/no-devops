import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';

// Load environment variables
dotenv.config();

// Environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;

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

interface GitLabProject {
  id: number;
  name: string;
  name_with_namespace: string;
  path_with_namespace: string;
  description: string | null;
  web_url: string;
  created_at: string;
  last_activity_at: string;
  visibility: 'private' | 'internal' | 'public';
}

// GitHub: List Repositories
async function listGitHubRepos(): Promise<void> {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN is not set in environment variables');
    return;
  }

  try {
    const response: AxiosResponse<GitHubRepo[]> = await axios.get(
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

    response.data.forEach((repo, index) => {
      const privacy = repo.private ? '🔒' : '🌍';
      const language = repo.language ? `[${repo.language}]` : '[No language]';
      console.log(`${index + 1}. ${privacy} ${repo.full_name} ${language}`);
      if (repo.description) {
        console.log(`   📝 ${repo.description}`);
      }
      console.log(`   🔗 ${repo.html_url}`);
      console.log('');
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ GitHub API Error:', error.response?.status, error.response?.statusText);
      if (error.response?.status === 401) {
        console.error('   Check your GITHUB_TOKEN - it may be invalid or expired');
      }
    } else {
      console.error('❌ Unexpected error fetching GitHub repos:', error);
    }
  }
}

// GitLab: List Projects
async function listGitLabRepos(): Promise<void> {
  if (!GITLAB_TOKEN) {
    console.error('❌ GITLAB_TOKEN is not set in environment variables');
    return;
  }

  try {
    const response: AxiosResponse<GitLabProject[]> = await axios.get(
      'https://gitlab.com/api/v4/projects',
      {
        headers: {
          'PRIVATE-TOKEN': GITLAB_TOKEN
        },
        params: {
          membership: true,
          order_by: 'last_activity_at',
          sort: 'desc',
          per_page: 100
        }
      }
    );

    console.log('\n🦊 GitLab Projects:');
    console.log('━'.repeat(50));
    
    if (response.data.length === 0) {
      console.log('No projects found');
      return;
    }

    response.data.forEach((project, index) => {
      const visibilityIcon = {
        private: '🔒',
        internal: '🏢',
        public: '🌍'
      }[project.visibility] || '❓';
      
      console.log(`${index + 1}. ${visibilityIcon} ${project.name_with_namespace}`);
      if (project.description) {
        console.log(`   📝 ${project.description}`);
      }
      console.log(`   🔗 ${project.web_url}`);
      console.log('');
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ GitLab API Error:', error.response?.status, error.response?.statusText);
      if (error.response?.status === 401) {
        console.error('   Check your GITLAB_TOKEN - it may be invalid or expired');
      }
    } else {
      console.error('❌ Unexpected error fetching GitLab projects:', error);
    }
  }
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
  
  if (GITLAB_TOKEN) {
    promises.push(listGitLabRepos());
  } else {
    console.log('⚠️  Skipping GitLab - GITLAB_TOKEN not provided');
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

export { listGitHubRepos, listGitLabRepos, main };