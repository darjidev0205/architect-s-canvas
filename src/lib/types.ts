export type Project = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  cover_image: string | null;
  tech_stack: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  case_study: string | null;
  display_order: number;
  created_at: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  read_minutes: number;
  published_at: string;
};
