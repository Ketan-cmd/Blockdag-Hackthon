import React from 'react';
import { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { Search, Filter } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  currentUser: any;
  onSelectProject: (id: number) => void;
  onCompleteProject: (id: number) => void;
  onVerifyProject: (id: number) => void;
  isLoading: boolean;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  currentUser,
  onSelectProject,
  onCompleteProject,
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

  const userProjects = currentUser ? filteredProjects.filter(project => {
    if (currentUser.role === 'employer') {
      return project.employer === currentUser.address;
    } else {
      // For freelancers, show all projects they can interact with:
      // 1. Open projects (available to select) - not assigned to anyone
      // 2. Projects assigned to them (any status)
      return (project.status === 'Open' && !project.freelancer) || 
             project.freelancer === currentUser.address;
    }
  }) : filteredProjects;

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
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="Not Done">Not Done</option>
            <option value="Done">Done</option>
            <option value="Close">Close</option>
          </select>
        </div>
      </div>

      {userProjects.length === 0 ? (
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
          {userProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              currentUser={currentUser}
              onSelectProject={onSelectProject}
              onCompleteProject={onCompleteProject}
              onVerifyProject={onVerifyProject}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};