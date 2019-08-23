/*
 作者: chenghao
 功能:
 */

export default {

    //getters实际就是一个计算属性

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
    location : ( state ) => {

        return state.location;

    } ,
    address : ( state ) => {

        return state.address;

    } ,

}
