import dayjs from 'dayjs';
export const slugify = (str: string) =>
{
    const split = str.toLowerCase().replace('?', '').split(' ');
    return split.join('-');
};

export const getBreadcrumbs = (pathname: string) =>
{
    const split = pathname.split('/').slice(1);
    const breadcrumbs = split.map((val, idx) =>
    {
        return {
            label: idx === 0 ? 'home' : val,
            href: '/' + split.slice(0, idx + 1).join('/')
        };
    });
    return breadcrumbs;
};

export const parseDate = (date: string) => dayjs(date).format('MMM D, YYYY h:mm A');
