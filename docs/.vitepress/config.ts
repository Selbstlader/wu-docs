import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    [
      'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
      { rel: 'icon', href: './static/img/favicon.ico' }
    ]
  ],
  base:"/wu-docs/",
  title: "不要额外加糖",
  description: "专门收集本人的学习笔记",
  themeConfig: {
    logo: './static/img/favicon.ico',
    search: {
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
            {text: 'HTML', link: '../interview/html'},
            {text: 'CSS', link: '../interview/css'},
            {text: 'JS', link: '../interview/javascript'},
            {text: 'Vue', link: '../interview/vue'}
          ]
        }
      ],
      '/note/': [
        {
          text: '读书笔记',
          items: [
            {text: 'Ajax', link: '../note/ajax'},
            {text: 'Axios', link: '../note/axios'},
            {text: 'Fetch', link: '../note/fetch'},
            {text: 'Git', link: '../note/git'},
            {text: 'Less', link: '../note/less'},
            {text: 'Sass', link: '../note/sass'},
            {text: 'Regexp', link: '../note/regexp'},
            {text: 'Webpack', link: '../note/webpack'},
            {text: 'Uni-app', link: '../note/uniapp'},
            {text: 'Ts', link: '../note/ts'},
            {text: 'Vue2', link: '../note/vue2'},
            {text: 'Vue3', link: '../note/vue3'},
            {text: 'React', link: '../note/react'},
            {text: 'Nest', link: '../note/nest'},
            {text: 'Mysql', link: '../note/mysql'},
            {text: 'Rust', link: '../note/rust'},
          ]
        }
      ],
      '/blog': [
        {
          text: '个人博客',
          items: [
            {text: '节流和防抖', link: '../blog/2022-05-28'},
            {text: 'Object.defineProperty&Proxy', link: '../blog/2023-04-16'},
            {text: 'vue.js 设计与实现', link: '../blog/2023-05-17'},
            {text: 'vue2 封装 Echarts', link: '../blog/2023-07-25'},
            {text: 'ts 内置函数', link: '../blog/2023-09-06'},
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ffgenius' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Bin'
    }
  }
})
