import Login from '@/views/Login.vue'

import  layout from "@/layout";
import minRoute from "./moudules/xuemin";

import systemRoute from "./moudules/system";
import puppeteerRoute from "./moudules/puppeteer";

let routes = [

    {
        path: '/login',

        component: Login,

        name: '',

        hidden: true

    },
    {
        path: '/',

        component: layout,

        name: '',

        hidden: true

    },
    minRoute,
    systemRoute,
    puppeteerRoute

];



export default routes;