import type { Stats } from '@prisma/client';

export type UserStats = Omit<Stats, 'id' | 'createdAt' | 'userId'>;
