import React from 'react';
import { Project } from '../../types';
import { Calendar, DollarSign, User, Clock, CheckCircle, XCircle, Play, Check } from 'lucide-react';

interface FreelancerProjectCardProps {
  project: Project;
  currentUser: any;
  onSelectProject: (id: number) => void;
  onCompleteProject: (id: number) => void;
  isLoading: boolean;
}

export const FreelancerProjectCard: React.FC<FreelancerProjectCardProps> = ({
  project,
  currentUser,
  onSelectProject,
  onCompleteProject,
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

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'Open':
        return 'Available';
      case 'Not Done':
        return 'In Progress';
      case 'Done':
        return 'Awaiting Payment';
      case 'Close':
        return 'Completed';
      default:
        return status;
    }
  };

  const canSelectProject = project.status === 'Open' && !project.freelancer;
  const canCompleteProject = project.status === 'Not Done' && project.freelancer === currentUser.address;
  const isMyProject = project.freelancer === currentUser.address;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{project.name}</h3>
          <p className="text-white/70 text-sm mb-3">{project.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-white text-sm font-medium flex items-center space-x-1 ${getStatusColor(project.status)}`}>
          {getStatusIcon(project.status)}
          <span>{getStatusText(project.status)}</span>
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

      {canSelectProject && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
          <p className="text-green-300 text-sm">
            This project is available for selection. Click below to start working!
          </p>
        </div>
      )}

      {isMyProject && project.status === 'Not Done' && (
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
          <p className="text-yellow-300 text-sm">
            You're working on this project. Mark as complete when finished.
          </p>
        </div>
      )}

      {isMyProject && project.status === 'Done' && (
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
          <p className="text-blue-300 text-sm">
            Work submitted! Waiting for employer verification and payment.
          </p>
        </div>
      )}

      {isMyProject && project.status === 'Close' && (
        <div className="bg-gray-500/20 border border-gray-500/30 rounded-lg p-3 mb-4">
          <p className="text-gray-300 text-sm">
            Project completed and payment received!
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {canSelectProject && (
          <button
            onClick={() => onSelectProject(project.id)}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>{isLoading ? 'Selecting...' : 'Select Project'}</span>
          </button>
        )}

        {canCompleteProject && (
          <button
            onClick={() => onCompleteProject(project.id)}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Check className="w-5 h-5" />
            <span>{isLoading ? 'Completing...' : 'Mark Complete'}</span>
          </button>
        )}
      </div>
    </div>
  );
};