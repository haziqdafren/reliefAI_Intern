import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, NewsletterBanner, Footer, ScrollToTop } from './components';
import { NewsletterProvider } from './contexts/NewsletterContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { usePageTracking } from './hooks/usePageTracking';
import {
  HomePage,
  // CoachingPage, // Hidden - uncomment to show coaching page
  // CoursePage, // Hidden - uncomment to show course page
  BookPage,
  AboutPage,
  ConnectPage,
  JournalPage,
  GuidedJournalPage,
  SpeakerKitPage,
  PaymentSuccessPage,
  PaymentCancelPage,
  NotFoundPage
} from './pages';

// Wrapper component for analytics tracking
const AppContent = () => {
  usePageTracking(); // Track page views

  return (
    <div className="App font-corporate bg-primary-100 text-text-primary overflow-x-hidden">
      <NewsletterBanner />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/coaching" element={<CoachingPage />} /> */} {/* Hidden - uncomment to show coaching page */}
        {/* <Route path="/course" element={<CoursePage />} /> */} {/* Hidden - uncomment to show course page */}
        <Route path="/book" element={<BookPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/guidedjournal" element={<GuidedJournalPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/connect" element={<ConnectPage />} />
        <Route path="/speaker-kit" element={<SpeakerKitPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-cancel" element={<PaymentCancelPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <CurrencyProvider>
      <NewsletterProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </NewsletterProvider>
    </CurrencyProvider>
  );
}

export default App;
