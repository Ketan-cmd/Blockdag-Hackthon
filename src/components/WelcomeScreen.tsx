import React from 'react';
import { Briefcase, Users, Shield, Zap, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onConnectWallet: () => void;
  isConnecting: boolean;
  error: string | null;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onConnectWallet,
  isConnecting,
  error,
}) => {
  const features = [
    {
      icon: Shield,
      title: 'Decentralized & Secure',
      description: 'Built on Ethereum blockchain with smart contract escrow for guaranteed payments',
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Automated payment release upon project completion and verification',
    },
    {
      icon: Users,
      title: 'Global Marketplace',
      description: 'Connect with freelancers and employers worldwide without intermediaries',
    },
    {
      icon: Briefcase,
      title: 'Project Management',
      description: 'Track project status from creation to completion with transparent workflow',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Briefcase className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-6">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            FreelanceChain
          </span>
        </h1>
        <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
          The future of freelancing is here. Experience a decentralized platform where trust is built into every transaction through blockchain technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onConnectWallet}
            disabled={isConnecting}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <span>Connect Wallet to Start</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm max-w-md mx-auto">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-white/70 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Create Project</h3>
            <p className="text-white/70 text-sm">Employers post projects with requirements and escrow funds</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Select Project</h3>
            <p className="text-white/70 text-sm">Freelancers browse and select projects that match their skills</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Complete Work</h3>
            <p className="text-white/70 text-sm">Freelancers deliver completed work and mark projects as done</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
              4
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Get Paid</h3>
            <p className="text-white/70 text-sm">Employers verify work and funds are automatically released</p>
          </div>
        </div>
      </div>
    </div>
  );
};