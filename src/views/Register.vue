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
            <van-field v-model="userinfo.mobile"
                       required
                       clearable
                       label="手机号码"
                       placeholder="请输入手机号码"

                       :error-message="errors.first('mobile')"
                       :error="errors.has('mobile')"
                       name="mobile"
                       v-validate="'required|IsMobile|IsExistsMobile'"/>
            <van-field v-model="userinfo.name"
                       required
                       clearable
                       label="用户名"
                       placeholder="请输入用户名"

                       :error="errors.has('name')"
                       name="name"
                       v-validate="'required'"/>
            <van-field v-model="userinfo.email"
                       clearable
                       label="邮箱"
                       placeholder="请输入邮箱"

                       :error-message="errors.first('email')"
                       :error="errors.has('email')"
                       name="email"
                       v-validate="'required|email'"/>
            <van-field v-model="userinfo.password"
                       type="password"
                       label="密码"
                       placeholder="请输入密码"
                       required

                       :error-message="errors.first('password')"
                       :error="errors.has('password')"
                       name="password"
                       ref="pwd1"
                       v-validate="'required|min:3|alpha_dash'"/>
            <van-field v-model="userinfo.password2"
                       type="password"
                       label="再次密码"
                       placeholder="请输入密码"
                       required

                       :error-message="errors.first('password2')"
                       :error="errors.has('password2')"
                       name="password2"
                       v-validate="'required|min:3|alpha_dash|confirmed:pwd1'"/>

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
        <!--头像选择弹窗组件-->
        <userselectavatar @selectavatar="selectavatar"

                          :diaObj="diaObj"></userselectavatar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>

    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"
    //导入
    import { mix } from "@/mixin/index.js"

    import * as commonmethod from '@/common/bmobapi/users.js'

    import * as globalconstant from '@/common/constant.js'

    //导入组件
    import userselectavatar from '@/components/userselectavatar.vue'

    //验证
    const validate = {
        custom : {
            mobile : {
                required : () => '请输入手机号码' ,
            } ,
            email : {
                required : () => '请输入邮箱' ,
                email : ( fiield , params ) => {

                    return `请输入合法邮箱`
                } ,

            } ,
            password : {
                required : () => '请输入密码' ,
                min : ( fiield , params ) => {
                    return `密码不得小于${ params[ 0 ] }个字符`
                } ,
                alpha_dash : () => {
                    return '密码只可包含英文,数字,下划线,破折号'
                } ,
            } ,
            password2 : {
                required : () => '请输入再次密码' ,
                min : ( fiield , params ) => {
                    return `再次密码不得小于${ params[ 0 ] }个字符`
                } ,
                alpha_dash : () => {
                    return '再次密码只可包含英文,数字,下划线,破折号'
                } ,
                confirmed : () => '2次密码不一致'
            } ,

        } ,
    };

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
                    let valid = await this.$validator.validate();

                    if ( !valid ) {
                        //验证失败 退出
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
            //name() {
            //代码搞这里
            //return this.data;
            //}
        } ,
        //生命周期(mounted)
        mounted () {
            this.$validator.localize( 'zh_CN' , validate );

            /**
             *  mobileRule 这个是自定义的验证规则
             */
            this.$validator.extend( 'IsMobile' , {
                getMessage : ( field , args ) => {
                    // console.log( 'field , args' , field , args )

                    return '请输入合法手机号码(11位)'
                } ,
                validate : ( value , args ) => {
                    // console.log( 'value,args' , value , args )

                    return /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test( value )
                }
            } );

            this.$validator.extend( 'IsExistsMobile' , {
                getMessage : ( field , args , data ) => {
                    // console.log( 'field , args ,data ' , field , args ,data  )

                    return data;
                } ,
                validate : ( value , args ) => {
                    // console.log( 'value,args' , value , args )
                    return new Promise( ( resolve , reject ) => {
                        let lens = value.length;

                        if ( lens == 11 ) {
                            commonmethod.isexistsmobile( value ).then( ( res ) => {
                                if ( res.isexists ) {

                                    resolve( {
                                        valid : false ,
                                        data : '手机号存在'
                                    } );
                                }
                                else {
                                    resolve( {
                                        valid : true ,
                                        data : ''
                                    } );
                                }
                            } );
                        }
                        else {
                            resolve( {
                                valid : true ,
                                data : ''
                            } );
                        }
                    } );

                }
            } )
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./Register.css">
</style>
