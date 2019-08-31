/*
 作者: chenghao
 功能: js脚本
 */
import {
    mapState ,
    mapGetters ,
    mapMutations
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
    //方法
    methods : {
        ...mapMutations( [

            'clearloginuser'

        ] ) ,
        /**
         * 退出系统
         */
        exitsystem () {

            //  清除一下
            this.clearloginuser();

            //页面转向 登录
            this.$router.push( '/login' )

            return;
        } ,
    } ,
}


