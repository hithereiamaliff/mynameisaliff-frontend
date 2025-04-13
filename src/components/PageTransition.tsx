import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, backgroundColor: '#111827' }} // dark gray background
        animate={{ opacity: 1, backgroundColor: '#111827' }}
        exit={{ opacity: 0, backgroundColor: '#111827' }}
        transition={{ duration: 0.3 }}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

