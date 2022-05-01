import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/views/Home";
import About from "@/views/About";
import Community from "@/views/Community";
import Help from "@/views/Help";
import Trade from "@/views/Trade";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Lab from "@/views/Lab";
import Market from "@/views/Lab/Market";
import Result from "@/views/Lab/Result";
import OneStock from "@/views/Lab/OneStock";
import Trading from "@/views/Lab/Trading";
import Optional from "@/views/Lab/Optional";
import ChooseStock from "@/views/Lab/ChooseStock";
import Setting from "@/views/User/setting";
import UserDetail from "@/views/User/UserDetail";
import Hs300 from "@/components/Trade/StockPool/Hs300";
import MySelect from "@/components/Trade/StockPool/MySelect";
import Plate from "@/components/Trade/StockPool/Plate";
import SmallMoney from "@/components/Trade/StockPool/SmallMoney";
import All from "@/components/Trade/StockPool/All";
import AILab from "@/views/AILab";

const routes = [
    {
        path: '/',
        redirect: 'home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/community',
        name: 'Community',
        component: Community
    },
    {
        path: '/help',
        name: 'Help',
        component: Help
    },
    {
        path: '/trade',
        name: 'Trade',
        component: Trade
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Setting

    },
    {
        path: '/user_detail',
        name: 'UserDetail',
        component: UserDetail

    },
    {
        path: '/login',
        name: 'Login',
        component: Login

    },
    {
        path: '/register',
        name: 'Register',
        component: Register

    },
    {
        path: '/ailab',
        name: 'AILab',
        component: AILab

    },
    {
        path: '/lab',
        name: 'Lab',
        component: Lab,
        children: [
            {
                path: 'chooseStock',
                name: 'LabChooseStock',
                component: ChooseStock
            },
            {
                path: 'market',
                name: 'LabMarket',
                component: Market
            },
            {
                path: 'oneStock',
                name: 'LabOneStock',
                component: OneStock
            },
            {
                path: 'optional',
                name: 'LabOptional',
                component: Optional
            },
            {
                path: 'trading',
                name: 'LabTrading',
                component: Trading,
                children:[
                    {
                        path: 'hs300',
                        name: 'Hs300',
                        component: Hs300
                    },
                    {
                        path: 'mySelect',
                        name: 'MySelect',
                        component:MySelect
                    },
                    {
                        path: 'plate',
                        name: 'Plate',
                        component:Plate
                    },
                    {
                        path: 'smallMoney',
                        name: 'SmallMoney',
                        component:SmallMoney
                    },
                    {
                        path: 'all',
                        name: 'All',
                        component:All
                    },

                ]
            },
            {
                path: 'result',
                name: 'Result',
                component: Result
            }
        ]
    },

]

//
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
