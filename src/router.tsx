import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import RamblingsList from './components/RamblingsList';
import { InteractivePostPage } from './components/InteractivePostPage';
import { ContentWritingPage } from './pages/static/ContentWriting';
import { AIProjectsPage } from './pages/static/AIProjects';
import { DevToolsPage } from './pages/static/DevTools';
import { PublicTransportPage } from './pages/static/PublicTransport';
import { UXDesignPage } from './pages/static/UXDesign';
import { TourismPage } from './pages/static/Tourism';
import { DownloadCVPage } from './pages/static/DownloadCV';
import { DonatePage } from './pages/static/DonatePage';
import { ContactPage } from './pages/static/ContactPage';

import { PageTransition } from './components/PageTransition';

const withTransition = (Component: React.ComponentType) => (
  <PageTransition>
    <Component />
  </PageTransition>
);

export const router = createBrowserRouter([
  // Root route with error boundary
  {
    path: '/',
    element: <App />
  },
  {
    path: '/blog',
    element: withTransition(BlogList),
  },
  {
    path: '/ramblings',
    element: withTransition(RamblingsList),
  },
  {
    path: '/ramblings/:slug',
    element: withTransition(InteractivePostPage),
  },
  {
    path: '/content-writing',
    element: withTransition(ContentWritingPage),
  },
  {
    path: '/ai-projects',
    element: withTransition(AIProjectsPage),
  },
  {
    path: '/dev-tools',
    element: withTransition(DevToolsPage),
  },
  {
    path: '/public-transport',
    element: withTransition(PublicTransportPage),
  },
  {
    path: '/ux-design',
    element: withTransition(UXDesignPage),
  },
  {
    path: '/tourism',
    element: withTransition(TourismPage),
  },
  {
    path: '/download-cv',
    element: withTransition(DownloadCVPage),
  },
  {
    path: '/donate',
    element: withTransition(DonatePage),
  },
  {
    path: '/contact',
    element: withTransition(ContactPage),
  },
  {
    path: '/:slug',
    element: <BlogPost />,
  },
]);

