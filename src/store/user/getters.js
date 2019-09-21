/*
 作者: chenghao
 功能:
 */

export default {

    //得头像
    useravatar : ( state ) => {
        if ( state.loginuser != null ) {
            return state.loginuser.avatar;
        }

        return "";
    } ,
    //得名称
    username : ( state ) => {
        if ( state.loginuser != null ) {
            return state.loginuser.name;
        }

        return "";
    } ,
    //得手机号码
    usermobile : ( state ) => {
        if ( state.loginuser != null ) {
            return state.loginuser.mobile;
        }

        return "";
    } ,

}
