---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: '明日方舟'
  text: '小菜专门收集本人学习笔记'
  image:
    src: './static/img/user.jpg'
    alt: Fu
  tagline: 语雀
  actions:
    - theme: brand
      text: 小册子
      link: /doc/Electron/1
    - theme: alt
      text: 开卷
      link: /note/ajax
    - theme: alt
      text: 基础面试题
      link: /interview/html
    # - theme: alt
    #   text: 万物互联
    #   link: /ioT/AC.html

features:
  - icon:
      src: ./static/img/LogosVue.svg
    title: Vue
    details: 是中国人就用Vue
  - icon:
      src: ./static/img/LogosVitejs.svg
    title: Vite
    details: 跑分背景板
  - icon:
      src: ./static/img/LogosReact.svg
    title: React
    details: 不是react我不用
---

<style>
:root {
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
.VPContent{
    /* background-image: url('./static/img/bg.png'); */
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.box{
  /* background-image: linear-gradient(to right, #bd34fe, #41d1ff); */
}
</style>
