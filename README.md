# My Name Is Aliff

The front-end of my personal website and portfolio showcasing my journey as a digital experience creator in Penang, Malaysia. Features an AI-powered chatbot to help visitors learn more about my experience and services.

## Features

- Modern, responsive design
- Interactive Malaysia Welcome Guide modal with Malaysian-themed experience
- An AI-powered chatbot for answering questions
- "Let's Connect" section with LinkedIn and GitHub integration

## Tech Stack

- Frontend:
  - React + TypeScript
  - Vite
  - Tailwind CSS
  - Lucide React for icons

- Backend:
  - Node.js + Express
  - OpenAI API integration
  - Railway for deployment

## Environment Variables

### Frontend (.env)
```
VITE_BACKEND_URL_PROD=your_production_backend_url
VITE_BACKEND_URL_DEV=http://localhost:3001/api/chat
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga4_measurement_id
```

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key
CLIENT_URL=your_frontend_url
CHATBOT_CONTENT=your_chatbot_content
CHATBOT_SYSTEM_INSTRUCTIONS=your_chatbot_instructions
```

## Repository Structure

This repository maintains two versions:
1. **Private Repository** (this one): Contains the complete website with all features
2. **Public Repository**: Contains only the tour components for open-source sharing

### Tour Components Sync Process

The tour components are automatically synced to the public repository using GitHub Actions.

#### Automated Sync Workflow

The workflow triggers automatically when changes are made to:
- `src/components/tourwithalan/**`
- `src/components/Modal.tsx`
- `tailwind.config.js`
- `postcss.config.js`
- `README.md`

#### Setting Up Sync

1. Create a GitHub Personal Access Token:
   - Go to GitHub Settings > Developer Settings > Personal Access Tokens
   - Generate a new token with `repo` scope
   - Copy the token

2. Add Repository Secret:
   - Go to your public repository settings
   - Navigate to Settings > Secrets and variables > Actions
   - Add new repository secret:
     - Name: `SYNC_TOKEN`
     - Value: Your GitHub token

3. The workflow will:
   - Copy tour components to a temporary directory
   - Clean sensitive data (API keys, analytics IDs)
   - Push changes to the public repository

#### Manual Sync

You can also trigger the sync manually:
1. Go to the Actions tab in GitHub
2. Select "Sync Tour Components to Public Repository"
3. Click "Run workflow"

## Deployment

The project is set up for deployment on:
- Frontend: Netlify
- Backend: Railway

## Feedback About This Site/Codebase

Feel free to submit issues and enhancement requests at hello@mynameisaliff.co.uk!
