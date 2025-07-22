import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const AppContent = () => {
  const { user, isLoading, login, register } = useAuth();
  const [authMode, setAuthMode] = useState<'landing' | 'login' | 'register'>('landing');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <DashboardLayout />;
  }

  if (authMode === 'login') {
    return (
      <LoginForm
        onLogin={login}
        onSwitchToRegister={() => setAuthMode('register')}
      />
    );
  }

  if (authMode === 'register') {
    return (
      <RegisterForm
        onRegister={register}
        onSwitchToLogin={() => setAuthMode('login')}
      />
    );
  }

  return <LandingPage onGetStarted={() => setAuthMode('login')} />;
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
