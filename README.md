**NOTE**: This repo is merely the showcase of what the frontend of my website looks like, with sensitive information in the code already retracted.

Do check out my website right here: https://mynameisaliff.co.uk

-----

# My Name Is Aliff

A personal website and portfolio showcasing my journey as a tour guide and content creator in Penang, Malaysia. Features an AI-powered chatbot to help visitors learn more about my experience and services.

## Features

- Modern, responsive design
- Interactive Tour Guide modal with Malaysian-themed experience
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
```

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key
CLIENT_URL=your_frontend_url
CHATBOT_CONTENT=your_chatbot_content
CHATBOT_SYSTEM_INSTRUCTIONS=your_chatbot_instructions
```

## Deployment

The project is set up for deployment on:
- Frontend: Netlify
- Backend: Railway

## Feedback About This Site/Codebase

Feel free to submit issues and enhancement requests at hello@mynameisaliff.co.uk!
