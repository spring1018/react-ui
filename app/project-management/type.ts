export type Project = {
  id: number;
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

export type Department = {
  value: string;
  label: string;
};
