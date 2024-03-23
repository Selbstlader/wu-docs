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
              text: '10+ 代码案例掌握 NodeJS 核心基础知识',
              items: [
                { text: '0开篇介绍：Node 10 年大跃进与当下在互联网研发中的地位', link: '/doc/Node/0开篇介绍：Node 10 年大跃进与当下在互联网研发中的地位.md' },
                { text: '1源码挖掘： Webpack 中用到 Node 的 10 个核心基础能力', link: '/doc/Node/1源码挖掘： Webpack 中用到 Node 的 10 个核心基础能力.md' },
                { text: '2案例一： [龟兔赛跑] Node 的语言基础 - JS（ES5[6[7[8）', link: '/doc/Node/2案例一： [龟兔赛跑] Node 的语言基础 - JS（ES5[6[7[8）.md' },
                { text: '2案例一： [龟兔赛跑] Node 的语言基础 - JS（ES5[6[7[8）', link: '/doc/Node/2案例一： [龟兔赛跑] Node 的语言基础 - JS（ES5[6[7[8）.md' },
                { text: '3案例二： [视频时长统计] Node 的模块机制（CommonJS）与包管理', link: '/doc/Node/3案例二： [视频时长统计] Node 的模块机制（CommonJS）与包管理.md' },
                { text: '4案例三：[发布 LTS 查看工具] Node 的生态利器 - NPM', link: '/doc/Node/4案例三：[发布 LTS 查看工具] Node 的生态利器 - NPM.md' },
                { text: '5案例四：[中英文 JSON 合并工具] Node 的文件操作能力 - fs', link: '/doc/Node/5案例四：[中英文 JSON 合并工具] Node 的文件操作能力 - fs.md' },
                { text: '6案例五： [实现一个音乐播放器] Node 的事件机制 - EventEmitter', link: '/doc/Node/6案例五： [实现一个音乐播放器] Node 的事件机制 - EventEmitter.md' },
                { text: '7案例六：[图片拷贝小工具] - Node 的编码与缓冲 - Buffer', link: '/doc/Node/7案例六：[图片拷贝小工具] - Node 的编码与缓冲 - Buffer.md' },
                { text: '8案例七：[视频流转 MP3 工具] - Node 数据流和管道 - Stream[pipe', link: '/doc/Node/8案例七：[视频流转 MP3 工具] - Node 数据流和管道 - Stream[pipe.md' },
                { text: '9案例八：[静态资源服务器] - Node 工具集 - path[util[zlib 等', link: '/doc/Node/9案例八：[静态资源服务器] - Node 工具集 - path[util[zlib 等.md' },
                { text: '10案例九： [实现 N 个 API[网页爬虫] Node 的 HTTP 处理 - 请求与响应', link: '/doc/Node/10案例九： [实现 N 个 API[网页爬虫] Node 的 HTTP 处理 - 请求与响应.md' },
                { text: '11案例十： [压测 Cluster 的并发负载] Node 的集群 - cluster', link: '/doc/Node/11案例十： [压测 Cluster 的并发负载] Node 的集群 - cluster.md' },
                { text: '12案例十一：[埋点搜集服务器] - 总结： Koa 服务端框架用到了哪些能力', link: '/doc/Node/12案例十一：[埋点搜集服务器] - 总结： Koa 服务端框架用到了哪些能力.md' },
                { text: '13源码解读：Node 的程序架构及启动流程', link: '/doc/Node/13源码解读：Node 的程序架构及启动流程.md' },
              ]
            },
          ]
        }
      ],
      '/ioT': [
        {
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
