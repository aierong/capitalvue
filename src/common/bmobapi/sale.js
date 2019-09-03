/*
 作者: chenghao
 Date: 2019/8/26
 Time: 21:52
 功能: js脚本
 */

import dayjs from 'dayjs'
import { CapitalStatus } from '@/common/constant.js'

/**
 * 资产出售表
 */
import { SaleTable as tableName } from '@/common/constant.js';

/**
 * 资产表
 */
import { DlTable as tableNamedl } from '@/common/constant.js';

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
export function addsale ( sale , capitalobjectId ) {

    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( tableName );
        //这里 设置  列的数据

        query.set( "userid" , sale.userid )
        query.set( "username" , sale.username )
        //自动取最新时间，保存进去
        query.set( "inputdate" , sale.inputdate )

        query.set( "modifyid" , "" )
        query.set( "modifyname" , "" )
        query.set( "modifydate" , "" )

        query.set( "confirmid" , "" )
        query.set( "confirmname" , "" )
        query.set( "confirmdate" , "" )

        query.set( "delmark" , "N" )
        query.set( "status" , "N" )

        query.set( "nos" , sale.nos )

        query.set( "capitalcode" , sale.capitalcode )
        query.set( "capitalname" , sale.capitalname )

        query.set( "salename" , sale.salename )
        query.set( "saledate" , sale.saledate )

        query.set( "salemoney" , sale.salemoney )

        query.set( "saleto" , sale.saleto )

        query.set( "comment" , sale.comment )

        query.save().then( res => {
            //console.log( res )
            if ( res != null ) {
                const querydl = Bmob.Query( tableNamedl );

                querydl.set( 'id' , capitalobjectId ) //需要修改的objectId
                querydl.set( 'capitalstatus' , CapitalStatus.sale )

                querydl.save().then( re => {
                    // 修改成功 返回 {updatedAt: "2019-04-17 17:39:44"}
                    // 如果id错误,返回 {code: 101, error: "object not found for a08b661111."}
                    // console.log( re )

                    resolve( res );
                } ).catch( err => {
                    // console.log( err )

                    resolve( null );
                } )
            }
            else {
                resolve( null );
            }

        } ).catch( err => {
            //console.log( err )

            resolve( null );
        } )
    } );
}


/**
 * 得单据信息
 * @param nos
 * @returns {Promise<unknown>}
 * @constructor
 */
export function GetNosData ( nos ) {

    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );
        query.equalTo( "nos" , "==" , nos );

        query.find().then( ( res ) => {
            if ( res != null && res.length > 0 ) {
                resolve( res[ 0 ] );
            }
            else {
                resolve( null );
            }
        } );
    } );

}



/**
 * 得单据列表信息
 * @param capitalcode
 * @returns {Promise<unknown>}
 * @constructor
 */
export function GetNosList ( capitalcode ) {

    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );
        query.equalTo( "capitalcode" , "==" , capitalcode );
        query.order( "autokey" ); //排序一下

        query.find().then( ( res ) => {
            if ( res != null ) {
                //返回是数组  应该是1个
                resolve( res );
            }
            else {
                resolve( null );
            }
        } );
    } );

}



export function getaddmovequerylistbyminid ( minid , loadcounts , userid , searchkey ) {

    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );

        //该用户填写的
        if ( userid ) {
            query.equalTo( "userid" , "==" , userid );
        }

        if ( minid > 0 ) {
            query.equalTo( "autokey" , "<" , minid );
        }

        if ( loadcounts > 0 ) {
            query.limit( loadcounts );
        }
        query.order( "-autokey" );

        query.find().then( ( res ) => {
            // console.log( 'res' , res )

            if ( searchkey ) {
                let result = res.filter( ( value , index , array ) => {
                    return ( value.capitalcode != null
                        && value.capitalcode.toUpperCase().includes( searchkey.toUpperCase() ) )
                        || ( value.capitalname != null
                            && value.capitalname.toUpperCase().includes( searchkey.toUpperCase() ) );

                } )

                resolve( result );
            }
            else {
                resolve( res );
            }
        } )
    } );

}


