/*
 作者: chenghao
 Date: 2019/8/27
 Time: 8:12
 功能: js脚本
 */

import dayjs from 'dayjs'

/**
 * 资产报废表
 */
import { ScrapTable as tableName } from '@/common/constant.js';

import { DlTable as tableNamedl } from '@/common/constant.js';

/**
 * 资产表
 * @type {string}
 */
const tableName_dl = 'dl';

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

        query.set( "scrapname" , scrap.newdeptno )
        query.set( "scrapdate" , scrap.newdeptname )

        query.set( "scrapmoney" , scrap.oldsavesite )

        query.set( "scrapreason" , scrap.oldsaveman )

        query.set( "comment" , scrap.comment )

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






