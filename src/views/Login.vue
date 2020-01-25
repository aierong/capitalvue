<!--
作者:chenghao
功能:vue页
-->

<!--
登录页面
-->
<template>
    <div>
        <mynavbar title="用户登录"
                  lefttext="注册账号"
                  @ClickLeft="onClickLeft"></mynavbar>
        <br>
        <van-cell-group>
            <van-field v-model="$v.userinfo.mobile.$model"
                       :error-message="MobileErrorInfo"
                       required
                       clearable
                       label="手机号码"
                       placeholder="请输入手机"/>

            <van-field v-model="$v.userinfo.password.$model"
                       :error-message="PwdErrorInfo"
                       type="password"
                       required
                       clearable
                       label="登录密码"
                       placeholder="请输入密码"/>

        </van-cell-group>
        <br>
        <div class="mytxt">{{ '保持登录状态'+days+ '天'}}</div>
        <van-button size="large"
                    @click="loginClick"
                    type="primary">登 录
        </van-button>
        <br>
        <br>
        <br>
    </div>
</template>

<!-- js脚本代码片段 -->
<script>
    import { mapMutations } from 'vuex'

    import * as commonmethod from '@/common/bmobapi/users.js'

    import * as constant from '@/common/constant.js'
    //导入
    import { mix } from "@/mixin/index.js"

    //验证器
    import { required } from 'vuelidate/lib/validators'

    export default {
        name : "Login" ,
        //导入混入对象 可以是多个,数组
        mixins : [ mix ] ,
        //数据模型
        data () {
            return {
                userinfo : {
                    //手机号码
                    mobile : '' ,
                    password : ''
                } ,
                days : constant.CookieExpires
            }
        } ,
        //每个要验证的值，必须在validations选项内部创建一个键
        validations : {
            userinfo : {
                mobile : {
                    required ,
                } ,
                password : {
                    required ,
                } ,
            } ,

        } ,
        //方法
        methods : {
            ...mapMutations( [

                'updateloginuser'

            ] ) ,
            //注册
            onClickLeft () {
                this.$router.push( '/register' )

                return;
            } ,
            //登录
            loginClick () {

                ( async () => {
                    //let _valid = await this.$validator.validate();
                    let _valid = this.$v.$invalid;

                    // if ( !_valid ) {
                    if ( _valid ) {
                        //验证失败 退出
                        // 不用提示
                        // this.$toast( "请输入帐号或者密码" )

                        return;
                    }

                    let _mobile = this.userinfo.mobile;

                    let valid = await commonmethod.isexistsmobile( _mobile )

                    if ( !valid.isexists ) {

                        this.$toast( "手机号码不正确" )

                        return
                    }

                    let result = await commonmethod.login( _mobile , this.userinfo.password )

                    if ( result.isok ) {

                        // 存储token
                        let token = result.data
                        //console.log( token )

                        //this.$store.commit( vuextypes.updateloginuser , token );
                        this.updateloginuser( token );

                        // 页面跳转
                        this.$router.push( "/myindexpage" )

                        return
                    }
                    else {
                        this.$toast( "密码错误" )

                        return
                    }
                } )()

            } ,

        } ,
        //计算属性
        computed : {
            MobileErrorInfo () {
                if ( !this.$v.userinfo.mobile.required ) {
                    return "手机号码不允许空";
                }
                return "";
            } ,
            PwdErrorInfo () {
                if ( !this.$v.userinfo.password.required ) {
                    return "登录密码不允许空";
                }
                return "";
            } ,

        } ,
        //生命周期(mounted)
        mounted () {

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./Login.css"
       scoped>
</style>
