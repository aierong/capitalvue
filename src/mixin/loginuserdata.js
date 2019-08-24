/*
 作者: chenghao
 功能: js脚本
 */
import {
    mapState ,
    mapGetters
} from 'vuex'

export const loginuserdatamix = {
    //特别提示：下面这几个计算属性，要登录后调用
    computed : {
        // loginuserdata () {
        //     return this.$store.state.loginuser;
        // } ,
        ...mapState( {

            loginuserdata : 'loginuser' ,

        } ) ,
        // loginusername () {
        //     return this.$store.getters.username;
        // } ,
        // loginusermobile () {
        //
        //     return this.$store.getters.usermobile;
        // } ,
        // loginuseravatar () {
        //
        //     return this.$store.getters.useravatar;
        // } ,
        ...mapGetters( {

            loginusername : 'username' ,

            loginusermobile : 'usermobile' ,

            loginuseravatar : 'useravatar'
        } ) ,
    } ,

}


