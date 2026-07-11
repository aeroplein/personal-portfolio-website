import type { Project, ResearchInterest, SkillCategory } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8081').replace(/\/$/, '');

type ProjectApiResponse = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  role: string;
  takeaway: string;
  cardColor: Project['cardColor'];
  category: string;
  snippet?: string | null;
};

type SkillApiResponse = {
  id: number;
  name: string;
  category: string;
  level: 'familiar' | 'fluent' | 'expert';
  displayOrder: number;
};

type ResearchApiResponse = {
  id: string;
  title: string;
  description: string;
  iconName: string;
};

export type ContactRequest = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

export type ContactResponse = {
  ok: boolean;
  message: string;
  id: number;
  createdAt: string;
};

type ApiErrorBody = {
  message?: string;
  fieldErrors?: Record<string, string>;
  error?: string;
};

export class PortfolioApiError extends Error {
  constructor(
    message: string,
    public readonly fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.name = 'PortfolioApiError';
  }
}

async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorBody = body as ApiErrorBody;
    const firstFieldError = Object.values(errorBody.fieldErrors ?? {})[0];
    throw new PortfolioApiError(
      firstFieldError ?? errorBody.message ?? errorBody.error ?? 'The backend request failed.',
      errorBody.fieldErrors,
    );
  }

  return body as T;
}

function toProject(response: ProjectApiResponse): Project {
  return {
    id: response.id,
    title: response.title,
    description: response.description,
    tags: response.techStack,
    role: response.role,
    github: response.githubUrl ?? undefined,
    demo: response.liveUrl ?? undefined,
    takeaway: response.takeaway,
    cardColor: response.cardColor,
    category: response.category,
    snippet: response.snippet ?? undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const responses = await requestJson<ProjectApiResponse[]>('/api/projects');
  return responses.map(toProject);
}

export async function getProject(id: string): Promise<Project> {
  const response = await requestJson<ProjectApiResponse>(`/api/projects/${encodeURIComponent(id)}`);
  return toProject(response);
}

export async function getSkills(): Promise<SkillCategory[]> {
  const responses = await requestJson<SkillApiResponse[]>('/api/skills');
  const groupedSkills = new Map<string, SkillCategory['skills']>();

  for (const skill of responses) {
    const categorySkills = groupedSkills.get(skill.category) ?? [];
    categorySkills.push({ name: skill.name, level: skill.level });
    groupedSkills.set(skill.category, categorySkills);
  }

  return Array.from(groupedSkills, ([category, skills]) => ({ category, skills }));
}

export async function getResearch(): Promise<ResearchInterest[]> {
  const responses = await requestJson<ResearchApiResponse[]>('/api/research');
  return responses.map(({ id, title, description, iconName }) => ({
    id,
    title,
    description,
    iconName,
  }));
}

export function submitContact(request: ContactRequest): Promise<ContactResponse> {
  return requestJson<ContactResponse>('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
}
