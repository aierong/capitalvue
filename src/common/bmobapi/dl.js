/*
 作者: chenghao
 Date: 2019/8/23
 Time: 17:22
 功能: js脚本
 */

import dayjs from 'dayjs'

/**
 * 资产表
 * @type {string}
 */
const tableName_users = 'dl';

/**
 * 是存在资产
 * @param capitalcode
 * @returns {Promise<unknown>}
 */
export function isexistscapital ( capitalcode ) {
    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName_users );
        query.equalTo( "capitalcode" , "==" , capitalcode );

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
 * 添加资产
 * @param dl
 * @returns {Promise<unknown>}
 */
export function adddl ( dl ) {

    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( DlTable );
        //这里 设置  列的数据

        query.set( "userid" , dl.userid )
        query.set( "username" , dl.username )
        query.set( "inputdate" , dayjs().format( 'YYYY-MM-DD HH:mm:ss' ) )

        query.set( "modifyid" , "" )
        query.set( "modifyname" , "" )
        query.set( "modifydate" , "" )

        query.set( "confirmid" , "" )
        query.set( "confirmname" , "" )
        query.set( "confirmdate" , "" )

        query.set( "delmark" , "N" )
        query.set( "status" , "N" )

        query.set( "capitalstatus" , "正常" )

        query.set( "capitalcode" , dl.capitalcode )
        query.set( "capitalname" , dl.capitalname )
        query.set( "qty" , 1 )
        query.set( "money" , dl.money )

        query.set( "typename" , dl.typename )
        query.set( "unit" , dl.unit )

        query.set( "deptno" , dl.deptno )
        query.set( "deptname" , dl.deptname )

        query.set( "savesite" , dl.savesite )
        query.set( "saveman" , dl.saveman )
        query.set( "comment" , dl.comment )

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