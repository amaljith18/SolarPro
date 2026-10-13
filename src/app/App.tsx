import { MotionConfig } from 'motion/react';
import { RouterProvider } from 'react-router';
import { router } from './router';

export function App() {
  return (
    // reducedMotion="user": transforms are skipped for people who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
