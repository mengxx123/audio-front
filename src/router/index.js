import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Text2Audio = resolve => require(['@/views/Text2Audio'], resolve)
const Audio2Text = resolve => require(['@/views/Audio2Text'], resolve)
const FormatConvert = resolve => require(['@/views/FormatConvert'], resolve)
const LyricConvert = resolve => require(['@/views/LyricConvert'], resolve)
const Player = resolve => require(['@/views/Player'], resolve)
const Join = resolve => require(['@/views/Join'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/text2audio',
        component: Text2Audio
    },
    {
        path: '/audio2text',
        component: Audio2Text
    },
    {
        path: '/formatConvert',
        component: FormatConvert
    },
    {
        path: '/join',
        component: Join
    },
    {
        path: '/lyric/convert',
        component: LyricConvert
    },
    {
        path: '/viewer',
        component: Player
    },
    {
        path: '/viewer',
        component: Player
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
