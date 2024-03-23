---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: '不要额外加糖'
  text: '专门收集本人学习笔记'
  image:
    src: './static/img/xin.png'
    alt: Fu
  tagline: 读书笔记专栏
  actions:
    - theme: brand
      text: 开始学习
      link: /note/ajax
    - theme: alt
      text: 基础面试题
      link: /interview/html

features:
  - icon:
      src: ./static/img/LogosVue.svg
    title: Vue
    details: Vue 是一个 JavaScript 框架，旨在帮助开发人员构建可扩展的 Web 应用程序。
  - icon:
      src: ./static/img/LogosVitejs.svg
    title: Vite
    details: Vite是下一代前端开发与构建工具。
  - icon:
      src: ./static/img/LogosReact.svg
    title: React
    details: React是用于构建用户界面的JavaScript库，起源于Facebook的内部项目
---

<style>
:root {
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>
