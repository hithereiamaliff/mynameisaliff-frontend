declare module './components/tourwithalan/TourModal' {
  interface TourModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export const TourModal: React.FC<TourModalProps>;
}
