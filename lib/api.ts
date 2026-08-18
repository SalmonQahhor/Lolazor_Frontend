import axios, { AxiosError } from "axios";
import type {
  EpisodeDetail,
  EpisodeList,
  EpisodesQueryParams,
  PaginatedResponse,
  Person,
  PersonDetail,
  PeopleQueryParams,
  Quote,
  QuotesQueryParams,
  Resource,
  ResourcesQueryParams,
  Topic,
} from "@/types/api";

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// HAR BIR GET SO'ROVIGA UNIKAL VAQT TAMG'ASI QO'SHISH
// Bu brauzer keshini aylanib o'tadi va CORS xatoligini keltirib chiqarmaydi
apiClient.interceptors.request.use((config) => {
  if (config.method === "get") {
    config.params = {
      ...config.params,
      _t: Date.now(),
    };
  }
  return config;
});

/** Normalized error shape thrown by every helper below. */
export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function handleError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError;
    const status = err.response?.status;
    if (err.code === "ECONNABORTED") {
      throw new ApiError(
        "Server javob berish vaqti tugadi. Backend ishga tushirilganini tekshiring.",
        status
      );
    }
    if (!err.response) {
      throw new ApiError(
        `Lolazor serveriga ulanib bo'lmadi (${API_BASE_URL}). Backend ishlayotganini tekshiring.`,
        status
      );
    }
    throw new ApiError(
      `So'rov bajarilmadi (${status}): ${err.response.statusText || "Noma'lum xatolik"}`,
      status
    );
  }
  throw new ApiError("Kutilmagan xatolik yuz berdi.");
}

function buildParams(params?: Record<string, unknown>) {
  if (!params) return undefined;
  const cleaned: Record<string, unknown> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      cleaned[key] = value;
    }
  });
  return cleaned;
}

// --------------------------------------------------------------------------
// Episodes
// --------------------------------------------------------------------------

export async function getEpisodes(
  params?: EpisodesQueryParams | Record<string, any>
): Promise<PaginatedResponse<EpisodeList>> {
  try {
    const { data } = await apiClient.get<PaginatedResponse<EpisodeList>>(
      "/episodes/",
      { params: buildParams(params as Record<string, unknown>) }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
}

export async function getEpisodeDetail(id: number | string): Promise<EpisodeDetail> {
  try {
    const { data } = await apiClient.get<EpisodeDetail>(`/episodes/${id}/`);
    return data;
  } catch (error) {
    handleError(error);
  }
}

// --------------------------------------------------------------------------
// People
// --------------------------------------------------------------------------

export async function getPeople(
  params?: PeopleQueryParams | Record<string, any>
): Promise<PaginatedResponse<Person>> {
  try {
    const { data } = await apiClient.get<PaginatedResponse<Person>>(
      "/people/",
      { params: buildParams(params as Record<string, unknown>) }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
}

export async function getPersonDetail(id: number | string): Promise<PersonDetail> {
  try {
    const { data } = await apiClient.get<PersonDetail>(`/people/${id}/`);
    return data;
  } catch (error) {
    handleError(error);
  }
}

// --------------------------------------------------------------------------
// Topics
// --------------------------------------------------------------------------

export async function getTopics(): Promise<Topic[]> {
  try {
    const { data } = await apiClient.get<Topic[] | PaginatedResponse<Topic>>(
      "/topics/"
    );
    return Array.isArray(data) ? data : (data.results || []);
  } catch (error) {
    handleError(error);
  }
}

// --------------------------------------------------------------------------
// Quotes
// --------------------------------------------------------------------------

export async function getQuotes(
  params?: QuotesQueryParams | Record<string, any>
): Promise<PaginatedResponse<Quote>> {
  try {
    const { data } = await apiClient.get<PaginatedResponse<Quote>>(
      "/quotes/",
      { params: buildParams(params as Record<string, unknown>) }
    );
    return data;
  } catch (error) {
    handleError(error);
  }
}

// --------------------------------------------------------------------------
// Resources
// --------------------------------------------------------------------------

export async function getResources(
  params?: ResourcesQueryParams | Record<string, any>
): Promise<Resource[] | PaginatedResponse<Resource>> {
  try {
    const { data } = await apiClient.get<
      Resource[] | PaginatedResponse<Resource>
    >("/resources/", { params: buildParams(params as Record<string, unknown>) });
    return data;
  } catch (error) {
    handleError(error);
  }
}