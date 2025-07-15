export interface Project {
  id: number;
  name: string;
  description: string;
  price: string;
  priceWei: string;
  employer: string;
  freelancer?: string;
  status: 'Open' | 'Not Done' | 'Done' | 'Close';
  createdAt: Date;
  completedAt?: Date;
  verifiedAt?: Date;
}

export interface User {
  address: string;
  role: 'employer' | 'freelancer';
  isConnected: boolean;
}

export interface ContractState {
  projects: Project[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}