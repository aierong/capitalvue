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


