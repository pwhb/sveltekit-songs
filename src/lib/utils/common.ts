export const serialize = (payload: any) => JSON.parse(JSON.stringify(payload));

export const getAvatarPlaceholder = (user: any) =>
{
	if (user.firstName && user.lastName)
	{
		return user.firstName[0] + user.lastName[0];
	}

	return user.username[0];
};