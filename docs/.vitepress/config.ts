import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    [
      'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
      { rel: 'icon', href: './static/img/favicon.ico' }
    ]
  ],
  base: "/wu-docs/",
  title: "明日方舟",
  description: "专门收集本人的学习笔记",
  themeConfig: {
    logo: './static/img/favicon.ico', search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '当前目录'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '个人博客', link: '/blog/2022-05-28' }
    ],

    sidebar: {
      '/interview/': [
        {
          text: '基础面试题',
          items: [
            { text: 'HTML', link: '../interview/html' },
            { text: 'CSS', link: '../interview/css' },
            { text: 'JS', link: '../interview/javascript' },
            { text: 'Vue', link: '../interview/vue' }
          ]
        }
      ],
      '/note/': [
        {
          text: '读书笔记',
          items: [
            { text: 'Ajax', link: '../note/ajax' },
            { text: 'Axios', link: '../note/axios' },
            { text: 'Fetch', link: '../note/fetch' },
            { text: 'Git', link: '../note/git' },
            { text: 'Less', link: '../note/less' },
            { text: 'Sass', link: '../note/sass' },
            { text: 'Regexp', link: '../note/regexp' },
            { text: 'Webpack', link: '../note/webpack' },
            { text: 'Uni-app', link: '../note/uniapp' },
            { text: 'Ts', link: '../note/ts' },
            { text: 'Vue2', link: '../note/vue2' },
            { text: 'Vue3', link: '../note/vue3' },
            { text: 'React', link: '../note/react' },
            { text: 'Nest', link: '../note/nest' },
            { text: 'Mysql', link: '../note/mysql' },
            { text: 'Rust', link: '../note/rust' },
          ]
        }
      ],
      '/blog': [
        {
          text: '个人博客',
          items: [
            { text: '节流和防抖', link: '../blog/2022-05-28' },
            { text: 'Object.defineProperty&Proxy', link: '../blog/2023-04-16' },
            { text: 'vue.js 设计与实现', link: '../blog/2023-05-17' },
            { text: 'vue2 封装 Echarts', link: '../blog/2023-07-25' },
            { text: 'ts 内置函数', link: '../blog/2023-09-06' },
          ]
        }
      ],
      '/doc': [
        {
          text: '小册子',
          collapsed: true, // 可以折叠，且默认关闭
          items: [
            {
              text: 'Electron + Vue 3 桌面应用开发',
              items: [
                { text: 'Electron 是什么？可以做什么', link: '/doc/Node/1.md' },
                { text: '3.如何开发 Vite 3 插件构建 Electron 开发环境？', link: '/doc/Node/2.md' }, 
                { text: '4.如何开发 Vite 3 插件打包 Electron 应用？', link: '/doc/Node/3.md' },
                { text: '5.如何引入 vue-router 及控制工程架构？', link: '/doc/Node/4.md' }, 
                { text: '6.如何管控应用的窗口（上）？', link: '/doc/Node/5.md' }, 
                { text: '7.如何管控应用的窗口（下）？', link: '/doc/Node/6.md' }, 
                { text: '8.如何引入 Pinia 并管控应用的数据状态？', link: '/doc/Node/7.md' }, 
                { text: '9.如何引入客户端数据库及相关工具？', link: '/doc/Node/8.md' }, 
                { text: '10.桌面应用开发需要掌握哪些数据库知识（上）？', link: '/doc/Node/9.md' }, 
                { text: '11.桌面应用开发需要掌握哪些数据库知识（下）？', link: '/doc/Node/10.md' }, 
                { text: '12.如何为 Electron 应用开发原生模块？', link: '/doc/Node/11.md' }, 
                { text: '13.如何升级 Electron 应用？', link: '/doc/Node/12.md' }, 
                { text: '14.Electron 应用具备哪些特征？', link: '/doc/Node/13.md' }, 
                { text: '15.如何调试 Electron 应用？', link: '/doc/Node/14.md' }, 
                { text: '16.Electron 疑难杂症解决方案', link: '/doc/Node/15.md' },
              ]
            },
          ]
        }
      ],
      '/ioT': [{
        text: '万物互联',
        items: [
          { text: '小空调', link: '../ioT/AC.html' },
        ]
      }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Selbstlader' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Bin'
    }
  }
})
