import { CreateRepoParams } from '../types/github.types';

interface FrameworkConfig {
  buildCommand: string;
  startCommand: string;
  dependencies: string[];
  devDependencies: string[];
  port: number;
}

export class FrameworkService {
  private frameworkConfigs: Record<string, Record<string, FrameworkConfig>> = {
    javascript: {
      react: {
        buildCommand: 'npm run build',
        startCommand: 'npm run dev',
        dependencies: ['react', 'react-dom'],
        devDependencies: ['@vitejs/plugin-react', 'vite'],
        port: 3000
      },
      nextjs: {
        buildCommand: 'npm run build',
        startCommand: 'npm run dev',
        dependencies: ['next', 'react', 'react-dom'],
        devDependencies: ['@types/react', '@types/react-dom', 'typescript'],
        port: 3000
      },
      angular: {
        buildCommand: 'ng build',
        startCommand: 'ng serve',
        dependencies: ['@angular/core', '@angular/platform-browser-dynamic'],
        devDependencies: ['@angular/cli', '@angular/compiler-cli'],
        port: 4200
      },
      vue: {
        buildCommand: 'npm run build',
        startCommand: 'npm run dev',
        dependencies: ['vue'],
        devDependencies: ['@vitejs/plugin-vue', 'vite'],
        port: 3000
      }
    },
    python: {
      fastapi: {
        buildCommand: 'pip install -r requirements.txt',
        startCommand: 'uvicorn app.main:app --reload',
        dependencies: ['fastapi', 'uvicorn[standard]', 'pydantic'],
        devDependencies: ['pytest', 'black', 'isort'],
        port: 8000
      },
      flask: {
        buildCommand: 'pip install -r requirements.txt',
        startCommand: 'flask run --reload',
        dependencies: ['flask', 'python-dotenv'],
        devDependencies: ['pytest', 'black', 'isort'],
        port: 5000
      },
      django: {
        buildCommand: 'pip install -r requirements.txt',
        startCommand: 'python manage.py runserver',
        dependencies: ['django', 'djangorestframework'],
        devDependencies: ['pytest-django', 'black', 'isort'],
        port: 8000
      }
    },
    java: {
      'spring-boot': {
        buildCommand: './mvnw package',
        startCommand: './mvnw spring-boot:run',
        dependencies: [
          'org.springframework.boot:spring-boot-starter-web',
          'org.springframework.boot:spring-boot-starter-data-jpa'
        ],
        devDependencies: [
          'org.springframework.boot:spring-boot-devtools',
          'org.springframework.boot:spring-boot-starter-test'
        ],
        port: 8080
      },
      quarkus: {
        buildCommand: './mvnw package',
        startCommand: './mvnw quarkus:dev',
        dependencies: [
          'io.quarkus:quarkus-resteasy-reactive',
          'io.quarkus:quarkus-hibernate-orm-panache'
        ],
        devDependencies: [
          'io.quarkus:quarkus-junit5',
          'io.rest-assured:rest-assured'
        ],
        port: 8080
      },
      micronaut: {
        buildCommand: './gradlew build',
        startCommand: './gradlew run',
        dependencies: [
          'io.micronaut:micronaut-http-server-netty',
          'io.micronaut.data:micronaut-data-hibernate-jpa'
        ],
        devDependencies: [
          'io.micronaut.test:micronaut-test-junit5',
          'org.junit.jupiter:junit-jupiter-api'
        ],
        port: 8080
      }
    }
  };

  /**
   * Get configuration for a specific framework
   */
  public getFrameworkConfig(params: CreateRepoParams): FrameworkConfig {
    const config = this.frameworkConfigs[params.language]?.[params.framework];
    if (!config) {
      throw new Error(`No configuration found for ${params.language}/${params.framework}`);
    }
    return config;
  }

  /**
   * Generate package.json for JavaScript projects
   */
  public generatePackageJson(params: CreateRepoParams): string | null {
    if (params.language !== 'javascript') {
      return null;
    }

    const config = this.getFrameworkConfig(params);
    return JSON.stringify({
      name: params.name,
      version: '0.1.0',
      private: true,
      scripts: {
        dev: config.startCommand,
        build: config.buildCommand,
        test: 'vitest run',
        lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0'
      },
      dependencies: Object.fromEntries(
        config.dependencies.map(dep => [dep, 'latest'])
      ),
      devDependencies: Object.fromEntries(
        config.devDependencies.map(dep => [dep, 'latest'])
      )
    }, null, 2);
  }

  /**
   * Generate requirements.txt for Python projects
   */
  public generateRequirementsTxt(params: CreateRepoParams): string | null {
    if (params.language !== 'python') {
      return null;
    }

    const config = this.getFrameworkConfig(params);
    return [...config.dependencies, ...config.devDependencies].join('\n');
  }

  /**
   * Generate pom.xml for Java projects using Maven
   */
  public generatePomXml(params: CreateRepoParams): string | null {
    if (params.language !== 'java' || params.framework === 'micronaut') {
      return null;
    }

    const config = this.getFrameworkConfig(params);
    return `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>${params.name}</artifactId>
    <version>0.1.0</version>

    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>\${java.version}</maven.compiler.source>
        <maven.compiler.target>\${java.version}</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        ${config.dependencies.map(dep => `
        <dependency>
            <groupId>${dep.split(':')[0]}</groupId>
            <artifactId>${dep.split(':')[1]}</artifactId>
        </dependency>`).join('\n')}
        
        ${config.devDependencies.map(dep => `
        <dependency>
            <groupId>${dep.split(':')[0]}</groupId>
            <artifactId>${dep.split(':')[1]}</artifactId>
            <scope>test</scope>
        </dependency>`).join('\n')}
    </dependencies>
</project>`;
  }

  /**
   * Generate build.gradle for Micronaut projects
   */
  public generateBuildGradle(params: CreateRepoParams): string | null {
    if (params.language !== 'java' || params.framework !== 'micronaut') {
      return null;
    }

    const config = this.getFrameworkConfig(params);
    return `plugins {
    id 'io.micronaut.application' version '3.7.2'
}

version = "0.1.0"
group = "com.example"

repositories {
    mavenCentral()
}

dependencies {
    ${config.dependencies.map(dep => 
      `implementation '${dep}'`
    ).join('\n    ')}
    
    ${config.devDependencies.map(dep => 
      `testImplementation '${dep}'`
    ).join('\n    ')}
}

application {
    mainClass.set("com.example.Application")
}

java {
    sourceCompatibility = JavaVersion.toVersion("17")
    targetCompatibility = JavaVersion.toVersion("17")
}`;
  }
}
