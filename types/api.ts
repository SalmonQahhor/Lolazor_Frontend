// ==========================================================================
// Lolazor API types
// ==========================================================================

export type PersonRole = "host" | "guest";
export type ResourceType = "book" | "article" | "link";

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PersonMinimal {
  id: number;
  full_name: string;
  role: PersonRole;
  avatar: string | null;
}

export interface Person {
  id: number;
  full_name: string;
  role: PersonRole;
  avatar: string | null;
  bio: string;
  episodes_count: number;
  
  telegram?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
}

export interface PersonDetail extends Person {
  created_at: string;
  guest_episodes?: EpisodeList[];
  hosted_episodes?: EpisodeList[];
}

export interface Topic {
  id: number;
  name: string;
  slug: string;
}

export interface Quote {
  id: number;
  person: PersonMinimal;
  text: string;
  timestamp: string;
  episode?: number;
}

export interface Resource {
  id: number;
  title: string;
  type: ResourceType;
  url: string;
}

export interface EpisodeList {
  id: number;
  title: string;
  youtube_id: string;
  youtube_url: string;
  release_date: string;
  views_count?: string;
  is_super_episode: boolean;
  hosts: PersonMinimal[];
  guests: PersonMinimal[];
  topics?: Topic[];
}

export interface EpisodeDetail extends EpisodeList {
  description: string;
  quotes: Quote[];
  resources: Resource[];
  topics?: Topic[];
}

export interface EpisodesQueryParams {
  page?: number;
  search?: string;
  hosts?: number;
  guests?: number;
  release_date?: string;
  is_super_episode?: boolean | string;
  ordering?: string;
  release_date__year?: number;
  topics__slug?: string;
}

export interface PeopleQueryParams {
  search?: string;
  role?: PersonRole;
  ordering?: string;
}

export interface QuotesQueryParams {
  search?: string;
  episode?: number;
  person?: number;
  page?: number;
}

export interface ResourcesQueryParams {
  episode?: number;
  type?: ResourceType;
}