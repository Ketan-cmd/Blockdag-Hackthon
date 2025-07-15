import React from 'react';
import { Project } from '../../types';
import { Calendar, DollarSign, User, Clock, CheckCircle, XCircle, CreditCard } from 'lucide-react';

interface EmployerProjectCardProps {
  project: Project;
  currentUser: any;
  onVerifyProject: (id: number) => void;
  isLoading: boolean;
}

export const EmployerProjectCard: React.FC<EmployerProjectCardProps> = ({
  project,
  currentUser,
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

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'Open':
        return 'Open';
      case 'Not Done':
        return 'In Progress';
      case 'Done':
        return 'Ready for Review';
      case 'Close':
        return 'Completed';
      default:
        return status;
    }
  };

  const canVerifyProject = project.status === 'Done' && project.employer === currentUser.address;

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

      {project.freelancer && (
        <div className="flex items-center space-x-2 mb-4 text-white/70">
          <User className="w-4 h-4" />
          <span className="text-sm">
            Freelancer: {project.freelancer.slice(0, 6)}...{project.freelancer.slice(-4)}
          </span>
        </div>
      )}

      {project.status === 'Open' && (
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
          <p className="text-blue-300 text-sm">
            Waiting for a freelancer to select this project...
          </p>
        </div>
      )}

      {project.status === 'Not Done' && (
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
          <p className="text-yellow-300 text-sm">
            Freelancer is working on this project...
          </p>
        </div>
      )}

      {project.status === 'Done' && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
          <p className="text-green-300 text-sm">
            Work completed! Review and verify to release payment.
          </p>
        </div>
      )}

      {project.status === 'Close' && (
        <div className="bg-gray-500/20 border border-gray-500/30 rounded-lg p-3 mb-4">
          <p className="text-gray-300 text-sm">
            Project completed and payment released.
          </p>
        </div>
      )}

      {canVerifyProject && (
        <button
          onClick={() => onVerifyProject(project.id)}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <CreditCard className="w-5 h-5" />
          <span>{isLoading ? 'Processing Payment...' : 'Verify & Release Payment'}</span>
        </button>
      )}
    </div>
  );
};