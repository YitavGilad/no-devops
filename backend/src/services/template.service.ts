import fs from 'fs-extra';
import path from 'path';
import { CreateRepoParams } from '../types/github.types';

export class TemplateService {
  private templatesDir: string;

  constructor() {
    // In development, templates are in src/templates
    // In production, templates are copied to dist/templates
    const isDevelopment = process.env.NODE_ENV === 'development';
    const baseDir = isDevelopment ? 'src' : 'dist';
    this.templatesDir = path.join(process.cwd(), baseDir, 'templates');
    
    // Ensure templates directory exists
    if (!fs.existsSync(this.templatesDir)) {
      throw new Error(`Templates directory not found: ${this.templatesDir}`);
    }
  }

  /**
   * Get the appropriate template directory for a framework
   */
  private getTemplateDir(language: string, framework: string): string {
    return path.join(this.templatesDir, language, framework);
  }

  /**
   * Read a template file and return its contents
   */
  private readTemplateFile(templatePath: string): string {
    try {
      return fs.readFileSync(templatePath, 'utf-8');
    } catch (error) {
      console.error(`Error reading template file ${templatePath}:`, error);
      throw new Error(`Failed to read template file: ${templatePath}`);
    }
  }

  /**
   * Get Dockerfile content for the specified framework
   */
  public getDockerfile(params: CreateRepoParams): string {
    const templatePath = path.join(
      this.getTemplateDir(params.language, params.framework),
      'Dockerfile'
    );
    return this.readTemplateFile(templatePath);
  }

  /**
   * Get docker-compose.yml content for the specified framework
   */
  public getDockerCompose(params: CreateRepoParams): string {
    const templatePath = path.join(
      this.getTemplateDir(params.language, params.framework),
      'docker-compose.yml'
    );
    return this.readTemplateFile(templatePath);
  }

  /**
   * Get GitHub Actions workflow content for the specified framework
   */
  public getWorkflow(params: CreateRepoParams): string {
    const templatePath = path.join(
      this.getTemplateDir(params.language, params.framework),
      '.github',
      'workflows',
      'ci.yml'
    );
    return this.readTemplateFile(templatePath);
  }

  /**
   * Get nginx.conf content for web applications
   */
  public getNginxConfig(params: CreateRepoParams): string | null {
    if (params.language === 'javascript') {
      const templatePath = path.join(
        this.getTemplateDir(params.language, params.framework),
        'nginx.conf'
      );
      return this.readTemplateFile(templatePath);
    }
    return null;
  }
}
