import React from 'react';
import { Project } from '../../types';
import { EmployerProjectCard } from './EmployerProjectCard';
import { Search, Filter } from 'lucide-react';

interface EmployerProjectListProps {
  projects: Project[];
  currentUser: any;
  onVerifyProject: (id: number) => void;
  isLoading: boolean;
}

export const EmployerProjectList: React.FC<EmployerProjectListProps> = ({
  projects,
  currentUser,
  onVerifyProject,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all appearance-none"
          >
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="Not Done">In Progress</option>
            <option value="Done">Awaiting Verification</option>
            <option value="Close">Completed</option>
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white/50" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
          <p className="text-white/70">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first project to get started!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <EmployerProjectCard
              key={project.id}
              project={project}
              currentUser={currentUser}
              onVerifyProject={onVerifyProject}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};