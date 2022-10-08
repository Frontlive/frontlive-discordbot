import axios from 'axios';
import { env } from '../config';

const axiosInstance = axios.create({
  baseURL: 'https://api.twitch.tv/helix/eventsub/subscriptions',
  headers: {
    'Client-ID': env.TWITCH_CLIENT_ID,
    Authorization: `Bearer ${env.TWITCH_ACCESS_TOKEN}`,
  },
});

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
