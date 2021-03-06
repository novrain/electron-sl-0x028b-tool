// 定义控制台的ID和路径（layout-container是支持多个complex部分的，需增加plugin定义）
export const COMPLEX_CONTAINER_ID = 'console'
export const COMPLEX_CONTAINER_PATH = 'console'
export const SIMPLE_CONTAINER_PATH = 'app' // vue-router 多层 / 时，优先使用了深层次的 路由，所以必须区分开


export const rootContainerPlugin = {
    plugin: require('./framework/root'), opts: {
        redirect: '/console'
    }
}

export const layoutContainerPlugin = {
    plugin: require('./framework/layout-container'), opts: {
        simple: { // 简单页面，用于包裹简单的登录、404等页面 
            logo: '/assets/imgs/logo.png',  // 放置在静态目录页面
            background: '/assets/imgs/bg.png',
            copyright: `@2015-${new Date().getFullYear()}  版权所有 `,
            path: SIMPLE_CONTAINER_PATH
        },
        complex: {
            type: 'console',
            id: COMPLEX_CONTAINER_ID,
            path: COMPLEX_CONTAINER_PATH,
            // authFailRedirect: '/app/signin',
            // 覆盖内部配置
            layout: {
                console: {
                    left: {
                        top: {
                            defaultLogo: '/assets/imgs/defaultLogo.png',
                            defaultLogoCollapsed: '/assets/imgs/defaultLogoCollapsed.png',
                        }
                    }
                }
            }
        },
        // messageCenter: {
        //     port: '18884',
        //     nsp: 'iota'
        // }
    }
}

export const generalPagePlugin = {
    plugin: require('./framework/general-pages'), opts: { // 404 等
        parents: [
            { path: 'iota', props: { link: '/' } },  // root page
            { path: `iota/${SIMPLE_CONTAINER_PATH}`, props: { link: `${SIMPLE_CONTAINER_PATH}` } },
            { path: `iota/${COMPLEX_CONTAINER_PATH}`, props: { link: `/${COMPLEX_CONTAINER_PATH}` } },
        ]
    }
}

export const menuPlugin = {
    plugin: require('./plugins/base/menu'), opts: {
        id: 'menu',
        containerId: COMPLEX_CONTAINER_ID
    }
}

export const sl651Plugin = {
    plugin: require('./plugins/apps/sl651-center'), opts: {
        id: 'sl651',
        containerId: COMPLEX_CONTAINER_ID,
        menuId: 'menu'
    }
}

export default {
    cookie: {
        prefix: 'ii-'
    },
    plugins: [
        rootContainerPlugin,
        layoutContainerPlugin,
        generalPagePlugin,
        menuPlugin,
        sl651Plugin
    ]
}