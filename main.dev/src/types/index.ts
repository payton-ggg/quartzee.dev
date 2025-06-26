export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}