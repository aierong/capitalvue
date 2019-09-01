<!--
作者:chenghao
Date: 2019/8/24
Time: 14:57
功能:
-->

<!-- html代码片段 -->
<template>

    <div>

        <!--这里整个头像-->
        <van-cell size="large"
                  @click="SetupAvatarClick">
            <template slot="title">
                <svg class="icon"
                     aria-hidden="true"
                     style="font-size:58px;">
                    <use v-bind:xlink:href="loginuseravatar | iconallname"></use>
                </svg>
                <span class="cellspantitleclass">{{ loginusername +'('  + loginusermobile + ')' }}</span>

            </template>
        </van-cell>
        <van-cell is-link
                  @click="updatepwdClick">
            <template slot="title">
                <van-icon name="setting-o"
                          style="font-size:15px;"/>
                <span class="cellspantitleclass">修改密码</span>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <van-icon name="fire-o"
                          style="font-size:15px;"/>
                <span class="cellspantitleclass">
                    <a href="https://github.com/aierong/capitalvue"
                       target="_blank">github</a></span>
            </template>
        </van-cell>
        <van-cell is-link
                  @click="exitClick">
            <template slot="title">
                <van-icon name="share"
                          style="font-size:15px;"/>
                <span class="cellspantitleclass">退出</span>
            </template>
        </van-cell>
        <br>
        <van-dialog :before-close="beforeClose"
                    show-cancel-button
                    v-model="showdialog">
            <van-field clearable
                       label="密码"
                       type="password"
                       placeholder="请输入密码"
                       v-model="userinfo.password"/>
            <van-field clearable
                       label="再次密码"
                       placeholder="请输入密码"
                       type="password"
                       v-model="userinfo.password2"/>
        </van-dialog>
        <!--头像选择弹窗组件-->
        <userselectavatar @selectavatar="selectavatar"
                          :diaObj="diaObj"></userselectavatar>
        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    // 引入阿里图标js
    import "@/assets/ali/iconfont/iconfont.js"

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"
    //导入
    import { mix } from "@/mixin/index.js"
    //导入组件
    import userselectavatar from '@/components/userselectavatar.vue'

    import * as usersapi from '@/common/bmobapi/users.js'

    import { mapMutations } from 'vuex'

    export default {
        name : "SetupData" ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,
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
                showdialog : false ,
                userinfo : {

                    password : '' ,
                    password2 : ''

                } ,
            }
        } ,
        //方法
        methods : {
            ...mapMutations( [

                'updateloginuseravatar'

            ] ) ,

            exitClick () {
                this.$dialog.confirm( {
                    message : '确定退出吗?'
                } ).then( () => {
                    // 点击确定按钮

                    this.exitsystem();

                } ).catch( () => {
                    // 点击取消按钮

                } );
            } ,
            beforeClose ( action , done ) {
                //点击确定按钮:action=confirm  点击取消按钮:action=cancel

                if ( action === "confirm" ) {

                    if ( !this.userinfo.password ) {
                        this.$toast( "请输入密码" )
                        done( false )

                        return;
                    }

                    if ( !this.userinfo.password2 ) {
                        this.$toast( "请再次输入密码" )
                        done( false )

                        return;
                    }

                    if ( this.userinfo.password != this.userinfo.password2 ) {

                        this.$toast( "两次密码不一致" )
                        done( false )

                        return;
                    }

                    // console.log( this.loginuserdata )

                    let user = this.loginuserdata;

                    ;( async () => {
                        // console.log( newuser.id )

                        let result = await usersapi.updateUserPwd( user.objectId , this.userinfo.password );

                        // console.log( result )

                        if ( result != null ) {
                            this.$toast.success( "修改成功,请重新登录!" );

                            done()

                            this.exitsystem();

                            return;
                        }
                        else {
                            this.$toast( "修改失败" )

                            done()

                            return;
                        }

                    } )();

                }
                else {
                    done()
                }
            } ,
            updatepwdClick () {
                this.showdialog = true;
            } ,
            SetupAvatarClick () {
                this.diaObj = {
                    showdialog : true ,
                    avatar : this.loginuseravatar
                }

                return;
            } ,
            selectavatar ( _avatar ) {
                this.diaObj = {

                    avatar : _avatar
                }

                if ( _avatar == this.loginuseravatar ) {
                    //头像没有变化

                    return;
                }

                let user = this.loginuserdata;

                ;( async () => {
                    // console.log( newuser.id )

                    let result = await usersapi.updateUserAvatar( user.objectId , _avatar );

                    // console.log( result )

                    if ( result != null ) {

                        //重新设置一下
                        // this.$store.commit( vuextypes.updateloginuseravatar , _avatar );
                        this.updateloginuseravatar( _avatar );

                        return;
                    }
                    else {
                        this.$toast( "修改失败" )

                        return;
                    }

                } )();

                return;
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
<style src="./SetupData.css"
       scoped>
</style>
