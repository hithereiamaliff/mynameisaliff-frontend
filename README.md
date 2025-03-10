# Malaysian Tourism Interactive Guide Components

An open-source collection of React components for creating an interactive Malaysian tourism experience. These components are part of my personal website [mynameisaliff.co.uk](https://mynameisaliff.co.uk), where they help visitors learn about traveling to Malaysia.

## ✨ Features

- 🇲🇾 **Malaysian-Themed Experience**: Culturally authentic interface with local terms and Malaysian context
- 📱 **Fully Responsive**: Works seamlessly on all devices
- 🎨 **Modern UI/UX**: Clean, intuitive design with smooth transitions
- 🔍 **Interactive Guides**:
  - Visa Requirements Checker
  - MDAC (Malaysia Digital Arrival Card) Guide
  - Welcome to Malaysia Experience

## 🛠️ Tech Stack

- React + TypeScript
- Tailwind CSS
- Lucide React for icons
- Framer Motion for transitions

## 🚀 Getting Started

1. Install the dependencies:
```bash
npm install
# or
yarn install
```

2. Import the components:
```typescript
import { TourModal } from './components/tourwithalan/TourModal';
```

3. Use in your React application:
```typescript
function App() {
  const [isTourModalOpen, setIsTourModalOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsTourModalOpen(true)}>
        Start Malaysia Tour
      </button>
      <TourModal 
        isOpen={isTourModalOpen} 
        onClose={() => setIsTourModalOpen(false)} 
      />
    </>
  );
}
```

## 📦 Component Structure

```
src/components/tourwithalan/
├── components/          # Shared components
│   ├── BackButton.tsx
│   ├── Layout.tsx      # Common layout with X close button
│   ├── Portal.tsx
│   ├── RestartButton.tsx
│   └── Transition.tsx
├── pages/              # Tour guide pages
│   ├── Welcome.tsx
│   ├── VisaCheck.tsx
│   ├── MDAC.tsx
│   └── WelcomeToMalaysia.tsx
└── TourModal.tsx       # Main tour component
```

## 🎨 UI Components

### Modal Layout
- Consistent X close button across all pages
- Responsive design with proper overlay
- Smooth transitions between pages

### Tour Pages
1. **Welcome (Selamat Datang!)**
   - Warm Malaysian greeting
   - Introduction to the journey
   - Cultural context with local terms

2. **Visa Requirements**
   - Interactive visa checker
   - Country-specific information
   - Clear next steps

3. **MDAC Guide**
   - Step-by-step MDAC form guide
   - Important tips and requirements
   - Links to official resources

4. **Welcome to Malaysia**
   - Celebratory completion page
   - Malaysian cultural elements
   - Helpful travel tips

## 🔧 Configuration

### Environment Variables (.env)
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga4_id_here
```

### Tailwind Configuration
The components use a custom Tailwind configuration for consistent styling. Make sure to include the provided `tailwind.config.js` in your project.

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Malaysia's rich cultural heritage
- Built with love for travelers visiting Malaysia
- Special thanks to the Malaysian tourism community

## 🤝 Support

If you have any questions or need help integrating these components, feel free to:
- Open an issue
- Contact me at hello@mynameisaliff.co.uk
- Visit [mynameisaliff.co.uk](https://mynameisaliff.co.uk) to see the components in action
