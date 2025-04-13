import { useState, useEffect } from 'react';

interface TypewriterOptions {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
}

interface TypewriterResult {
  text: string;
  isDeleting: boolean;
}

export function useTypewriter({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
}: TypewriterOptions): TypewriterResult {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const typeText = () => {
      const fullText = texts[currentIndex];
      
      if (!isDeleting) {
        // Typing
        if (currentText !== fullText) {
          timeout = setTimeout(() => {
            setCurrentText(fullText.slice(0, currentText.length + 1));
          }, typingSpeed);
        } else {
          // Finished typing, wait before deleting
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenTexts);
        }
      } else {
        // Deleting
        if (currentText !== '') {
          timeout = setTimeout(() => {
            setCurrentText(currentText.slice(0, -1));
          }, deletingSpeed);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentIndex((current) => (current + 1) % texts.length);
        }
      }
    };

    typeText();

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return {
    text: currentText,
    isDeleting
  };
}
