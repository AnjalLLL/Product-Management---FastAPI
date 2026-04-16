# CI/CD Pipeline Documentation

## 🚀 Overview

Your Product Management FastAPI project now has a complete CI/CD pipeline using GitHub Actions. This document explains all workflows and how to set them up.

## 📋 What's Included

### 1. **GitHub Actions Workflows** (`.github/workflows/`)

#### `ci.yml` - Main CI Pipeline
Runs on every push and pull request to validate code quality.

**Components:**
- ✅ Backend Testing (Python 3.10, 3.11, 3.12)
- ✅ Frontend Testing (Node 18.x, 20.x)
- ✅ Code Quality Analysis (SonarCloud)
- ✅ Security Scanning (Trivy)
- ✅ Docker Image Building
- ✅ Build Notifications (Slack)

#### `deploy.yml` - Production Deployment
Automatically deploys to production when code is merged to main.

**Components:**
- 🐳 Docker Image Building
- 🚀 Automatic Deployment via SSH
- ✨ Smoke Tests (Post-deployment validation)

#### `testing.yml` - Comprehensive Testing
Cross-platform and integration testing.

**Components:**
- 🖥️ Multi-OS Testing (Ubuntu, Windows, macOS)
- 🔗 Integration Tests with PostgreSQL
- 📊 Coverage Reports

### 2. **Docker Configuration**

#### `Dockerfile.backend`
- Python 3.11 slim image
- FastAPI application
- PostgreSQL client support
- Health checks

#### `product-frontend/Dockerfile`
- Multi-stage build (builder + runtime)
- Node 20 Alpine
- Optimized production build
- Health checks

#### `docker-compose.yml`
Development environment with:
- PostgreSQL database
- FastAPI backend (with hot reload)
- React frontend
- Auto-refresh on code changes

#### `docker-compose.prod.yml`
Production-ready setup with:
- Optimized images
- Health checks
- Environment variables
- Volume management

### 3. **Test Files**

#### `tests/test_main.py`
Unit tests for FastAPI endpoints

#### `tests/integration/test_workflow.py`
Integration tests for complete workflows

#### `pytest.ini`
Pytest configuration for test discovery and reporting

## ⚙️ Setup Instructions

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

### Step 2: Configure GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings → Secrets and variables → Actions**
3. Add the following secrets:

#### Essential Secrets:
```
DOCKER_USERNAME         # Your Docker Hub username
DOCKER_PASSWORD         # Docker Hub access token
```

#### Optional Secrets (for full features):
```
SONAR_TOKEN             # From sonarcloud.io
SLACK_WEBHOOK_URL       # From your Slack workspace
DEPLOY_KEY              # Private SSH key
DEPLOY_HOST             # Your server IP
DEPLOY_USER             # SSH user for deployment
```

### Step 3: Create Required Files (Already Done)

The following files have been created:
- ✅ Dockerfiles
- ✅ Docker Compose files
- ✅ Test files
- ✅ Workflows
- ✅ Configuration files

### Step 4: Install Test Dependencies (Optional)

For local testing before pushing:

```bash
# Backend tests
pip install pytest pytest-cov pytest-asyncio

# Frontend tests (already in package.json)
cd product-frontend
npm test
```

## 📊 Workflow Triggers

| Workflow | Trigger | When |
|----------|---------|------|
| `ci.yml` | Push to main/develop | Every commit |
| `ci.yml` | Pull Request | Every PR to main |
| `testing.yml` | Push to main/develop | Additional testing |
| `deploy.yml` | Push to main | Auto-deploy to production |
| `deploy.yml` | Manual trigger | On demand |

## 📈 Pipeline Flow

```
Code Push
    ↓
CI Pipeline Starts
    ↓
    ├─→ Backend Tests (Python 3.10, 3.11, 3.12)
    ├─→ Frontend Tests (Node 18.x, 20.x)
    ├─→ Code Quality (SonarCloud)
    └─→ Security Scan (Trivy)
    ↓
All Tests Pass?
    ├─→ YES: Continue
    └─→ NO: Notify & Stop
    ↓
Docker Build & Push
    ↓
Deploy to Production (if main branch)
    ├─→ Build images
    ├─→ Push to registry
    ├─→ SSH to server
    └─→ Run deployment script
    ↓
Smoke Tests
    ↓
Notify (Slack)
```

## 🧪 Running Tests Locally

### Backend Tests
```bash
# Install dependencies
pip install -r requirements.txt
pip install pytest pytest-cov pytest-asyncio

# Run all tests
pytest

# Run with coverage
pytest --cov=. --cov-report=html

# Run specific test file
pytest tests/test_main.py -v

# Run integration tests only
pytest -m integration
```

### Frontend Tests
```bash
cd product-frontend

# Install dependencies
npm ci

# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run build
npm run build
```

## 🐳 Running Locally with Docker

### Development Mode
```bash
# Build and run all services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down
```

### Access Services:
- Backend API: http://localhost:8000
- Frontend: http://localhost:3000
- Database: localhost:5432

### Production Mode
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Monitoring & Logs

### GitHub Actions Dashboard
1. Go to your repository
2. Click **Actions** tab
3. View all workflows and their status
4. Click on a workflow to see details
5. Click on a step to see full logs

### Coverage Reports
- Backend coverage: View in GitHub Actions after tests
- Frontend coverage: View in GitHub Actions after tests

### Failed Builds
When a build fails:
1. Check the failed step in GitHub Actions
2. Review error messages
3. Fix locally and push
4. Pipeline will re-run automatically

## 🔒 Security

The pipeline includes:
- **Trivy Scanner**: Scans for vulnerable dependencies
- **SARIF Upload**: Security findings go to GitHub Security tab
- **Secret Management**: All sensitive data via GitHub Secrets
- **Code Quality**: SonarCloud for code vulnerabilities

## 🚀 Deployment

### Automatic Deployment (main branch only)

When you push to main:
1. All tests must pass
2. Docker images are built
3. Images pushed to registry
4. SSH connection to server
5. Docker Compose updated
6. Containers restarted
7. Smoke tests verify

### Manual Deployment

```bash
# Trigger from GitHub Actions UI
# Go to Actions → Deploy to Production → Run workflow
```

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@db:5432/dbname
API_DEBUG=false
SECRET_KEY=your_secret_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://api.example.com
REACT_APP_ENV=production
```

## ⚠️ Troubleshooting

### Tests Failing Locally?
```bash
# Clear cache
pytest --cache-clear

# Run in verbose mode
pytest -v

# Check Python version
python --version  # Should be 3.10+
```

### Docker Build Issues?
```bash
# Check Docker is running
docker ps

# View build logs
docker build . -f Dockerfile.backend --progress=plain

# Clean up
docker system prune -a
```

### Deployment Failed?
1. Check SSH key is added to secrets
2. Verify deployment server is accessible
3. Check deployment server has Docker installed
4. View full logs in GitHub Actions

### Tests Timing Out?
- Increase timeout values in workflow files
- Check if services are healthy
- Review resource usage

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [FastAPI Testing Documentation](https://fastapi.tiangolo.com/advanced/testing-dependencies/)
- [React Testing Documentation](https://create-react-app.dev/docs/running-tests/)
- [Docker Documentation](https://docs.docker.com/)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)

## 🎯 Best Practices

1. **Write Tests**: Aim for >80% code coverage
2. **Commit Often**: Smaller commits are easier to debug
3. **Use Branches**: Create feature branches before merging to main
4. **Review PRs**: Always review code before merging
5. **Monitor Builds**: Check GitHub Actions after every push
6. **Keep Dependencies Updated**: Run `pip list --outdated` and `npm outdated`
7. **Use Environment Variables**: Never commit secrets
8. **Document Changes**: Write clear commit messages

## 📞 Support

For issues with:
- **GitHub Actions**: Check GitHub Actions documentation
- **Docker**: Check Docker documentation
- **FastAPI**: Check FastAPI documentation
- **React**: Check React documentation

---

**Last Updated**: April 2026
**Version**: 1.0
