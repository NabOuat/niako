import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Projects from './components/Projects';
import Process from './components/Process';
import Stack from './components/Stack';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html';

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="theme-transition">
          <div className="noise-overlay" aria-hidden="true" />
          {isHome ? (
            <>
              <Cursor />
              <Nav />
              <main>
                <ErrorBoundary><Hero /></ErrorBoundary>
                <ErrorBoundary><SocialProof /></ErrorBoundary>
                <ErrorBoundary><Projects /></ErrorBoundary>
                <ErrorBoundary><Process /></ErrorBoundary>
                <ErrorBoundary><Stack /></ErrorBoundary>
                <ErrorBoundary><Testimonials /></ErrorBoundary>
                <ErrorBoundary><CTA /></ErrorBoundary>
              </main>
              <Footer />
            </>
          ) : (
            <NotFound />
          )}
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
