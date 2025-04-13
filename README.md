# My Name Is YourName

A personal website and portfolio showcasing my journey as a digital experience creator based in Penang, Malaysia. Features an interactive tour guide experience, AI-powered chatbot, and a showcase of my professional work.

## Features

- Modern, responsive design with Malaysian cultural elements
- Interactive Tour Guide modal with immersive Malaysian experience
- AI-powered multilingual chatbot for visitor engagement
- Professional portfolio and work showcase
- Social media integration (LinkedIn, GitHub)
- Google Analytics 4 integration for visitor insights

## Tech Stack

### Frontend
- React + TypeScript for robust development
- Vite for fast builds and hot module replacement
- Tailwind CSS for responsive styling
- Lucide React for modern iconography
- React GA4 for analytics tracking

### Backend
- Node.js + Express for API handling
- OpenAI API for intelligent chat responses
- Railway for reliable deployment

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

The project is organized into several key sections:

### Core Components
- `src/App.tsx`: Main application component
- `src/components/`: Reusable UI components
  - `Modal.tsx`: Base modal component
  - `ChatWidget/`: AI-powered chat interface
  - `tourwithalan/`: Interactive tour guide experience

### Features
- **Portfolio Section**: Showcase of professional work and skills
- **Tour Guide Experience**: Interactive introduction to Malaysian culture
- **Chat Widget**: AI-powered visitor engagement system
- **Analytics**: GA4 integration for visitor tracking

### Public Components
Selected components (tour guide experience) are maintained in a separate public repository for open-source sharing. These are automatically synced via GitHub Actions.

## Development

### Local Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Start development server: `npm run dev`

### Code Structure
- TypeScript for type safety
- Component-based architecture
- Tailwind for styling
- Responsive design principles

## Deployment

The website is deployed across two platforms:
- **Frontend**: Netlify for static site hosting
  - Automatic builds from main branch
  - Environment variable configuration
  - Custom domain setup

- **Backend**: Railway for API hosting
  - Node.js runtime
  - Automatic scaling
  - Environment management

## Contributing

While this is a personal website, feedback and suggestions are welcome! Feel free to:
- Submit issues for bugs or enhancement ideas
- Contact me at email@example.com
- Connect on LinkedIn or GitHub

## License

This project is privately maintained. The tour guide components are available under MIT license in a separate public repository.

