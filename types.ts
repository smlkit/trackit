export type User = {
  id: string;
  full_name: string;
  avatar_url?: string;
  updated_at: Date;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  status: "in process" | "done" | "blocked";
  tag: "dev" | "QA" | "design";
  assignee: string;
};
