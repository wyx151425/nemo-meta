function getFileNativeUrl(file) {
    let url = null;
    if (undefined !== window.createObjectURL) {
        url = window.createObjectURL(file);
    } else if (undefined !== window.URL) {
        url = window.URL.createObjectURL(file);
    } else if (undefined !== window.webkitURL) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

Vue.component("meta-header", {
    props: ["user"],
    template: `
        <header class="header">
            <div class="header-fixed" v-if="user">
                <div class="container">
                    <h1 class="app-name"><a href="meta-index.html">Meta</a></h1>
                    <section class="account" @mouseover="navVisible" @mouseout="navInvisible">
                        <div class="account-info">
                            <img class="account-avatar" src="../images/default.png" alt=""/>
                            <span class="account-name">王振琦</span>
                            <span class="icon icon-menu-down"></span>
                        </div>
                        <nav class="account-nav" v-if="isVisible" v-cloak>
                            <a class="account-item" href="user-index.html"><span class="icon icon-user"></span>我的课程</a>
                            <a class="account-item" href="user-settings.html"><span class="icon icon-cog"></span>我的信息</a>
                            <p class="account-item account-logout"><span class="icon icon-off"></span>退出登录</p>
                        </nav>
                    </section>
                </div>
            </div>
            <div class="header-fixed" v-else>
                <div class="container">
                    <h1 class="app-name"><a href="meta-index.html">Meta</a></h1>
                    <section class="header-action">
                        <button class="btn btn-petite btn-default login-action">登录</button>
                        <a href="user-register.html">
                            <button class="btn btn-petite btn-primary">注册</button>
                        </a>
                    </section>
                </div>
            </div>
        </header>
    `
});

const header = new Vue({
    el: "#header",
    data: {
        isVisible: false,
        timer: null
    },
    methods: {
        navVisible: function () {
            clearInterval(this.timer);
            this.timer = null;
            this.isVisible = true;
        },
        navInvisible: function () {
            this.timer = setInterval(function () {
                header.isVisible = false;
            }, 500);
        }
    }
});

Vue.component("meta-footer", {
    template: `
        <footer class="footer">
            <span>ALL RIGHTS RESERVED FOR RUMOFUTURE</span>
        </footer>
    `
});

const footer = new Vue({
    el: "#footer"
});

Vue.component("meta-popover", {
    props: ["prompts"],
    template: `
        <div class="popover-modal" v-if="prompts.length > 0">
            <meta-popover  v-bind:key="prompt.id" v-bind:prompt="prompt"></meta-popover>
            <div class="popover" :class="{error: 0 == prompt.status, success: 1 == prompt.status, warning: 2 == prompt.status, info: 3 == prompt.status}"
                v-for="prompt in prompts">
                <span class="icon icon-ok-sign" v-if="0 == prompt.status"></span>
                <span class="icon icon-remove-sign" v-if="1 == prompt.status"></span>
                <span class="icon icon-exclamation-sign" v-if="2 == prompt.status"></span>
                <span class="icon icon-info-sign" v-if="3 == prompt.status"></span>
                <span>{{prompt.message}}</span>
            </div>
        </div>
    `
});

const popover = new Vue({
    el: "#popover",
    data: {
        prompts: [],
        index: 0
    },
    methods: {
        push: function (status, message) {
            let prompt = {id: this.index, status: status, message: message};
            this.index++;
            this.prompts.push(prompt);
            setTimeout(function () {
                popoverModal.prompts.shift(prompt);
            }, 5000);
        }
    }
});
