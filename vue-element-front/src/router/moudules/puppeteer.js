import layout from "@/layout";
import puppeteer from '@/views/puppeteer'
const puppeteerRoute = {


    path: '/puppeteer',
    component: layout,
    redirect: '/puppeteer/puppeteers',
    name: 'puppeteer',
    children: [
        { path: 'puppeteers', component: puppeteer, name: 'puppeteers', meta: { routePath: '/puppeteer' } },

    ]


}

export default puppeteerRoute