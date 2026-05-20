import { useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const DotLottieReact = lazy(() =>
  import('@lottiefiles/dotlottie-react').then((m) => ({ default: m.DotLottieReact }))
);

export default function LottieIcon({
  src,
  size = 48,
  loop = true,
  triggerOnHover = false,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const lottieRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  const handleRef = (dl) => { lottieRef.current = dl; };
  const autoplay = isInView && !triggerOnHover;

  const dim = typeof size === 'number' ? size : undefined;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width:      dim ?? size,
        height:     dim ?? 'auto',
        flexShrink: 0,
        ...style,
      }}
      onMouseEnter={() => triggerOnHover && lottieRef.current?.play()}
      onMouseLeave={() => triggerOnHover && lottieRef.current?.stop()}
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            key="lottie"
            initial={{ opacity: 0, scale: 0.5, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.8 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Suspense fallback={<div style={{ width: dim ?? size, height: dim ?? 'auto' }} />}>
              <DotLottieReact
                src={src}
                loop={loop}
                autoplay={autoplay}
                dotLottieRefCallback={handleRef}
                style={{ width: '100%', height: '100%' }}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
