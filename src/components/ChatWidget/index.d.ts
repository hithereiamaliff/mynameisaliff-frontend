declare module './components/ChatWidget' {
  interface ChatWidgetProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
  }
  
  export const ChatWidget: React.FC<ChatWidgetProps>;
}

