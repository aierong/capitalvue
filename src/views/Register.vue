<!--
作者:chenghao
功能:vue页
-->

<!--
用户注册页面
 -->
<template>
    <div>

        <mynavbar title="注册新用户"
                  lefttext="返回"
                  @ClickRight="onClickRight"
                  @ClickLeft="onClickLeft"
                  righttext="说明"
                  righticon="label-o"></mynavbar>
        <br>
        <van-cell-group>

            <van-field v-model="$v.userinfo.mobile.$model"
                       required
                       clearable
                       label="手机号码"
                       placeholder="请输入手机号码"
                       :error-message="MobileErrorInfo"/>

            <van-field v-model="$v.userinfo.name.$model"
                       required
                       clearable
                       label="用户名"
                       placeholder="请输入用户名"
                       :error-message="NameErrorInfo"/>


            <van-field v-model="$v.userinfo.email.$model"
                       clearable
                       required
                       label="邮箱"
                       placeholder="请输入邮箱"
                       :error-message="EmailErrorInfo"/>


            <van-field v-model="$v.userinfo.password.$model"
                       type="password"
                       label="密码"
                       placeholder="请输入密码"
                       required
                       :error-message="PwdErrorInfo"/>

            <van-field v-model="$v.userinfo.password2.$model"
                       type="password"
                       label="再次密码"
                       placeholder="请输入密码"
                       required
                       :error-message="Pwd2ErrorInfo"/>

        </van-cell-group>
        <br>

        <van-cell is-link
                  value="选择头像"
                  size="large"
                  @click="SetupAvatarClick">
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:58px;">
                    <use v-bind:xlink:href="userinfo.avatar | iconallname"></use>
                </svg>
            </template>
        </van-cell>
        <br><br>
        <van-button size="large"
                    @click="regClick"
                    type="primary">注 册
        </van-button>
        <br><br><br>
        <!--
        头像选择弹窗组件
        -->
        <userselectavatar @selectavatar="selectavatar"
                          :diaObj="diaObj"></userselectavatar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    //验证器
    import {
        email ,
        required ,
        minLength ,
        maxLength ,
        sameAs ,
        //仅接受字母数字
        alphaNum

    } from 'vuelidate/lib/validators'

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"
    //导入
    import { mix } from "@/mixin/index.js"

    import * as commonmethod from '@/common/bmobapi/users.js'

    import * as globalconstant from '@/common/constant.js'

    //导入组件
    import userselectavatar from '@/components/userselectavatar.vue'

    export default {
        name : "Register" ,
        //导入混入对象 可以是多个,数组
        mixins : [
            mix
        ] ,
        //注册组件
        components : {
            userselectavatar
        } ,
        //每个要验证的值，必须在validations选项内部创建一个键
        validations : {
            userinfo : {
                name : {
                    required ,
                } ,
                email : {
                    required ,
                    email
                } ,

                password : {
                    required ,
                    minLength : minLength( 6 ) ,
                    maxLength : maxLength( 12 ) ,
                    alphaNum
                } ,
                password2 : {
                    SamePwd : sameAs( ( nestedModel ) => {
                        // console.log( 'SamePwd nestedModel' , nestedModel );

                        //返回要比较的属性
                        return nestedModel.password;
                    } )
                } ,
                mobile : {
                    required ,
                    //自己定义验证规则 返回true就是验证成功
                    // 是移动号码
                    IsMobile ( value ) {
                        return /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test( value );
                    } ,
                    //是存在手机号码
                    IsExistsMobile ( value ) {
                        let lens = value.length;

                        if ( lens == 11 ) {
                            // console.log( '11' , value )

                            return new Promise( ( resolve , reject ) => {

                                commonmethod.isexistsmobile( value ).then( ( res ) => {

                                    // console.log( 'res' , res.isexists )

                                    if ( res.isexists ) {

                                        resolve( false );
                                    }
                                    else {
                                        resolve( true );
                                    }
                                } );

                            } );

                        }

                        return true;
                    } ,
                }

            } ,

        } ,
        //数据模型
        data () {
            return {
                diaObj : {
                    showdialog : false ,
                    avatar : ''
                } ,
                userinfo : {
                    //手机号码
                    mobile : '' ,
                    email : '' ,
                    password2 : '' ,
                    password : '' ,
                    name : '' ,

                    //头像 先默认一个头像
                    avatar : globalconstant.avatariconlist[ 0 ]

                } ,

            }
        } ,
        //方法
        methods : {
            selectavatar ( _avatar ) {
                this.diaObj.avatar = _avatar;

                this.userinfo.avatar = _avatar;

                return;
            } ,

            SetupAvatarClick () {
                this.diaObj = {
                    showdialog : true ,
                    avatar : this.userinfo.avatar
                }

                return;
            } ,
            onClickLeft () {

                this.$router.push( '/login' )

                return;
            } ,
            onClickRight () {

                this.$toast( "这里可以注册一个新帐号" )

                return;
            } ,
            regClick () {

                ( async () => {

                    this.$v.$touch();


                    let _valid = this.$v.$invalid;

                    if ( _valid ) {
                        //验证失败 退出
                        // 不用提示
                        // this.$toast( "验证失败" )

                        return;
                    }

                    let result = await commonmethod.isexistsmobile( this.userinfo.mobile );

                    if ( result.isexists ) {

                        this.$toast( "手机号码已经注册" )

                        return;
                    }

                    let newuser = await commonmethod.adduser( this.userinfo );

                    if ( newuser != null ) {
                        this.$toast.success( "成功,请登录" );

                        this.$router.push( '/login' );

                        return;
                    }

                } )();

            } ,

        } ,
        //计算属性
        computed : {
            NameErrorInfo () {
                if ( this.$v.userinfo.name.$error ) {
                    if ( !this.$v.userinfo.name.required ) {
                        return "用户名不可以为空";
                    }
                }

                return "";
            } ,
            EmailErrorInfo () {
                if ( this.$v.userinfo.email.$error ) {
                    if ( !this.$v.userinfo.email.required ) {
                        return "邮箱不允许空";
                    }

                    if ( !this.$v.userinfo.email.email ) {
                        return "邮箱格式不正确";
                    }
                }

                return "";
            } ,
            MobileErrorInfo () {
                if ( this.$v.userinfo.mobile.$error ) {
                    if ( !this.$v.userinfo.mobile.required ) {
                        return "手机号码不允许空";
                    }

                    if ( !this.$v.userinfo.mobile.IsMobile ) {
                        return "请输入合法手机号码";
                    }

                    if ( !this.$v.userinfo.mobile.IsExistsMobile ) {
                        return "手机号码已经注册";
                    }
                }

                return "";
            } ,
            Pwd2ErrorInfo () {
                if ( this.$v.userinfo.password2.$error ) {
                    if ( !this.$v.userinfo.password2.SamePwd ) {
                        return "2次密码不一致";
                    }
                }

                return "";
            } ,
            PwdErrorInfo () {
                if ( this.$v.userinfo.password.$error ) {
                    if ( !this.$v.userinfo.password.required ) {
                        return "密码不允许空";
                    }

                    if ( !this.$v.userinfo.password.minLength ) {
                        return `密码最小长度${ this.$v.userinfo.password.$params.minLength.min }`;
                    }

                    if ( !this.$v.userinfo.password.maxLength ) {
                        return `密码最大长度${ this.$v.userinfo.password.$params.maxLength.max }`;
                    }

                    if ( !this.$v.userinfo.password.alphaNum ) {
                        return "密码只接收字母和数字";
                    }
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
<style scoped
       src="./Register.css">
</style>
