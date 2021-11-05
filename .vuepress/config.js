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
            '/community/': [
                {
                    title: 'Community Guides',
                    collapsable: false,
                    children: [
                        '/community/about.md',
                    ]
                },
                {
                    title: 'Panel Installation',
                    collapsable: false,
                    children: [
                        '/community/installation-guides/panel/centos7.md',
                        '/community/installation-guides/panel/centos8.md',
                        '/community/installation-guides/panel/debian9.md',
                        '/community/installation-guides/panel/debian10.md',
                        '/community/installation-guides/panel/ubuntu1804.md',
                        '/community/installation-guides/panel/ubuntu2004.md',
                    ]
                },
                {
                    title: 'Wings Installation',
                    collapsable: false,
                    children: [
                        '/community/installation-guides/wings/centos7.md',
                        '/community/installation-guides/wings/centos8.md',
                        '/community/installation-guides/wings/debian9.md',
                        '/community/installation-guides/wings/debian10.md',
                        '/community/installation-guides/wings/ubuntu1804.md',
                        '/community/installation-guides/wings/ubuntu2004.md',
                    ]
                },
                {
                    title: 'Creating Eggs',
                    collapsable: false,
                    children: [
                        '/community/config/eggs/creating_a_custom_egg.md',
                        '/community/config/eggs/creating_a_custom_image.md',
                    ],
                },
                {
                    title: 'Game Configuration',
                    collapsable: false,
                    children: [
                        '/community/games/minecraft.md',
                    ],
                },
                {
                    title: 'Tutorials',
                    collapsable: false,
                    children: [
                        '/community/config/nodes/add_node.md',
                        '/community/tutorials/artisan.md',
                    ],
                },
                {
                    title: 'Customization',
                    collapsable: false,
                    children: [
                        '/community/customization/panel.md',
                        '/community/customization/wings.md',
                    ],
                },
            ],
            '/': [
                {
                    title: 'NamelessMC',
                    collapsable: false,
                    children: [
                        '/main/main.md',
                    ]
                },
                {
                    title: 'Panel',
                    collapsable: false,
                    path: '/panel/',
                    currentVersion: '1.0',
                    versions: [
                        {
                            title: '1.6',
                            name: '1.0',
                            status: 'stable',
                            children: [
                                '/getting_started',
                                '/webserver_configuration',
                                '/additional_configuration',
                                '/updating',
                                '/troubleshooting',
                                '/legacy_upgrade',
                            ]
                        }
                    ]
                },
                {
                    title: 'Wings',
                    collapsable: false,
                    path: '/wings/',
                    currentVersion: '1.0',
                    versions: [
                        {
                            title: '1.5',
                            name: '1.0',
                            status: 'stable',
                            children: [
                                '/installing',
                                '/upgrading',
                                '/migrating',
                                '/configuration',
                            ]
                        }
                    ]
                },
                {
                    title: 'Tutorials',
                    collapsable: false,
                    children: [
                        '/tutorials/mysql_setup.md',
                        '/tutorials/creating_ssl_certificates.md',
                    ],
                },
                {
                    title: 'Guides',
                    collapsable: false,
                    children: [
                        '/guides/mounts.md',
                    ],
                },
                {
                    title: 'Development & Ops',
                    collapsable: true,
                    children: [
                        '/ops/publish_release.md',
                    ],
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
