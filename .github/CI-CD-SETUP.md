# CI/CD Configuration Guide

## Overview
This project uses GitHub Actions for continuous integration and deployment.

## Workflows

### 1. CI Pipeline (`.github/workflows/ci.yml`)
Runs on every push to `main` or `develop` branches and on pull requests.

**Jobs:**
- **Backend Tests**: Tests FastAPI backend with Python 3.10, 3.11, 3.12
  - Syntax checking with flake8
  - Unit tests with pytest
  - Coverage reporting

- **Frontend Tests**: Tests React frontend with Node 18.x, 20.x
  - ESLint checks
  - Unit tests with Jest
  - Build verification
  - Coverage reporting

- **Code Quality**: SonarCloud analysis for both backend and frontend

- **Docker Build**: Builds and pushes Docker images to Docker Hub (main branch only)

- **Security Scan**: Runs Trivy vulnerability scanner

### 2. Deployment Workflow (`.github/workflows/deploy.yml`)
Runs when code is pushed to `main` or manually triggered.

**Jobs:**
- **Build and Deploy**: 
  - Builds Docker images
  - Pushes to GitHub Container Registry
  - Deploys via SSH to production server

- **Smoke Tests**: 
  - Waits for deployment
  - Tests API endpoints
  - Tests frontend availability

### 3. Testing Workflow (`.github/workflows/testing.yml`)
Comprehensive testing across multiple platforms and configurations.

**Jobs:**
- **Test Matrix**: Runs tests on Ubuntu, Windows, macOS with multiple Python versions
- **Integration Tests**: Tests with PostgreSQL database service

## Local Development

### Using Docker Compose

**Development environment:**
```bash
docker-compose up -d
```
- Backend: http://localhost:8000
- Frontend: http://localhost:3000
- Database: localhost:5432

**Production environment simulation:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Without Docker

**Backend:**
```bash
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
cd product-frontend
npm install
npm start
```

## Environment Variables

Create `.env` file in the root directory:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=product_db
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/product_db
```

## Setting Up GitHub Secrets

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add the required secrets (see `.github/SECRETS.md`)

## Running Tests Locally

**Backend tests:**
```bash
pip install pytest pytest-cov
pytest --cov=. --cov-report=html
```

**Frontend tests:**
```bash
cd product-frontend
npm test -- --coverage
```

## Required Status Checks

Before merging a PR, the following checks must pass:
- ✅ Backend tests (Python 3.10, 3.11, 3.12)
- ✅ Frontend tests (Node 18.x, 20.x)
- ✅ Code quality (SonarCloud)
- ✅ Security scan (Trivy)

## Deployment Process

1. Commit and push to `main`
2. CI pipeline runs automatically
3. On success, deployment workflow is triggered
4. Docker images are built and pushed
5. SSH deployment connects to production server
6. Smoke tests verify deployment
7. Slack notification sent on completion/failure

## Troubleshooting

**Docker build failures:**
- Ensure Dockerfile paths are correct
- Check Docker Hub credentials

**Deployment fails:**
- Verify SSH key is configured in GitHub secrets
- Check deployment server is accessible
- Review deployment script in deploy.yml

**Test failures:**
- Check test files exist in `tests/` directory
- Review pytest configuration
- Verify all dependencies are installed

## GitHub Actions Usage

View workflow status: Actions tab on GitHub
- Successful runs: ✅
- Failed runs: ❌
- In progress: ⏳

Click on a workflow to see detailed logs.
