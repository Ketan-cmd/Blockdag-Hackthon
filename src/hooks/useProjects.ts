import { useState, useEffect } from 'react';
import { Project } from '../types';
import { User } from '../types';

export const useProjects = (currentUser: User | null) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo data - in a real app, this would come from the blockchain
  useEffect(() => {
    const demoProjects: Project[] = [
      {
        id: 1,
        name: 'E-commerce Website Development',
        description: 'Build a modern e-commerce platform with React and Node.js',
        price: '2.5',
        priceWei: '2500000000000000000',
        employer: '0x742d35Cc6634C0532925a3b8D23CAD04b8fA1B8F',
        status: 'Open',
        createdAt: new Date('2024-01-15'),
      },
      {
        id: 2,
        name: 'Mobile App UI/UX Design',
        description: 'Design user interface for a fitness tracking mobile application',
        price: '1.8',
        priceWei: '1800000000000000000',
        employer: '0x8ba1f109551bD432803012645Hac136c8CE5BD9C',
        freelancer: '0x123456789abcdef123456789abcdef123456789a',
        status: 'Not Done',
        createdAt: new Date('2024-01-10'),
      },
      {
        id: 3,
        name: 'Smart Contract Audit',
        description: 'Security audit for DeFi lending protocol smart contracts',
        price: '5.0',
        priceWei: '5000000000000000000',
        employer: '0x456789abcdef123456789abcdef123456789abcde',
        freelancer: '0x987654321fedcba987654321fedcba9876543210',
        status: 'Done',
        createdAt: new Date('2024-01-05'),
      },
    ];

    setProjects(demoProjects);
  }, []);

  const createProject = async (name: string, description: string, price: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newProject: Project = {
        id: projects.length + 1,
        name,
        description,
        price,
        priceWei: (parseFloat(price) * 1e18).toString(),
        employer: currentUser?.address || '', // Current user address
        status: 'Open',
        createdAt: new Date(),
      };

      setProjects(prev => [...prev, newProject]);
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  const selectProject = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 1500));

      setProjects(prev => prev.map(project => 
        project.id === id 
          ? { ...project, status: 'Not Done' as const, freelancer: currentUser?.address || '' }
          : project
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to select project');
    } finally {
      setIsLoading(false);
    }
  };

  const completeProject = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 1500));

      setProjects(prev => prev.map(project => 
        project.id === id 
          ? { ...project, status: 'Done' as const, completedAt: new Date() }
          : project
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to complete project');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyProject = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // Show payment gateway
      const project = projects.find(p => p.id === id);
      if (project) {
        // In a real app, this would integrate with actual payment processing
        const confirmed = window.confirm(
          `Release payment of ${project.price} ETH to freelancer?\n\nThis action cannot be undone.`
        );
        
        if (!confirmed) {
          setIsLoading(false);
          return;
        }
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setProjects(prev => prev.map(project => 
        project.id === id 
          ? { ...project, status: 'Close' as const, verifiedAt: new Date() }
          : project
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to verify project');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    projects,
    isLoading,
    error,
    createProject,
    selectProject,
    completeProject,
    verifyProject,
  };
};