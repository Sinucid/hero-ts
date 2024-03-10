export interface ApiRequest extends RequestInit {
  url: string;
}

export interface ApiResponse<Response> {
  data?: Response;
  error?: ApiError;
}

export interface ApiError {
  message: string;
}

export const api = async <Response>({
  url,
  ...options
}: ApiRequest): Promise<ApiResponse<Response>> => {
  try {
    const data = (await (await fetch(url, options)).json()) as Response;
    return { data };
  } catch {
    return { error: { message: "something went wrong" } };
  }
};
