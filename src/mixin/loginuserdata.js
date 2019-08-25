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

        ...mapState( {

            loginuserdata : 'loginuser' ,

        } ) ,

        ...mapGetters( {

            loginusername : 'username' ,

            loginusermobile : 'usermobile' ,

            loginuseravatar : 'useravatar'
        } ) ,
    } ,

}


