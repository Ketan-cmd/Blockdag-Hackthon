import React from 'react';
import { Project } from '../../types';
import { FreelancerProjectCard } from './FreelancerProjectCard';
import { Search, Filter } from 'lucide-react';

interface FreelancerProjectListProps {
  projects: Project[];
  currentUser: any;
  onSelectProject: (id: number) => void;
  onCompleteProject: (id: number) => void;
  isLoading: boolean;
}

export const FreelancerProjectList: React.FC<FreelancerProjectListProps> = ({
  projects,
  currentUser,
  onSelectProject,
  onCompleteProject,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  // Show available projects (Open) and projects assigned to current freelancer
  const relevantProjects = projects.filter(project => {
    return (project.status === 'Open' && !project.freelancer) || 
           project.freelancer === currentUser?.address;
  });

  const filteredProjects = relevantProjects.filter((project) => {
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
            placeholder="Search projects..."
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
            <option value="all">All Projects</option>
            <option value="Open">Available</option>
            <option value="Not Done">In Progress</option>
            <option value="Done">Completed</option>
            <option value="Close">Paid</option>
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
              : 'No projects available at the moment.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <FreelancerProjectCard
              key={project.id}
              project={project}
              currentUser={currentUser}
              onSelectProject={onSelectProject}
              onCompleteProject={onCompleteProject}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};