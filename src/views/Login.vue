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
            <van-field v-model="userinfo.mobile"
                       required
                       clearable
                       label="手机号码"
                       placeholder="请输入手机"
                       :error="errors.has('mobile')"
                       name="mobile"
                       v-validate="'required'"/>
            <van-field v-model="userinfo.password"
                       type="password"
                       clearable
                       label="登录密码"
                       placeholder="请输入密码"
                       required
                       :error="errors.has('password')"
                       name="password"
                       v-validate="'required'"/>
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
                    let _valid = await this.$validator.validate();

                    if ( !_valid ) {
                        //验证失败 退出
                        this.$toast( "请输入" )

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
            //name() {
            //代码搞这里
            //return this.data;
            //}
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
