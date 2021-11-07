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
        ['link', { rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#c6a951' }],
        ['link', { rel: 'manifest', href: '/favicons/site.webmanifest' }],
        ['link', { rel: 'shortcut icon', href: '/favicons/favicon.ico' }],
        ['meta', { name: 'msapplication-config', content: '/favicons/browserconfig.xml' }],
        ['meta', { name: 'theme-color', content: '#c6a951' }],
    ],
    themeConfig: {
        repo: 'NamelessMC/Nameless',
        docsRepo: 'NamelessMC/Documentation',
        repoLabel: 'Contribute',
        editLinkText: 'Help us improve this page.',
        editLinks: true,
        logo: '/logos/nameless.svg',
        nav: [
            {
                text: 'Plugin',
                link: '/plugin/2.0/info'
            },
            {
                text: 'Discord',
                link: 'https://discord.gg/nameless'
            },
            {
                text: 'Website',
                link: 'https://namelessmc.com/'
            },
            {
                text: 'Spigot thread',
                link: 'https://www.spigotmc.org/threads/nameless-minecraft-website-software.34810'
            }
        ],
        sidebar: {
            '/': [
                {
                    title: 'NamelessMC',
                    collapsable: false,
                    path: "/main/",
                    currentVersion: '2.0',
                    versions: [
                        {
                            title: 'v2-pr13',
                            name: '2.0',
                            status: 'beta',
                            children: [
                                '/about.md'
                            ]
                        },
                        {
                            title: 'v1.0.21',
                            name: '1.0',
                            status: 'stable',
                            children: [
                                '/about.md'
                            ]
                        },
                    ]
                },
                {
                    title: 'Setup',
                    collapsable: false,
                    path: "/setup/",
                    currentVersion: '2.0',
                    versions: [
                        {
                            title: 'v2-pr13',
                            name: '2.0',
                            status: 'current',
                            children: [
                                '/installation_vps.md',
                                '/installation_webhost.md',
                                '/webserver.md',
                                '/database.md',
                                '/ssl.md',
                                '/smtp.md'
                            ]
                        },
                    ]
                },
                {
                    title: 'Troubleshooting',
                    collapsable: false,
                    children: [
                        '/troubleshooting/faq.md'
                    ]
                },
            ],
            '/plugin/': [
                {
                    title: 'Info',
                    collapsable: false,
                    path: "/info/",
                    currentVersion: '2.0',
                    versions: [
                        {
                            title: 'v2-pr13',
                            name: '2.0',
                            status: 'current',
                            children: [
                                '/about.md',
                                '/installation.md',
                                '/errors.md'
                            ]
                        },
                    ]
                },
                {
                    title: 'Troubleshooting',
                    collapsable: false,
                    children: [
                        '/troubleshooting/plugin.md'
                    ]
                },
            ],
        },
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
