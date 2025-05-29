import axios from 'axios';

const API_URL = 'http://localhost:4444/api/github';

export interface CreateRepoParams {
  name: string;
  description?: string;
  private?: boolean;
  language: string;
  framework: string;
}

export interface RepoResponse {
  id: number;
  name: string;
  fullName: string;
  url: string;
  cloneUrl: string;
  private: boolean;
  createdAt: string;
}

export const githubService = {
  async createRepository(params: CreateRepoParams): Promise<RepoResponse> {
    try {
      const response = await axios.post(`${API_URL}/repository`, params);
      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to create repository');
      }
      return response.data.data;
    } catch (error: unknown) {
      // Handle axios error
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      // Re-throw unknown errors
      throw new Error('Failed to create repository: Unknown error');
    }
  },
};
