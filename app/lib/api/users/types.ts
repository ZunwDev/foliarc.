export type User = {
  id: string;
  created_at: string;
  username: string;
  name: string | null;
  email: string | null;
  location: string | null;
  tags: string[] | null;
  interactions: string[] | null;
  bio: string | null;
};
