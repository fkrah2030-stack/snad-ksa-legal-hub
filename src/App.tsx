import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import NotFound from "./pages/NotFound.tsx";
import LawyerProfile from "./pages/LawyerProfile.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import AdminLawyers from "./pages/admin/AdminLawyers.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminConsultations from "./pages/admin/AdminConsultations.tsx";
import AdminServices from "./pages/admin/AdminServices.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import LawyerLayout from "./components/lawyer/LawyerLayout.tsx";
import LawyerDashboard from "./pages/lawyer/LawyerDashboard.tsx";
import LawyerConsultations from "./pages/lawyer/LawyerConsultations.tsx";
import LawyerAppointments from "./pages/lawyer/LawyerAppointments.tsx";
import LawyerReviews from "./pages/lawyer/LawyerReviews.tsx";
import LawyerProfilePage from "./pages/lawyer/LawyerProfile.tsx";
import ClientLayout from "./components/client/ClientLayout.tsx";
import ClientDashboard from "./pages/client/ClientDashboard.tsx";
import ClientConsultations from "./pages/client/ClientConsultations.tsx";
import ClientContracts from "./pages/client/ClientContracts.tsx";
import ClientPayments from "./pages/client/ClientPayments.tsx";
import ClientProfile from "./pages/client/ClientProfile.tsx";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/lawyer/:id" element={<PageTransition><LawyerProfile /></PageTransition>} />
        <Route path="/my-profile" element={<PageTransition><MyProfile /></PageTransition>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="lawyers" element={<AdminLawyers />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="consultations" element={<AdminConsultations />} />
          <Route path="services" element={<AdminServices />} />
        </Route>

        {/* Lawyer Routes */}
        <Route path="/lawyer-dashboard" element={<LawyerLayout />}>
          <Route index element={<LawyerDashboard />} />
          <Route path="consultations" element={<LawyerConsultations />} />
          <Route path="appointments" element={<LawyerAppointments />} />
          <Route path="reviews" element={<LawyerReviews />} />
          <Route path="profile" element={<LawyerProfilePage />} />
        </Route>

        {/* Client Routes */}
        <Route path="/client-dashboard" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="consultations" element={<ClientConsultations />} />
          <Route path="contracts" element={<ClientContracts />} />
          <Route path="payments" element={<ClientPayments />} />
          <Route path="profile" element={<ClientProfile />} />
        </Route>
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AnimatedRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
