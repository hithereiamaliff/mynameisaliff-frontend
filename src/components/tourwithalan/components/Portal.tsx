import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  targetRef: React.RefObject<Element>;
}

export function Portal({ children, targetRef }: PortalProps) {
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const updatePosition = () => {
      const targetRect = targetRef.current?.getBoundingClientRect();
      if (!portalRef.current || !targetRect) return;

      portalRef.current.style.position = 'fixed';
      portalRef.current.style.top = `${targetRect.bottom}px`;
      portalRef.current.style.left = `${targetRect.left}px`;
      portalRef.current.style.width = `${targetRect.width}px`;
      portalRef.current.style.zIndex = '99999';
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [targetRef]);

  return createPortal(
    <div ref={portalRef} style={{ position: 'fixed', zIndex: 99999 }}>
      {children}
    </div>,
    document.body
  );
}
