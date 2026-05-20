import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const rafId = useRef(null);
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

    // RAF loop — une seule mise à jour DOM par frame
    const render = () => {
      cursor.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      rafId.current = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    rafId.current = requestAnimationFrame(render);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-3 h-3 bg-primary-container rounded-full pointer-events-none z-[99999] mix-blend-difference hidden lg:block will-change-transform"
      style={{ transform: 'translate(-100px, -100px)' }}
    />
  );
}
