import React from 'react';
import { Project } from '../../types';
import { Briefcase, Clock, CheckCircle, DollarSign } from 'lucide-react';

interface FreelancerStatsProps {
  projects: Project[];
  currentUser: any;
}

export const FreelancerStats: React.FC<FreelancerStatsProps> = ({ projects, currentUser }) => {
  const availableProjects = projects.filter(p => p.status === 'Open' && !p.freelancer).length;
  const myProjects = projects.filter(p => p.freelancer === currentUser?.address);
  const inProgressProjects = myProjects.filter(p => p.status === 'Not Done').length;
  const completedProjects = myProjects.filter(p => p.status === 'Close').length;
  const totalEarned = myProjects
    .filter(p => p.status === 'Close')
    .reduce((sum, p) => sum + parseFloat(p.price), 0);

  const stats = [
    {
      title: 'Available Projects',
      value: availableProjects,
      icon: Briefcase,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'My Projects',
      value: myProjects.length,
      icon: Clock,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'In Progress',
      value: inProgressProjects,
      icon: Clock,
      color: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'Total Earned',
      value: `${totalEarned.toFixed(2)} ETH`,
      icon: DollarSign,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
          <p className="text-white/70 text-sm">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};