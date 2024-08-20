export type Project = {
  id: string;
  title: string;
  description: string;
};

export type Task = {
  id: string;
  name: string;
  title: string;
  start: string;
  end: string;
  projectId: string;
  parentTaskId: string | null;
  sortKey: string;
};

export type ProjectActivity = {
  id: string;
  projectId: string;
  userId: string;
  tag: string;
  content: string;
  createdAt: string;
};

export type Department = {
  value: string;
  label: string;
};
