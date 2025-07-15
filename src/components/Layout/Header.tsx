import React from 'react';
import { User, Settings, LogOut, Briefcase, Users } from 'lucide-react';

interface HeaderProps {
  user: any;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  onSwitchRole: (role: 'employer' | 'freelancer') => void;
  isConnecting: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onConnectWallet,
  onDisconnectWallet,
  onSwitchRole,
  isConnecting,
}) => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">FreelanceChain</h1>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSwitchRole('employer')}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        user.role === 'employer'
                          ? 'bg-blue-500 text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Briefcase className="w-4 h-4 inline mr-1" />
                      Employer
                    </button>
                    <button
                      onClick={() => onSwitchRole('freelancer')}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        user.role === 'freelancer'
                          ? 'bg-green-500 text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <Users className="w-4 h-4 inline mr-1" />
                      Freelancer
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-white/10 rounded-full px-4 py-2">
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">
                    {formatAddress(user.address)}
                  </span>
                  <button
                    onClick={onDisconnectWallet}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={onConnectWallet}
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};