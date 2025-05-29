# Vibe Coding Generator 🚀

A smart project scaffolding tool that generates complete DevOps configurations so developers can focus on what they love most - writing code. Say goodbye to spending hours setting up Docker, Kubernetes, CI/CD pipelines, and deployment configurations for every new project.

## What Problem Does This Solve?

Every developer has experienced the frustration of starting a new project only to spend the first day (or week) configuring build tools, deployment pipelines, and infrastructure code instead of building their actual application. Vibe Coding Generator eliminates this friction by intelligently generating all the necessary configuration files based on your project requirements.

Think of it as having a DevOps expert on your team who instantly creates production-ready configurations tailored to your specific technology stack and deployment needs.

## How It Works

The application guides you through an intelligent questionnaire that adapts based on your previous answers. Instead of overwhelming you with every possible option upfront, it asks relevant questions at each step to understand exactly what you're building.

For example, when you select React as your frontend framework, the system understands to ask about state management preferences, routing needs, and deployment targets. If you choose Python with FastAPI, it automatically configures appropriate Docker settings, health checks, and Kubernetes resource limits optimized for Python applications.

The result is a complete project repository with everything you need to start coding immediately and deploy to production when ready.

## Technology Stack

**Frontend:** React with Vite for lightning-fast development and building
**Backend:** Node.js with Express for robust API handling and file generation
**Template Engine:** Custom intelligent templating system that understands technology dependencies
**Development Tools:** Comprehensive testing and validation systems

## Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your development machine:

- Node.js (version 18 or higher) - The runtime environment for both backend and frontend development
- npm (comes with Node.js) - Package manager for installing dependencies
- Git - Version control system for managing your codebase

### Installation

```bash
# Clone the repository to your local machine
git clone https://github.com/your-username/vibe-coding-generator.git
cd vibe-coding-generator

# Install dependencies for the entire project
npm install

# Set up the backend server
cd backend
npm install
cd ..

# Set up the frontend application  
cd frontend
npm install
cd ..
```

### Running the Development Environment

```bash
# Start both frontend and backend in development mode
# This command runs both servers concurrently with hot reloading
npm run dev

# Alternatively, you can run them separately:
# Backend server (runs on port 5000)
npm run dev:backend

# Frontend development server (runs on port 3000)
npm run dev:frontend
```

After running these commands, open your browser and navigate to `http://localhost:3000` to access the application interface.

## Project Structure

Understanding the project structure helps you navigate the codebase and contribute effectively:

```
vibe-coding-generator/
├── backend/                    # Node.js server and API logic
│   ├── src/
│   │   ├── controllers/       # API endpoint handlers
│   │   ├── services/          # Business logic and file generation
│   │   ├── templates/         # Configuration file templates
│   │   ├── utils/             # Helper functions and utilities
│   │   └── validators/        # Input validation logic
│   ├── tests/                 # Backend test files
│   └── package.json
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Main application pages
│   │   ├── services/          # API communication logic
│   │   ├── store/             # State management
│   │   └── utils/             # Frontend helper functions
│   ├── public/                # Static assets
│   └── package.json
└── shared/                     # Common configuration and types
```

## How to Use the Application

### Step 1: Project Basics
Start by providing fundamental information about your project including the project name, description, and primary programming language. The application uses this information to make intelligent suggestions for subsequent configuration options.

### Step 2: Technology Stack Selection
Choose your frontend framework, backend technology, database preferences, and any additional services like caching or message queues. The system understands how these technologies work together and will configure them appropriately.

### Step 3: Deployment Configuration
Specify your deployment target whether it's cloud platforms like AWS, Google Cloud, or Azure, containerization preferences, and scaling requirements. The application generates optimized configurations for your chosen deployment strategy.

### Step 4: Development Workflow
Configure your preferred development tools including linting rules, testing frameworks, CI/CD pipeline preferences, and code formatting standards. This ensures consistency across your development team.

### Step 5: Generation and Download
Review your selections and let the application generate a complete project structure with all necessary configuration files. Download the generated project as a ZIP file or have it automatically pushed to a new Git repository.

## Supported Technologies

The application currently supports a comprehensive range of modern development technologies:

**Frontend Frameworks:** React, Vue.js, Angular, Svelte, and vanilla JavaScript with modern build tools
**Backend Technologies:** Node.js (Express, Fastify), Python (FastAPI, Django, Flask), Java (Spring Boot), Go, and PHP
**Databases:** PostgreSQL, MySQL, MongoDB, Redis for caching, and SQLite for development
**Deployment Platforms:** AWS, Google Cloud Platform, Azure, DigitalOcean, and traditional VPS hosting
**Container Technologies:** Docker with optimized multi-stage builds and Kubernetes with production-ready manifests

## Contributing

We welcome contributions from developers who want to help improve the project and add support for new technologies.

### Development Setup

```bash
# Fork the repository and clone your fork
git clone https://github.com/your-username/vibe-coding-generator.git
cd vibe-coding-generator

# Create a new branch for your feature or bug fix
git checkout -b feature/your-feature-name

# Install dependencies and start development
npm install
npm run dev
```

### Adding New Technology Support

When adding support for new technologies, follow these guidelines to maintain consistency and quality:

1. **Template Creation:** Add your configuration templates to the `backend/src/templates` directory, organizing them by technology type and ensuring they follow established naming conventions.

2. **Logic Integration:** Update the decision tree logic in the backend services to include your new technology options and their dependencies on other technologies.

3. **Frontend Updates:** Add appropriate UI components and form fields to collect user preferences for your new technology stack.

4. **Testing:** Create comprehensive tests that verify generated configurations work correctly, including integration tests that actually build and run generated projects.

5. **Documentation:** Update this README and add inline code comments explaining any complex logic or technology-specific considerations.

## Testing

The project includes comprehensive testing at multiple levels to ensure reliability:

```bash
# Run all tests including unit, integration, and end-to-end tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage reporting to identify untested code
npm run test:coverage

# Test generated project configurations by building sample projects
npm run test:integration
```

## Architecture Deep Dive

### Template System Design

The template system represents the core innovation of this project. Rather than using simple string replacement, it implements a sophisticated dependency resolution system that understands how different technologies interact with each other.

When you select PostgreSQL as your database, the system doesn't just add a database configuration file. It understands that PostgreSQL requires specific connection pooling settings for optimal performance, database migration tooling for schema management, and appropriate Docker networking configuration to connect with your application container.

### Intelligent Configuration Generation

The backend service uses a rule-based system combined with best practices databases to generate configurations. Each technology stack includes not just the basic setup, but production-ready configurations with proper error handling, logging, monitoring hooks, and security considerations built in.

This means the Docker files include multi-stage builds for optimized image sizes, the Kubernetes manifests include proper resource limits and health checks, and the CI/CD pipelines include testing, security scanning, and deployment verification steps.

### Validation and Quality Assurance

Every generated configuration goes through multiple validation steps. The system first validates that user selections are compatible with each other, then validates that generated files have correct syntax and structure, and finally runs integration tests that actually build and run generated projects to ensure they work correctly.

## Roadmap

### Short-term Goals
- Expand support for additional cloud providers and deployment targets
- Add integration with version control platforms for automatic repository creation  
- Implement project template sharing and team collaboration features
- Develop plugins for popular IDEs and code editors

### Long-term Vision
- Machine learning integration to improve configuration recommendations based on project success patterns
- Advanced deployment pipeline generation with automated testing and rollback capabilities
- Integration with monitoring and observability platforms for production-ready applications
- Support for microservices architectures with service mesh configuration

## License

This project is licensed under the MIT License, allowing you to use, modify, and distribute the code freely. See the LICENSE file for complete terms and conditions.

## Support and Community

If you encounter issues, have questions, or want to discuss new features, we encourage you to engage with our community:

- **Issues:** Report bugs and request features through GitHub Issues
- **Discussions:** Join conversations about development and best practices in GitHub Discussions  
- **Documentation:** Comprehensive guides and API documentation available in the `/docs` directory
- **Examples:** Sample generated projects and configuration examples in the `/examples` directory

## Acknowledgments

This project builds upon the incredible work of the open-source community, particularly the maintainers of the various frameworks, tools, and platforms that this generator supports. We're grateful for their contributions that make modern software development possible.

---

**Ready to stop configuring and start coding?** Install Vibe Coding Generator today and experience the joy of jumping straight into your next project without the DevOps overhead.