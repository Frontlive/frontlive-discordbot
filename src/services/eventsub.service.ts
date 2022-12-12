import axios from 'axios';
import { env } from '../config';

const axiosInstance = axios.create({
  baseURL: 'https://api.twitch.tv/helix/eventsub/subscriptions',
  headers: {
    'Client-ID': env.TWITCH_CLIENT_ID,
  },
});

export const generateAccessToken = async () => {
  const { data } = await axios.post<AuthPayload>('https://id.twitch.tv/oauth2/token', {
    client_id: env.TWITCH_CLIENT_ID,
    client_secret: env.TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials',
  });

  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
};

export const getSubscriptions = async () => {
  const { data } = await axiosInstance.get<Payload>('/');
  return data;
};

export const createSubscription = async (type: string, condition: Record<string, string>) => {
  const { data } = await axiosInstance.post<Payload>('/', {
    version: '1',
    type,
    condition,
    transport: {
      method: 'webhook',
      callback: env.EVENTSUB_CALLBACK,
      secret: env.EVENTSUB_SECRET,
    },
  });
  return data;
};

export const deleteSubscription = async (id: string) => {
  await axiosInstance.delete(`/?id=${id}`);
};

interface Subscription {
  id: string;
  status: string;
  type: string;
  version: string;
  condition: Record<string, string>;
  created_at: string;
  transport: {
    method: string;
    callback: string;
  };
  cost: string;
}

interface Payload {
  total: number;
  data: Subscription[];
  max_total_cost: number;
  total_cost: number;
  pagination: unknown;
}

interface AuthPayload {
  access_token: string;
  expires_in: number;
  token_type: string;
}
