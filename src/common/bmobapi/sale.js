/*
作者: chenghao
Date: 2019/8/26
Time: 21:52
功能: js脚本
*/


import dayjs from 'dayjs'

/**
 * 资产出售表
 * @type {string}
 */
const tableName = 'sale';


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
export function addsale ( sale ) {

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


