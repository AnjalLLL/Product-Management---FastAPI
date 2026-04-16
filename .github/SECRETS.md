# GitHub Secrets Configuration

# Required secrets to set in GitHub repository settings:

## Docker Registry
- DOCKER_USERNAME: Your Docker Hub username
- DOCKER_PASSWORD: Your Docker Hub access token

## GitHub Container Registry (Optional)
- GHCR_PAT: GitHub Personal Access Token for GitHub Container Registry

## Code Quality
- SONAR_TOKEN: SonarCloud token for code quality analysis

## Deployment
- DEPLOY_KEY: Private SSH key for deployment server
- DEPLOY_HOST: Deployment server hostname/IP
- DEPLOY_USER: Deployment server username

## Notifications
- SLACK_WEBHOOK_URL: Slack webhook for build notifications

## Coverage
- CODECOV_TOKEN: Codecov.io token (usually optional if repo is public)

How to add secrets:
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Enter the secret name and value
