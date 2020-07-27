<template>

    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">

        <h2 class="title">张双双的个人博客</h2>

        <el-form-item prop="account">

            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>

        </el-form-item>

        <el-form-item prop="checkPass">

            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>

        </el-form-item>

        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>

        <el-form-item style="width:100%;">

            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>

        </el-form-item>

    </el-form>

</template>

<script>
import axios from 'axios';
import { requestLogin, RequestUacAuth, BASE_URL,testRouter} from '../api/api';

//import NProgress from 'nprogress'

export default {

    data() {

        return {

            logining: false,

            ruleForm2: {

                account: '',

                checkPass: ''

            },

            rules2: {

                account: [

                    { required: true, message: '请输入账号', trigger: 'blur' },

                    //{ validator: validaePass }

                ],

                checkPass: [

                    { required: true, message: '请输入密码', trigger: 'blur' },

                    //{ validator: validaePass2 }

                ]

            },

            checked: true

        };

    },

    methods: {

        handleReset2() {

            this.$refs.ruleForm2.resetFields();

        },

        handleSubmit2(ev) {

            var _this = this;

            this.$refs.ruleForm2.validate((valid) => {

                if (valid) {

                    this.logining = true;

                    var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };

                    requestLogin(loginParams).then(data => {

                        this.logining = false;

                        this.checkAuthResult(data)

                    });

                } else {

                    return false;

                }

            });

        },





        checkAuthResult(data) {

            let { msg, code,user } = data;
            if (code !== 200) {

                this.$message({

                    message: msg || '账号或密码错误',

                    type: 'error'

                });

            } else {
                    console.log(111111111111)
                    this.setAuthToken(user)   

                    this.$router.push({ path: '/users' }) 

             

                }

        },



        setAuthToken(user) {

            sessionStorage.setItem('user', JSON.stringify(user));

        },



        checkUacAuthResult(data) {

            let { msg, code, user, access_token, refresh_token } = data;

            if (code !== 200) {

                let uac = 'https://uac.zte.com.cn/portal/login.html?businessSystemCode=100000232871&url=' + encodeURIComponent(location.href)

                location.href = uac

            } else {

                this.setAuthToken(user, access_token, refresh_token)

                let referrer = sessionStorage.getItem('referrer');

                if (referrer != null && referrer != '/') {

                    this.$router.push(referrer)

                    sessionStorage.removeItem('referrer');

                } else {

                    this.$router.push({ path: '/vulnAlarms' });

                }



            }

        },



        getUacAuth() {

            let userId = this.getCookie('ZTEDPGSSOUser')

            let userCookie = this.getCookie('ZTEDPGSSOCookie')

            if (userId == null || userCookie == null) {

                userId = this.getCookie('PORTALSSOUser')

                userCookie = this.getCookie('PORTALSSOCookie')

            }

            let uacAuthParams = { userId: userId, userCookie: userCookie, businessSystemCode: '100000232871' };

            RequestUacAuth(uacAuthParams).then(data => {

                this.checkUacAuthResult(data)

            });

        },



        getCookie(name) {

            let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

            if (arr = document.cookie.match(reg))

                return (arr[2]);

            else

                return null;

        },


    },

    mounted() {

        if (document.domain === 'wxsec.zte.com.cn') {

            this.getUacAuth()

        }

        self = this

        document.onkeydown=function(event){

            var e = event || window.event || arguments.callee.caller.arguments[0];           

             if(e && e.keyCode==13){ 

                self.handleSubmit2()

            }

        }; 

    },

    beforeCreate() {

        document.getElementsByTagName("body")[0].className = "add_bg";

    },

    beforeDestroy() {

        document.body.removeAttribute("class", "add_bg");

    }

}

</script>

<style lang="scss" scoped>

.login-container {

    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/

    -webkit-border-radius: 5px;

    border-radius: 5px;

    -moz-border-radius: 5px;

    background-clip: padding-box;

    margin: 180px auto;

    width: 350px;

    padding: 35px 35px 15px 35px;

    background: #fff;

    border: 1px solid #eaeaea;

    box-shadow: 0 0 25px #cac6c6;



    .title {

        margin: 0px auto 40px auto;

        text-align: center;

        color: #505458;

    }



    .remember {

        margin: 0px 0px 35px 0px;

    }

}

</style>