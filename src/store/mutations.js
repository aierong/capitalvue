/*
 作者: chenghao
 功能:
 */

import * as types from './mutation-types'

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

    //清空
    [ types.clearloginuser ] ( state ) {
        state.loginuser = null;

        state.loginuserid = ''
    } ,

    //
    [ types.SetRefreshContactsList ] ( state , val ) {

        state.IsRefreshContactsList = val;

    } ,

    [ types.SET_LOCATION ] ( state , location ) {
        if ( location ) {
            state.location = location;
        }
        else {
            state.location = null;
        }
    } ,
    [ types.SET_ADDRESS ] ( state , address ) {
        if ( address ) {
            state.address = address;
        }
        else {
            state.address = '';
        }
    }
}
