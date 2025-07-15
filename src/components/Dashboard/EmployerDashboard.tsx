import React from 'react';
import { Project } from '../../types';
import { EmployerStats } from './EmployerStats';
import { CreateProject } from '../Projects/CreateProject';
import { EmployerProjectList } from '../Projects/EmployerProjectList';

interface EmployerDashboardProps {
  projects: Project[];
  currentUser: any;
  onCreateProject: (name: string, description: string, price: string) => void;
  onVerifyProject: (id: number) => void;
  isLoading: boolean;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  projects,
  currentUser,
  onCreateProject,
  onVerifyProject,
  isLoading,
}) => {
  const employerProjects = projects.filter(project => 
    project.employer === currentUser?.address
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Employer Dashboard
            </h1>
            <p className="text-white/70">
              Manage your projects, track progress, and handle payments
            </p>
          </div>
          <CreateProject onCreateProject={onCreateProject} isLoading={isLoading} />
        </div>
        
        <EmployerStats projects={employerProjects} />
      </div>

      <EmployerProjectList
        projects={employerProjects}
        currentUser={currentUser}
        onVerifyProject={onVerifyProject}
        isLoading={isLoading}
      />
    </div>
  );
};