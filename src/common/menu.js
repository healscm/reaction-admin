import { isUrl } from '../utils/utils';

const menuData = [
    {
        name: '不良反应',
        icon: 'api',
        path: 'reaction',
        children: [
            {
                name: '用户列表',
                path: 'user-list',
                icon: 'user',
            },
            {
                name: '症状类别列表',
                path: 'category-list',
                icon: 'appstore-o',
            },
            {
                name: '症状列表',
                path: 'reaction-list',
                icon: 'bars',
            },
            {
                name: '患友经验列表',
                path: 'exp-list',
                icon: 'exception',
            },
        ],
    },
    {
        name: '管理',
        icon: 'api',
        path: 'admin',
        children: [
            {
                name: '客户端列表',
                path: 'client-list',
                icon: 'user',
            },
        ],
    },
    // {
    //     name: '小程序',
    //     icon: 'wechat',
    //     path: 'mini-program',
    //     children: [
    //         {
    //             name: '用户列表',
    //             path: 'user-list',
    //             icon: 'user',
    //         },
    //         {
    //             name: '症状类别列表',
    //             path: 'category-list',
    //             icon: 'appstore-o',
    //         },
    //         {
    //             name: '症状列表',
    //             path: 'reaction-list',
    //             icon: 'bars',
    //         },
    //         {
    //             name: '患友经验列表',
    //             path: 'exp-list',
    //             icon: 'exception',
    //         },
    //     ],
    // },
];

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map((item) => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);
