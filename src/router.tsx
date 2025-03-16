import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ContentWritingPage } from './pages/static/ContentWriting';
import { AIProjectsPage } from './pages/static/AIProjects';
import { DevToolsPage } from './pages/static/DevTools';
import { PublicTransportPage } from './pages/static/PublicTransport';
import { UXDesignPage } from './pages/static/UXDesign';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/content-writing',
    element: <ContentWritingPage />,
  },
  {
    path: '/ai-projects',
    element: <AIProjectsPage />,
  },
  {
    path: '/dev-tools',
    element: <DevToolsPage />,
  },
  {
    path: '/public-transport',
    element: <PublicTransportPage />,
  },
  {
    path: '/ux-design',
    element: <UXDesignPage />,
  },
]);
