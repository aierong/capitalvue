/*
 作者: chenghao
 功能: js脚本
 */

import dayjs from 'dayjs'

/**
 * 用户表
 */
import { UserTable as tableName_users } from '@/common/constant.js';

/**
 * 是存在手机号码
 * @param mobile
 * @returns {Promise<any>}
 */
function isexistsmobile ( mobile ) {
    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName_users );
        query.equalTo( "mobile" , "==" , mobile );

        query.find().then( res => {
            //返回的是数组,没有找到就是空数组
            //console.log( res )

            if ( res != null && res.length > 0 ) {
                resolve( {
                    //是存在
                    isexists : true ,
                    data : res[ 0 ]
                } );
            }
            else {
                resolve( {
                    isexists : false ,
                    data : null
                } );
            }
        } );
    } );
}

/**
 * 添加用户
 * @param registerUser
 * @returns {Promise<any>}
 */
function adduser ( registerUser ) {

    // console.log(newuser)

    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( tableName_users );
        //这里 设置  列的数据
        query.set( "mobile" , registerUser.mobile )
        query.set( "avatar" , registerUser.avatar )
        query.set( "password" , registerUser.password )
        query.set( "name" , registerUser.name )
        query.set( "email" , registerUser.email )
        query.set( "date" , dayjs().format( 'YYYY-MM-DD HH:mm:ss' ) )

        // api.adduser( newuser ).then( ( res ) => {
        //     resolve( res.data );
        // } );
        query.save().then( res => {
            //console.log( res )

            resolve( res );
            //返回创建时间和id
            // {
            //     createdAt: "YYYY-mm-dd HH:ii:ss",
            //         objectId: "objectId"
            // }
        } ).catch( err => {
            //console.log( err )

            resolve( null );
        } )
    } );
}

/**
 * 登录
 * @param mobile
 * @param pwd
 * @returns {Promise<any>}
 */
function login ( mobile , pwd ) {
    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( tableName_users );
        query.equalTo( "password" , "==" , pwd );
        query.equalTo( "mobile" , "==" , mobile );

        query.find().then( res => {
            //返回的是数组,没有找到就是空数组
            //console.log( res )

            if ( res != null && res.length > 0 ) {
                resolve( {
                    //是存在
                    isok : true ,
                    data : res[ 0 ]
                } );
            }
            else {
                resolve( {
                    isok : false ,
                    data : null
                } );
            }
        } );
    } );
}

/**
 * 得用户列表
 * @returns {*|Promise|Promise<any>}
 */
function getuserlist () {
    //手机号码排序
    const query = Bmob.Query( tableName_users );
    query.order( "mobile" );

    // query.find().then( res => {
    //     //返回的是数组,没有找到就是空数组
    //     console.log( res )
    //
    //     resolve( res );
    // } );

    return query.find();

}

/**
 * 修改头像
 * @param objectId
 * @param avatar
 * @returns {Promise<any>}
 */
function updateUserAvatar ( objectId , avatar ) {

    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( tableName_users );

        query.set( 'id' , objectId ) //需要修改的objectId
        query.set( 'avatar' , avatar )

        query.save().then( res => {
            // 修改成功 返回 {updatedAt: "2019-04-17 17:39:44"}
            // 如果id错误,返回 {code: 101, error: "object not found for a08b661111."}
            //console.log( res )
            if ( res != null && res.updatedAt ) {
                resolve( res );
            }
            else {
                resolve( null );
            }
        } )
    } );
}

/**
 * 修改用户密码
 * @param objectId
 * @param pwd
 * @returns {Promise<any>}
 */
function updateUserPwd ( objectId , pwd ) {

    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( tableName_users );

        query.set( 'id' , objectId ) //需要修改的objectId
        query.set( 'password' , pwd )

        query.save().then( res => {
            // 修改成功 返回 {updatedAt: "2019-04-17 17:39:44"}
            // 如果id错误,返回 {code: 101, error: "object not found for a08b661111."}
            //console.log( res )
            if ( res != null && res.updatedAt ) {
                resolve( res );
            }
            else {
                resolve( null );
            }
        } )
    } );
}

/**
 * 得用户
 * @param mobile
 * @returns {*|Promise|Promise<any>}
 */
function getuserbymobile ( mobile ) {
    //手机号
    const query = Bmob.Query( tableName_users );
    query.equalTo( "mobile" , "==" , mobile );

    return query.find();

}

/**
 * 导出一把
 */
export {

    isexistsmobile ,
    adduser ,
    login ,
    getuserlist ,
    updateUserAvatar ,
    updateUserPwd ,
    getuserbymobile

}

