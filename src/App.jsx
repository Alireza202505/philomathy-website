import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';

import SiteLayout from '@/components/layout/SiteLayout';
import Home from '@/pages/Home';
import Programs from '@/pages/Programs';
import Subjects from '@/pages/Subjects';
import About from '@/pages/About';
import Testimonials from '@/pages/Testimonials';
import Booking from '@/pages/Booking';
import Resources from '@/pages/Resources';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Calculator from '@/pages/Calculator';
import EuclidTool from '@/pages/EuclidTool';
import PhilomathyTool from '@/pages/PhilomathyTool';
import PeriodicTablePage from '@/pages/PeriodicTablePage';
import FinancialCalculator from '@/pages/FinancialCalculator';
import StatisticalCalculator from '@/pages/StatisticalCalculator';
import GeoGebra3D from '@/pages/GeoGebra3D';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import AdminDashboard from '@/pages/admin/AdminDashboard';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#071A2E]">
        <div className="w-8 h-8 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/calculator/euclid" element={<EuclidTool />} />
        <Route path="/calculator/philomathy" element={<PhilomathyTool />} />
        <Route path="/calculator/periodic-table" element={<PeriodicTablePage />} />
        <Route path="/calculator/financial" element={<FinancialCalculator />} />
        <Route path="/calculator/statistical" element={<StatisticalCalculator />} />
        <Route path="/calculator/3d" element={<GeoGebra3D />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App