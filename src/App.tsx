import React from 'react';
import { useWeb3 } from './hooks/useWeb3';
import { useProjects } from './hooks/useProjects';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { WelcomeScreen } from './components/WelcomeScreen';
import { EmployerDashboard } from './components/Dashboard/EmployerDashboard';
import { FreelancerDashboard } from './components/Dashboard/FreelancerDashboard';

function App() {
  const { user, isConnecting, error, connectWallet, disconnectWallet, switchRole } = useWeb3();
  const { projects, isLoading, createProject, selectProject, completeProject, verifyProject } = useProjects(user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <Header
        user={user}
        onConnectWallet={connectWallet}
        onDisconnectWallet={disconnectWallet}
        onSwitchRole={switchRole}
        isConnecting={isConnecting}
      />

      <main className="min-h-[calc(100vh-4rem)]">
        {user ? (
          user.role === 'employer' ? (
            <EmployerDashboard
              projects={projects}
              currentUser={user}
              onCreateProject={createProject}
              onVerifyProject={verifyProject}
              isLoading={isLoading}
            />
          ) : (
            <FreelancerDashboard
              projects={projects}
              currentUser={user}
              onSelectProject={selectProject}
              onCompleteProject={completeProject}
              isLoading={isLoading}
            />
          )
        ) : (
          <WelcomeScreen
            onConnectWallet={connectWallet}
            isConnecting={isConnecting}
            error={error}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;