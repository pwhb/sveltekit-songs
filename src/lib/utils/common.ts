export const serialize = (payload: any) => JSON.parse(JSON.stringify(payload));

export const getAvatarPlaceholder = (user: any) =>
{
	if (user.firstName && user.lastName)
	{
		return user.firstName[0] + user.lastName[0];
	}

	return user.username[0];
};

export const getUrlFromQuery = (pathname: string, query: any) =>
{
	for (const [key, value] of Object.entries(query))
	{
		if (value === undefined || value === null || value === "" || value === "null") delete query[key];
	}
	return pathname + `?${new URLSearchParams(query).toString()}`;
};

export const parseKey = (obj: any, key: string) =>
{
	const keys = key.split('.');
	if (keys.length === 1) return obj[keys[0]];
	return keys.reduce((o, k) => o && o[k], obj);
};