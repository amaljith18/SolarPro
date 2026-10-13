import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router';
import { MainLayout } from '@/components/layout/MainLayout';
import { privacyPolicy, termsAndConditions } from '@/data/legal';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Inner pages are split into their own chunks; the home page loads eagerly.
const ServicePage = lazy(() => import('@/pages/ServicePage').then((m) => ({ default: m.ServicePage })));
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const BlogPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const LegalPage = lazy(() => import('@/pages/LegalPage').then((m) => ({ default: m.LegalPage })));

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading page">
      <span className="size-8 animate-spin rounded-full border-3 border-primary-100 border-t-primary" />
    </div>
  );
}

const withSuspense = (node: ReactNode) => <Suspense fallback={<PageFallback />}>{node}</Suspense>;

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services/:slug', element: withSuspense(<ServicePage />) },
      { path: 'projects', element: withSuspense(<ProjectsPage />) },
      { path: 'blog', element: withSuspense(<BlogPage />) },
      { path: 'privacy', element: withSuspense(<LegalPage doc={privacyPolicy} />) },
      { path: 'terms', element: withSuspense(<LegalPage doc={termsAndConditions} />) },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
