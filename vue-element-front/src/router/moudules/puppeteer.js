import  layout from "@/layout";
import puppeteer from '@/views/puppeteer'
const puppeteerRoute ={
    

        path: '/puppeteer',
        component: layout,
        name: 'puppeteer',
        children: [
            { path: '/puppeteer', component: puppeteer, name: 'puppeteer'},

        ]

    
}

export default puppeteerRoute