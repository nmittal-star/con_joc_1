export interface OAuthClient {
  sl: number;
  name: string;
  id: string | null;
  client_secret: string | null;
  redirect_uris: string[];
}