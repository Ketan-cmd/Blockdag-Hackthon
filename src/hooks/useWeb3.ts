import { useState, useEffect } from 'react';
import { User } from '../types';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWeb3 = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to use this application.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setUser({
          address: accounts[0],
          role: 'freelancer', // Default role, can be changed
          isConnected: true,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setUser(null);
    setError(null);
  };

  const switchRole = (role: 'employer' | 'freelancer') => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (user) {
          setUser({ ...user, address: accounts[0] });
        }
      });
    }
  }, [user]);

  return {
    user,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    switchRole,
  };
};