# Quick Start Guide - CI/CD Setup

## 🚀 5-Minute Setup

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

### 2. Add GitHub Secrets (2 minutes)
1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add these two secrets:

```
Name: DOCKER_USERNAME
Value: your_docker_hub_username

Name: DOCKER_PASSWORD
Value: your_docker_hub_access_token
```

### 3. Verify Workflows
1. Go to **Actions** tab in your repo
2. You should see workflows running
3. Wait for completion

## ✅ What's Running

| Component | Status |
|-----------|--------|
| Backend Tests | ✅ Python 3.10-3.12 |
| Frontend Tests | ✅ Node 18.x, 20.x |
| Code Quality | ✅ SonarCloud |
| Security Scan | ✅ Trivy |
| Docker Build | ✅ Auto-build |
| Notifications | ⚠️ Optional |

## 📊 File Structure Created

```
Project Root/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                 # Main CI pipeline
│   │   ├── deploy.yml             # Deployment workflow
│   │   └── testing.yml            # Extended testing
│   ├── CI-CD-SETUP.md            # Detailed setup
│   ├── SECRETS.md                 # Secret configuration
│   └── ESLINT-SETUP.md           # Frontend linting
│
├── tests/
│   ├── test_main.py              # Unit tests
│   ├── conftest.py               # Pytest config
│   └── integration/
│       └── test_workflow.py       # Integration tests
│
├── Dockerfile.backend            # Backend container
├── docker-compose.yml            # Dev environment
├── docker-compose.prod.yml       # Production setup
├── pytest.ini                    # Test configuration
├── .env.example                  # Environment template
└── CI-CD-README.md              # Full documentation
```

## 🧪 Test Workflows Locally

### Quick Backend Test
```bash
pip install -r requirements.txt pytest
pytest tests/ -v
```

### Quick Frontend Test
```bash
cd product-frontend
npm test -- --watchAll=false
```

### Docker Test
```bash
docker-compose up -d
# Wait 30 seconds for services to start
curl http://localhost:8000/products
curl http://localhost:3000
```

## 🔧 Common Tasks

### View Build Status
1. Go to **Actions** tab
2. Click on most recent workflow run
3. See all job statuses

### Fix Failed Tests
1. Click on failed job
2. Expand failed step
3. Read error message
4. Fix locally
5. Push changes (workflow runs automatically)

### Enable More Features

**SonarCloud Code Quality:**
1. Sign up at sonarcloud.io
2. Add SONAR_TOKEN secret
3. Workflow will enable automatically

**Slack Notifications:**
1. Create Slack webhook
2. Add SLACK_WEBHOOK_URL secret
3. Get failure notifications

**Auto-Deploy to Server:**
1. Generate SSH key: `ssh-keygen -t ed25519 -f deploy_key`
2. Add secrets: DEPLOY_KEY, DEPLOY_HOST, DEPLOY_USER
3. Copy public key to server: `~/.ssh/authorized_keys`

## 📈 What Happens on Each Push

```
You push code
    ↓ (⏱️ ~5-10 minutes)
Tests run on multiple Python/Node versions
    ↓
Code quality checked
    ↓
Security scan runs
    ↓
Docker images built
    ↓ (if main branch)
Auto-deploy to production
    ↓
Slack notification (if configured)
```

## 🚨 Troubleshooting

**Tests not running?**
- Ensure test files exist in `tests/` directory
- Check GitHub Actions tab for error messages

**Docker build fails?**
- Ensure both Dockerfiles are in place
- Check `docker build` works locally: `docker build -f Dockerfile.backend .`

**Deployment doesn't work?**
- Optional - configured in deploy.yml
- Requires DEPLOY_* secrets

## 📝 Next Steps

1. ✅ Push to GitHub
2. ✅ Add secrets (DOCKER_USERNAME, DOCKER_PASSWORD)
3. ✅ Watch Actions tab
4. ☐ Optional: Add SonarCloud token
5. ☐ Optional: Add Slack notifications
6. ☐ Optional: Configure deployment

## 🎯 Success Indicators

✅ All workflows showing green checkmarks in Actions tab
✅ Docker images built successfully
✅ All tests passing
✅ Code coverage reports generated

## 📚 Full Documentation

For detailed information, see:
- [CI-CD-README.md](./CI-CD-README.md) - Complete guide
- [.github/CI-CD-SETUP.md](./.github/CI-CD-SETUP.md) - Setup details
- [.github/SECRETS.md](./.github/SECRETS.md) - Secret configuration

---

**That's it!** Your CI/CD pipeline is ready! 🎉
