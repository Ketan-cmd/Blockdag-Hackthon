import React from 'react';
import { Project } from '../../types';
import { Calendar, DollarSign, User, Clock, CheckCircle, XCircle } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  currentUser: any;
  onSelectProject: (id: number) => void;
  onCompleteProject: (id: number) => void;
  onVerifyProject: (id: number) => void;
  isLoading: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  currentUser,
  onSelectProject,
  onCompleteProject,
  onVerifyProject,
  isLoading,
}) => {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Open':
        return 'bg-green-500';
      case 'Not Done':
        return 'bg-yellow-500';
      case 'Done':
        return 'bg-blue-500';
      case 'Close':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'Open':
        return <Clock className="w-4 h-4" />;
      case 'Not Done':
        return <Clock className="w-4 h-4" />;
      case 'Done':
        return <CheckCircle className="w-4 h-4" />;
      case 'Close':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const canSelectProject = currentUser?.role === 'freelancer' && project.status === 'Open';
  const canCompleteProject = currentUser?.role === 'freelancer' && 
    project.status === 'Not Done' && 
    project.freelancer === currentUser.address;
  const canVerifyProject = currentUser?.role === 'employer' && 
    project.status === 'Done' && 
    project.employer === currentUser.address;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
          <p className="text-white/70 text-sm mb-3">{project.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-white text-sm font-medium flex items-center space-x-1 ${getStatusColor(project.status)}`}>
          {getStatusIcon(project.status)}
          <span>{project.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-white/70">
          <DollarSign className="w-4 h-4" />
          <span className="text-sm">{project.price} ETH</span>
        </div>
        <div className="flex items-center space-x-2 text-white/70">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{project.createdAt.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4 text-white/70">
        <User className="w-4 h-4" />
        <span className="text-sm">
          Employer: {project.employer.slice(0, 6)}...{project.employer.slice(-4)}
        </span>
      </div>

      {project.freelancer && (
        <div className="flex items-center space-x-2 mb-4 text-white/70">
          <User className="w-4 h-4" />
          <span className="text-sm">
            Freelancer: {project.freelancer.slice(0, 6)}...{project.freelancer.slice(-4)}
          </span>
        </div>
      )}

      <div className="flex gap-3">
        {canSelectProject && (
          <button
            onClick={() => onSelectProject(project.id)}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Selecting...' : 'Select Project'}
          </button>
        )}

        {canCompleteProject && (
          <button
            onClick={() => onCompleteProject(project.id)}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Completing...' : 'Mark Complete'}
          </button>
        )}

        {canVerifyProject && (
          <button
            onClick={() => onVerifyProject(project.id)}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Verify & Pay'}
          </button>
        )}
      </div>
    </div>
  );
};