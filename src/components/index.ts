// Import all components first
import { HeroSection as OriginalHeroSection } from './original/HeroSection';

// Export the updated components
export { Header } from './Header';
export { NewsletterBanner } from './NewsletterBanner';
export { ScrollToTop } from './ScrollToTop';

// Use original HeroSection but updated Header
export const HeroSection = OriginalHeroSection;

// Re-export other components that don't have variations
export { AboutSection } from './AboutSection';
export { StatsSection } from './StatsSection';
export { BalanceSection } from './BalanceSection';
export { BookSection } from './BookSection';
export { CoachingSection } from './CoachingSection';
export { TestimonialsSection } from './TestimonialsSection';
export { CTASection } from './CTASection';
export { Footer } from './Footer';

// UI Components
export { Modal } from './ui/Modal';
export { SuccessModal } from './ui/SuccessModal';
export { ErrorMessage } from './ui/ErrorMessage';