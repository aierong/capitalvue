/*
 作者: chenghao
 Date: 2019/8/26
 Time: 17:04
 功能: js脚本
 */

import dayjs from 'dayjs'

/**
 * 资产转移表
 * @type {string}
 */
const tableName = 'move';

/**
 * 是存在单号
 * @param 单号
 * @returns {Promise<unknown>}
 */
export function isexistsnos ( nos ) {
    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );
        query.equalTo( "nos" , "==" , nos );

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
 *
 * @param move
 * @returns {Promise<unknown>}
 */
export function addmove ( move ) {

    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( tableName );
        //这里 设置  列的数据

        query.set( "userid" , move.userid )
        query.set( "username" , move.username )
        //自动取最新时间，保存进去
        query.set( "inputdate" , move.inputdate )

        query.set( "modifyid" , "" )
        query.set( "modifyname" , "" )
        query.set( "modifydate" , "" )

        query.set( "confirmid" , "" )
        query.set( "confirmname" , "" )
        query.set( "confirmdate" , "" )

        query.set( "delmark" , "N" )
        query.set( "status" , "N" )

        query.set( "nos" , move.nos )

        query.set( "capitalcode" , move.capitalcode )
        query.set( "capitalname" , move.capitalname )
        query.set( "olddeptno" , move.olddeptno )
        query.set( "olddeptname" , move.olddeptname )

        query.set( "newdeptno" , move.newdeptno )
        query.set( "newdeptname" , move.newdeptname )

        query.set( "oldsavesite" , move.oldsavesite )
        query.set( "newsavesite" , move.newsavesite )

        query.set( "oldsaveman" , move.oldsaveman )
        query.set( "newsaveman" , move.newsaveman )

        query.set( "comment" , move.comment )

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








// export function check ( model ) {
//      //这个方法，不要了，用其他替代
// }
