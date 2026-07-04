export interface RedisClientInterface {
  client: any;
  url: string;
  isConnected: boolean | null;
  password: string;
  ttl: number;
  createClient: () => Promise<void>;
  connectToClient: () => Promise<void>;
  setCache: (key: string, message: any) => Promise<void>;
  getCache: (key: string) => Promise<any>;
}
