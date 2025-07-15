import React from 'react';
import { Project } from '../../types';
import { FreelancerStats } from './FreelancerStats';
import { FreelancerProjectList } from '../Projects/FreelancerProjectList';

interface FreelancerDashboardProps {
  projects: Project[];
  currentUser: any;
  onSelectProject: (id: number) => void;
  onCompleteProject: (id: number) => void;
  isLoading: boolean;
}

export const FreelancerDashboard: React.FC<FreelancerDashboardProps> = ({
  projects,
  currentUser,
  onSelectProject,
  onCompleteProject,
  isLoading,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Freelancer Dashboard
            </h1>
            <p className="text-white/70">
              Find projects, manage your work, and track earnings
            </p>
          </div>
        </div>
        
        <FreelancerStats projects={projects} currentUser={currentUser} />
      </div>

      <FreelancerProjectList
        projects={projects}
        currentUser={currentUser}
        onSelectProject={onSelectProject}
        onCompleteProject={onCompleteProject}
        isLoading={isLoading}
      />
    </div>
  );
};