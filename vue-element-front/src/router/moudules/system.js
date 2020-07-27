import  layout from "@/layout";
import users from '@/views/nav1/Users.vue'
const systemRoute =    {

    path: '/system',

    component: layout,

    name: '用户管理',


    children: [

        { path: '/users', component: users, name: '管理员设置'},

    ]

}


export default systemRoute