export type User = {
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  tags: { value: string; label: string }[];
  socials: { platform: string; url: string }[];
};

export type Project = {
  id: string;
  type: "portfolio" | "project";
  status: "pending" | "denied" | "approved";
  title?: string;
  likeAmount: number;
  createdAt: string;
  repliesCount: number;
  image: string;
  reason?: string;
  technologies: string[];
};

export type Option = {
  value: string;
  label: string;
};

export type ApiError = {
  code: string;
  details: string | null;
  hint: string | null;
  message: string;
};

export type ApprovedItem = {
  id: string;
  userName: string;
  email: string;
  portfolioUrl: string;
  type: "portfolio" | "project";
  title?: string;
  avatarUrl: string;
  submitDate: string;
  technologies: { value: string; label: string }[];
  status: "pending" | "approved" | "denied";
};
