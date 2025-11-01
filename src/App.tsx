import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, NewsletterBanner, Footer, ScrollToTop } from './components';
import { NewsletterProvider } from './contexts/NewsletterContext';
import {
  HomePage,
  // CoachingPage, // Hidden - uncomment to show coaching page
  // CoursePage, // Hidden - uncomment to show course page
  BookPage,
  AboutPage,
  ConnectPage,
  JournalPage,
  SpeakerKitPage
} from './pages';

function App() {
  return (
    <NewsletterProvider>
      <Router>
        <ScrollToTop />
        <div className="App font-corporate bg-primary-100 text-text-primary overflow-x-hidden">
          <NewsletterBanner />
          <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/coaching" element={<CoachingPage />} /> */} {/* Hidden - uncomment to show coaching page */}
          {/* <Route path="/course" element={<CoursePage />} /> */} {/* Hidden - uncomment to show course page */}
          <Route path="/book" element={<BookPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/speaker-kit" element={<SpeakerKitPage />} />
        </Routes>
        <Footer />
        </div>
      </Router>
    </NewsletterProvider>
  );
}

export default App;