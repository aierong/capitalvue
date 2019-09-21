/*
 作者: chenghao
 功能:
 */

import * as types from '@/store/user/mutation-types.js'

export default {

    //修改用户信息
    [ types.updateloginuser ] ( state , userobj ) {
        state.loginuser = userobj;

        let userid = userobj.mobile;
        state.loginuserid = userid;
    } ,
    //修改头像
    [ types.updateloginuseravatar ] ( state , avatar ) {
        state.loginuser.avatar = avatar;
    } ,
    //清空登录信息
    [ types.clearloginuser ] ( state ) {
        state.loginuser = null;

        state.loginuserid = ''
    } ,

}
