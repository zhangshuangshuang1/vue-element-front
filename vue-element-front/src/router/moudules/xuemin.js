import layout from "@/layout";
import richText from '@/views/nav1/richText.vue'
const minRoute = {


    path: '/xuemin',
    component: layout,
    redirect: '/xuemin/richText',
    name: '富文本1',
    children: [
        { path: 'richText', component: richText, name: '富文本', meta: { routePath: '/xuemin' } },

    ]


}

export default minRoute