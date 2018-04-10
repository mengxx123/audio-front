import Vue from 'vue'
import Router from 'vue-router'

// const Home = resolve => require(['@/views/Home'], resolve)
const Text2Audio = resolve => require(['@/views/Text2Audio'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        redirect: '/text2audio'
        // component: Home
    },
    {
        path: '/text2audio',
        component: Text2Audio
    },
    {
        path: '/about',
        component: About
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