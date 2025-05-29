# DevOps Templates

This directory contains DevOps configuration templates for various frameworks and languages supported by Vibe Coding Generator.

## Directory Structure

```
templates/
├── javascript/
│   ├── react/
│   ├── nextjs/
│   ├── angular/
│   └── vue/
├── python/
│   ├── fastapi/
│   ├── flask/
│   └── django/
└── java/
    ├── spring-boot/
    ├── quarkus/
    └── micronaut/
```

Each framework directory contains:
- `Dockerfile` - Optimized multi-stage build for the framework
- `docker-compose.yml` - Development environment setup
- `.github/workflows/ci.yml` - GitHub Actions workflow for CI/CD
- Additional framework-specific configuration files
