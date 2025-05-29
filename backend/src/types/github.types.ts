export interface CreateRepoParams {
  name: string;
  description?: string;
  private?: boolean;
  language: string;
  framework: string;
}

export interface CreateRepoResponse {
  success: boolean;
  data?: {
    id: number;
    name: string;
    fullName: string;
    url: string;
    cloneUrl: string;
    private: boolean;
    createdAt: string;
  };
  error?: string;
}
