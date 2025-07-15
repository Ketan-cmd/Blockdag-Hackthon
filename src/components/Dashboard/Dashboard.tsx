import React from 'react';
import { Project } from '../../types';
import { Stats } from './Stats';
import { CreateProject } from '../Projects/CreateProject';
import { ProjectList } from '../Projects/ProjectList';

interface DashboardProps {
  projects: Project[];
  currentUser: any;
  onCreateProject: (name: string, description: string, price: string) => void;
  onSelectProject: (id: number) => void;
  onCompleteProject: (id: number) => void;
  onVerifyProject: (id: number) => void;
  isLoading: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  currentUser,
  onCreateProject,
  onSelectProject,
  onCompleteProject,
  onVerifyProject,
  isLoading,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {currentUser?.role === 'employer' ? 'Employer Dashboard' : 'Freelancer Dashboard'}
            </h1>
            <p className="text-white/70">
              {currentUser?.role === 'employer' 
                ? 'Manage your projects and track progress'
                : 'Find projects and manage your work'}
            </p>
          </div>
          {currentUser?.role === 'employer' && (
            <CreateProject onCreateProject={onCreateProject} isLoading={isLoading} />
          )}
        </div>
        
        <Stats projects={projects} currentUser={currentUser} />
      </div>

      <ProjectList
        projects={projects}
        currentUser={currentUser}
        onSelectProject={onSelectProject}
        onCompleteProject={onCompleteProject}
        onVerifyProject={onVerifyProject}
        isLoading={isLoading}
      />
    </div>
  );
};