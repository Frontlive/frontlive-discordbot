import { PrismaClient } from '@prisma/client';

const addNewUserToDatabase = (discordId: string) => {
	const prisma = new PrismaClient();

	return prisma.user.create({
		data: {
			discordId: discordId,
			stats: {
				create: {
					thanksPoints: 1
				}
			}
		}
	});
};

export const getUserWithStats = async (userDiscordId: string) => {
	const prisma = new PrismaClient();

	return prisma.user.findUnique({
		where: {
			discordId: userDiscordId
		},
		include: {
			stats: true
		}
	});
};

const updateUserThanksStat = (userDiscordId: string, thanksPoints: number) => {
	const prisma = new PrismaClient();

	return prisma.user.update({
		where: {
			discordId: userDiscordId
		},
		data: {
			stats: {
				update: {
					thanksPoints
				}
			}
		}
	});
};

export const addPointToUserThanksStats = async (userDiscordId: string) => {
	const user = await getUserWithStats(userDiscordId);

	if (!user) {
		await addNewUserToDatabase(userDiscordId);
		return;
	}

	if (!user.stats) {
		return;
	}
	const userThanksPoints = user.stats.thanksPoints + 1;
	updateUserThanksStat(userDiscordId, userThanksPoints);
};
