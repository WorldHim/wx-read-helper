// ==UserScript==
// @name         微信读书优化插件
// @namespace    https://github.com/WorldHim/wx-read-helper/
// @version      0.2
// @description  优化微信读书的网页版体验
// @author       sunhaojie, WorldHim
// @match        https://weread.qq.com/web/reader/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //修改右侧滚动条
    var style = document.createElement("style");
    style.type = "text/css";
    var text = document.createTextNode("body::-webkit-scrollbar { width: 10px; height: 10px;} body::-webkit-scrollbar-track { background: rgb(239, 239, 239); border-radius: 2px;} body::-webkit-scrollbar-thumb{ background: #bfbfbf; border-radius: 10px;} body::-webkit-scrollbar-thumb:hover { background: #333;}");
    style.appendChild(text);
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
    //文字内容
    var app = document.getElementsByClassName("app_content")[0];
    app.style.maxWidth = "100%";
    //顶部导航栏
    var readerTopBar = document.getElementsByClassName("readerTopBar")[0];
    readerTopBar.style.maxWidth = "100%";
    //右侧浮动菜单
    var readerControls = document.getElementsByClassName("readerControls")[0];
    readerControls.style.marginLeft ="0";
    readerControls.style.left = "inherit";
    readerControls.style.right = "2%";
    //自动下一章
    //按键操作
    HTMLElement.prototype.pressKey = function(code) {
        var evt = document.createEvent("UIEvents");
        evt.keyCode = code;
        evt.initEvent("keydown", true, true);
        this.dispatchEvent(evt);
    }
    //下一章
    function nextChapter() {
        //获取网页总高度
        var htmlHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        //获取网页可视高度
        var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
        //浏览器滚动条顶部
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        //console.log(scrollTop + clientHeight, htmlHeight);
        if (scrollTop + clientHeight >= htmlHeight - 50) {
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
            document.body.pressKey(39);
            console.log("下一章");
        }
    }
    //防误翻
    function debounce(fn, delay) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
                fn.apply(this, arguments);
            },delay)
        }
    }
    window.onscroll = debounce(nextChapter, 200);
})();
