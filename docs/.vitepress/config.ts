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
  title: "小菜的笔记",
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
      { text: '个人博客', link: '/blog/2022-05-28' },
      { text: '指南', link: '/Vue/index' }
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
            { text: 'Electron', link: '../note/Electron' }
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
                { text: 'Electron 是什么？可以做什么', link: '/doc/Electron/1.md' },
                { text: '3.如何开发 Vite 3 插件构建 Electron 开发环境？', link: '/doc/Electron/2.md' },
                { text: '4.如何开发 Vite 3 插件打包 Electron 应用？', link: '/doc/Electron/3.md' },
                { text: '5.如何引入 vue-router 及控制工程架构？', link: '/doc/Electron/4.md' },
                { text: '6.如何管控应用的窗口（上）？', link: '/doc/Electron/5.md' },
                { text: '7.如何管控应用的窗口（下）？', link: '/doc/Electron/6.md' },
                { text: '8.如何引入 Pinia 并管控应用的数据状态？', link: '/doc/Electron/7.md' },
                { text: '9.如何引入客户端数据库及相关工具？', link: '/doc/Electron/8.md' },
                { text: '10.桌面应用开发需要掌握哪些数据库知识（上）？', link: '/doc/Electron/9.md' },
                { text: '11.桌面应用开发需要掌握哪些数据库知识（下）？', link: '/doc/Electron/10.md' },
                { text: '12.如何为 Electron 应用开发原生模块？', link: '/doc/Electron/11.md' },
                { text: '13.如何升级 Electron 应用？', link: '/doc/Electron/12.md' },
                { text: '14.Electron 应用具备哪些特征？', link: '/doc/Electron/13.md' },
                { text: '15.如何调试 Electron 应用？', link: '/doc/Electron/14.md' },
                { text: '16.Electron 疑难杂症解决方案', link: '/doc/Electron/15.md' },
              ]
            },
            {
              text: 'Netty 入门与实战：仿写微信 IM 即时通讯系统',
              items: [
                { text: '仿微信 IM 系统简介', link: '/doc/Netty/1.md' },
                { text: 'Netty 是什么？', link: '/doc/Netty/2.md' },
                { text: 'Netty 环境配置', link: '/doc/Netty/3.md' },
                { text: '服务端启动流程', link: '/doc/Netty/4.md' },
                { text: '客户端启动流程', link: '/doc/Netty/5.md' },
                { text: '实战:客户端与服务端双向通信', link: '/doc/Netty/6.md' },
                { text: '数据传输载体 ByteBuf', link: '/doc/Netty/7.md' },
                { text: '客户端与服务端通信协议', link: '/doc/Netty/8.md' },
                { text: '实战:实现客户端登录', link: '/doc/Netty/9.md' },
                { text: '实战:实现客户端与服务端收发', link: '/doc/Netty/10.md' },
                { text: 'pipeline 与 channelHandler', link: '/doc/Netty/11.md' },
                { text: '实战:构建客户端与服务端 pipeline', link: '/doc/Netty/12.md' },
                { text: '实战战拆包粘包理论与解决方案', link: '/doc/Netty/13.md' },
                { text: 'channelHandler 的生命周期', link: '/doc/Netty/14.md' },
                { text: '实战:使用 channelHandler的热插拔实现客户端身份校验', link: '/doc/Netty/15.md' },
                { text: '实战:客户端互聊原理与实现', link: '/doc/Netty/16.md' },
                { text: '实实战:群聊的发起与通知', link: '/doc/Netty/17.md' },
                { text: '实战:群聊的成员管理(加入与退出，获取成员列表)', link: '/doc/Netty/18.md' },
                { text: '实战:群聊消息的收发及 Netty 性能优化', link: '/doc/Netty/19.md' },
                { text: '心跳与空闲检测', link: '/doc/Netty/20.md' },
                { text: '小册总结', link: '/doc/Netty/21.md' },
                { text: '小册读者总结', link: '/doc/Netty/22.md' },
                { text: '扩展:进阶学习 Netty 的方向与资料', link: '/doc/Netty/23.md' },
              ]
            },
          ]
        }
      ],
      '/Go/': [{
        text: 'Go',
        items: [
          { text: '微服务', link: '../Go/server' },
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
