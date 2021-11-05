module.exports = {
    base: '/',
    title: 'NamelessMC',
    description: 'NamelessMC is a free, easy to use & powerful website software for your Minecraft server, which includes a large range of features.',
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        ['vuepress-plugin-container', {
            type: 'warning',
        }],
        ['vuepress-plugin-container', {
            type: 'tip',
        }],
        ['vuepress-plugin-container', {
            type: 'danger',
        }],
        ['tabs'],
    ],
    configureWebpack: {
        serve: {
            hot: {
                port: 9091,
            },
        },
    },
    head: [
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicons/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' }],
        ['link', { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#0e4688' }],
        ['link', { rel: 'manifest', href: '/favicons/site.webmanifest' }],
        ['link', { rel: 'shortcut icon', href: '/favicons/favicon.ico' }],
        ['meta', { name: 'msapplication-config', content: '/favicons/browserconfig.xml' }],
        ['meta', { name: 'theme-color', content: '#c6a951' }],
    ],
    themeConfig: {
        repo: 'namelessmc/nameless',
        docsRepo: 'namelessmc/documentation',
        repoLabel: 'Contribute',
        editLinkText: 'Help us improve this page.',
        editLinks: true,
        logo: '/logos/nameless.svg',
        nav: [
            {
                text: 'Documentation',
                link: '/project/introduction.md',
            },
            {
                text: 'Community Guides',
                link: '/community/about.md',
            },
            {
                text: 'Discord',
                link: 'https://discord.gg/nameless'
            }
        ],
        sidebar: {
            '/guides/': [
                {
                    title: 'Helpful Guides',
                    path: '',
                    collapsable: false,
                    children: [
                        'automod',
                        'custom-colors'
                    ]
                },
                //{
                //    title: 'Patreon',
                //    path: 'patreon'
                //}
                // {
                //     title: 'Patreon',
                //     path: '/guides/patreon',
                //     children: [
                //         {title: 'Patreon Red', path: '/guides/patreon#patreon-red'}
                //     ]
                // }
            ],
            '/': [
                {
                    title: 'WidgetBot',
                    path: '/'
                },
                {
                    title: 'Tutorial',
                    path: '/tutorial/',
                    collapsable: false,
                    children: [
                        { title: 'Crate', path: '/embed/crate/tutorial' },
                        { title: 'html-embed', path: '/embed/html-embed/tutorial' },
                        { title: 'iframes', path: '/tutorial/iframes' }
                    ]
                },
                {
                    title: 'Embed',
                    path: '/embed/',
                    collapsable: false,
                    children: [
                        {
                            title: 'Crate',
                            path: '/embed/crate/',
                            collapsable: false,
                            children: [
                                { title: 'Intro', path: '/embed/crate/' },
                                { title: 'Tutorial', path: 'embed/crate/tutorial' },
                                { title: 'Options', path: 'embed/crate/options' },
                                { title: 'API', path: 'embed/crate/api' },
                                { title: 'Examples', path: 'embed/crate/examples' }
                            ]
                        },
                        {
                            title: 'html-embed',
                            path: '/embed/html-embed/',
                            collapsable: false,
                            children: [
                                { title: 'Intro', path: '/embed/html-embed/' },
                                { title: 'Tutorial', path: 'embed/html-embed/tutorial' },
                                { title: 'Attributes', path: 'embed/html-embed/attributes' },
                                { title: 'API', path: 'embed/html-embed/api' }
                            ]
                        },
                        {
                            title: 'react-embed',
                            path: '/embed/react-embed/',
                            collapsable: false,
                            children: [
                                { title: 'Intro', path: '/embed/react-embed/' },
                                { title: 'Props', path: 'embed/react-embed/props' }
                            ]
                        }
                    ]
                },
                {
                    title: 'Bot',
                    path: '',
                    collapsable: false,
                    children: [
                        '/bot/moderation'
                    ]
                }
            ]
        },
        searchPlaceholder: 'Search',
        nextLinks: true,
        prevLinks: true,
        smoothScroll: true
    },
    postcss: {
        plugins: [
            require('postcss-import'),
            require('tailwindcss')('./tailwind.js'),
            require('precss'),
            require('autoprefixer'),
            require('cssnano'),
        ]
    },
};