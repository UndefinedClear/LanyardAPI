// types.d.ts
import { AxiosInstance, AxiosResponse } from 'axios';

declare class User {
  id: string;
  displayName: string;
  username: string;
  avatarHash: string | null;
  isBot: boolean;

  constructor(
    id: string,
    displayName: string,
    username: string,
    avatarHash: string | null,
    isBot?: boolean
  );

  get avatarURL(): string | null;
  get discriminator(): string;
  toString(): string;
}

interface LanyardResponse {
  id: string;
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_web: boolean | null;
  active_on_discord_desktop: boolean | null;
  active_on_discord_mobile: boolean | null;
  active_on_discord_embedded: boolean | null;
  listening_to_spotify: boolean;
  kv?: Record<string, any>;
  activities: Array<{
    name: string;
    type: number;
    state?: string;
    details?: string;
    timestamps?: {
      start?: number;
      end?: number;
    };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
    application_id?: string;
    [key: string]: any;
  }>;
  discord_user: {
    id: string;
    username: string;
    display_name?: string;
    global_name?: string;
    avatar?: string;
    discriminator: string;
    public_flags: number;
    bot: boolean;
  };
}

declare class LanyardAPI {
  userId: string;
  url: string;
  private _cache: LanyardResponse | null;

  constructor(userId: string);

  /**
   * Fetches the latest data from Lanyard API
   */
  fetch(): Promise<LanyardResponse>;

  /**
   * Returns the Discord user object from the response
   */
  getDiscordUser(): Promise<LanyardResponse['discord_user']>;

  /**
   * Returns the KV store data
   * @param key Optional key to retrieve specific value
   */
  getKV<T = any>(key?: string | null): Promise<T | null | Record<string, any>>;

  /**
   * Returns the list of active Discord activities
   */
  getActivities(): Promise<LanyardResponse['activities']>;

  /**
   * Returns status information including active platforms and Spotify status
   */
  getStatus(): Promise<{
    status: 'online' | 'idle' | 'dnd' | 'offline';
    active_on: {
      web: boolean | null;
      desktop: boolean | null;
      mobile: boolean | null;
      embedded: boolean | null;
    };
    listening_to_spotify: boolean | null;
  }>;

  /**
   * Returns a User instance with parsed Discord user data
   */
  getUser(): Promise<User>;
}

export { LanyardAPI, User };