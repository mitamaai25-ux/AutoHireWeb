import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  budget: string;
  tags: string[];
  description: string;
  postedDate: string;
  status: 'open' | 'in-progress' | 'completed';
  applications: number;
}

interface JobsContextType {
  jobs: Job[];
  myJobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'postedDate' | 'status' | 'applications'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  getJobById: (id: string) => Job | undefined;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

// Sample data
const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Mobile App Developer',
    company: 'Acme Co.',
    budget: '$1500',
    tags: ['React Native', 'UI/UX', 'TypeScript'],
    description: 'Looking for an experienced React Native developer to build a cross-platform mobile app for our startup.',
    postedDate: '2 days ago',
    status: 'open',
    applications: 5
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'TechCorp',
    budget: '$3000',
    tags: ['Node.js', 'React', 'MongoDB'],
    description: 'Need a full stack developer to build a web application with React frontend and Node.js backend.',
    postedDate: '3 days ago',
    status: 'open',
    applications: 12
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    budget: '$1200',
    tags: ['Figma', 'UI Design', 'Prototyping'],
    description: 'Looking for a talented UI/UX designer to create beautiful and intuitive user interfaces.',
    postedDate: '1 day ago',
    status: 'open',
    applications: 8
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: 'DataTech',
    budget: '$2500',
    tags: ['Python', 'Django', 'PostgreSQL'],
    description: 'Need a backend developer to build APIs and manage database infrastructure.',
    postedDate: '5 days ago',
    status: 'open',
    applications: 3
  }
];

const sampleMyJobs: Job[] = [
  {
    id: '1',
    title: 'Mobile App Developer',
    company: 'Acme Co.',
    budget: '$1500',
    tags: ['React Native', 'TypeScript'],
    description: 'Looking for an experienced React Native developer.',
    postedDate: '2 days ago',
    status: 'open',
    applications: 5
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'TechCorp',
    budget: '$3000',
    tags: ['Node.js', 'React'],
    description: 'Need a full stack developer.',
    postedDate: '3 days ago',
    status: 'in-progress',
    applications: 12
  }
];

export const JobsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);
  const [myJobs, setMyJobs] = useState<Job[]>(sampleMyJobs);

  const addJob = (job: Omit<Job, 'id' | 'postedDate' | 'status' | 'applications'>) => {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      postedDate: 'Just now',
      status: 'open',
      applications: 0
    };
    setMyJobs([newJob, ...myJobs]);
    setJobs([newJob, ...jobs]);
  };

  const updateJob = (id: string, updates: Partial<Job>) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updates } : job));
    setMyJobs(myJobs.map(job => job.id === id ? { ...job, ...updates } : job));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
    setMyJobs(myJobs.filter(job => job.id !== id));
  };

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  return (
    <JobsContext.Provider value={{ jobs, myJobs, addJob, updateJob, deleteJob, getJobById }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};
