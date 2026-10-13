import { Outlet } from 'react-router';
import { UIProvider } from '@/app/providers/UIProvider';
import { BackToTop } from '@/components/ui/BackToTop';
import { ScrollManager } from '@/components/ui/ScrollManager';
import { Footer } from './Footer';
import { Header } from './Header';

/** App shell. UIProvider lives here (inside the router) because its dialogs navigate. */
export function MainLayout() {
  return (
    <UIProvider>
      <div className="flex min-h-dvh flex-col">
        <ScrollManager />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </UIProvider>
  );
}
