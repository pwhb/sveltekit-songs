export function makeTree(all: any[], childrenKeyName = "children", parentKeyName = "parentId")
{
    const tree: any = {};
    all.forEach((document) =>
    {
        const docId = document._id.toString();
        const parentId = document[parentKeyName] && document[parentKeyName].toString();
        if (!tree[docId])
        {
            tree[docId] = { ...document, [childrenKeyName]: [] };
        } else
        {
            tree[docId] = { ...document, [childrenKeyName]: tree[docId][childrenKeyName] };
        }

        if (parentId && !tree[parentId])
        {
            tree[parentId] = { [childrenKeyName]: [] };
        }

        if (parentId)
        {
            if (!tree[parentId][childrenKeyName])
            {
                tree[parentId][childrenKeyName] = [];
            }
            tree[parentId][childrenKeyName].push(tree[docId]);
        }
    });
    return Object.values(tree).filter((document: any) => !document[parentKeyName]);
}

export function joinMenusAndPermissions(menus: any[], permissions: any[])
{
    const permissionsMap: any = {};

    permissions.forEach((permission: any) =>
    {
        if (!permissionsMap[permission.collection])
        {
            permissionsMap[permission.collection] = [];
        }
        permissionsMap[permission.collection].push(permission);
    });

    menus.forEach(menu =>
    {
        if (permissionsMap[menu.collection])
        {
            menu.permissions = permissionsMap[menu.collection];
        } else
        {
            menu.permissions = [];
        }
    });

    return menus;
}


export function extractSelectedDocuments(data: any[], key: string = "selected", childrenKeyName: string = "children")
{
    return data.reduce((acc, item) =>
    {
        if (item[key])
        {
            acc.push(item._id);
        }
        if (item[childrenKeyName] && item[childrenKeyName].length > 0)
        {
            acc.push(...extractSelectedDocuments(item[childrenKeyName]));
        }
        return acc;
    }, []);
}

export function extractSelectedIds(menuItems: any[])
{
    let menus: string[] = [];
    let permissions: string[] = [];

    function extract(menuItems: any)
    {
        menuItems.forEach((menuItem: any) =>
        {
            if (menuItem.selected)
            {
                menus.push(menuItem._id);
            }

            if (menuItem.permissions)
            {
                menuItem.permissions.forEach((permission: any) =>
                {
                    if (permission.selected)
                    {
                        permissions.push(permission._id);
                    }
                });
            }

            if (menuItem.children)
            {
                extract(menuItem.children);
            }
        });
    }

    extract(menuItems);

    return { menus, permissions };
}