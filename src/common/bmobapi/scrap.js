/*
 作者: chenghao
 Date: 2019/8/27
 Time: 8:12
 功能: js脚本
 */

import dayjs from 'dayjs'

import { CapitalStatus } from '@/common/constant.js'

/**
 * 资产报废表
 */
import { ScrapTable as tableName } from '@/common/constant.js';

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
 * @param 报废对象
 * @param 资产id
 * @returns {Promise<unknown>}
 */
export function addscrap ( scrap , capitalobjectId ) {

    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( tableName );
        //这里 设置  列的数据

        query.set( "userid" , scrap.userid )
        query.set( "username" , scrap.username )
        //自动取最新时间，保存进去
        query.set( "inputdate" , scrap.inputdate )

        query.set( "modifyid" , "" )
        query.set( "modifyname" , "" )
        query.set( "modifydate" , "" )

        query.set( "confirmid" , "" )
        query.set( "confirmname" , "" )
        query.set( "confirmdate" , "" )

        query.set( "delmark" , "N" )
        query.set( "status" , "N" )

        query.set( "nos" , scrap.nos )

        query.set( "capitalcode" , scrap.capitalcode )
        query.set( "capitalname" , scrap.capitalname )

        query.set( "scrapname" , scrap.scrapname )
        query.set( "scrapdate" , scrap.scrapdate )

        query.set( "scrapmoney" , scrap.scrapmoney )

        query.set( "scrapreason" , scrap.scrapreason )

        query.set( "comment" , scrap.comment )

        query.save().then( res => {
            //console.log( res )

            if ( res != null ) {
                const querydl = Bmob.Query( tableNamedl );

                querydl.set( 'id' , capitalobjectId ) //需要修改的objectId
                querydl.set( 'capitalstatus' , CapitalStatus.scrap )

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


