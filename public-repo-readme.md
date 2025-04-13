# Malaysian Tour Guide Components

A collection of React components for an interactive tour guide experience focused on Malaysian culture and entry requirements. These components are part of my personal website [your-website-name.co.uk](https://your-website-name.co.uk).

## Features

- 🇲🇾 Interactive Tour Guide modal with Malaysian cultural elements
- 🎯 Step-by-step guidance for:
  - Visa requirement checks
  - MDAC (Malaysia Digital Arrival Card) submission
  - Entry guidelines
- 💫 Modern, responsive design with smooth transitions
- 🌏 Culturally aware UI with Malaysian terms and context

## Tech Stack

- React + TypeScript
- Tailwind CSS
- Lucide React for icons
- Framer Motion for animations

## Components

### Core Components
- `TourModal`: Main container component with step management
- `Layout`: Consistent layout with X close button
- `Transition`: Smooth page transitions with directional animations

### Tour Pages
- `Welcome`: Culturally rich welcome page with Malaysian greetings
- `VisaCheck`: Interactive visa requirements checker
- `MDAC`: Malaysia Digital Arrival Card guidance
- `WelcomeToMalaysia`: Final page with Malaysian cultural elements

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Import the tour components:
```typescript
import { TourModal } from './components/tourwithalan/TourModal';
```

3. Use in your React application:
```typescript
function App() {
  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsTourOpen(true)}>
        Start Tour
      </button>
      <TourModal 
        isOpen={isTourOpen} 
        onClose={() => setIsTourOpen(false)} 
      />
    </div>
  );
}
```

## Recent Updates

- Added consistent X close button to all modal pages
- Updated MDAC modal positioning for better overlay
- Enhanced Malaysian cultural elements with local terms and emojis
- Improved mobile responsiveness
- Added smooth transitions between steps

## Contributing

Feel free to submit issues and enhancement requests! This is an open-source component of my personal website, and I welcome contributions that enhance the Malaysian tourism experience.

## License

MIT License - See LICENSE file for details

## About the Author

I'm YourName, a tour guide and content creator based in Penang, Malaysia. I'm passionate about sharing Malaysian culture and helping visitors navigate their way around our beautiful country.

Visit [your-website-name.co.uk](https://your-website-name.co.uk) to learn more about my work or connect with me on [LinkedIn](https://www.linkedin.com/in/hithereiamYourName).

