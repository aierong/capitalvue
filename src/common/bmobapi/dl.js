/*
 作者: chenghao
 Date: 2019/8/23
 Time: 17:22
 功能: js脚本
 */

import dayjs from 'dayjs'
import * as globalconstant from '@/common/constant.js'

/**
 * 资产表
 */
import { DlTable as tableName } from '@/common/constant.js';

import { GetNosList as MoveGetNosList } from '@/common/bmobapi/move.js'

/**
 * 是存在资产
 * @param capitalcode
 * @returns {Promise<unknown>}
 */
export function isexistscapital ( capitalcode ) {
    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );
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

        const query = Bmob.Query( tableName );
        //这里 设置  列的数据

        query.set( "userid" , dl.userid )
        query.set( "username" , dl.username )
        //自动取最新时间，保存进去
        query.set( "inputdate" , dl.inputdate )

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

/**
 * 得资产的数量
 * @param userid
 * @param capitalstatus
 * @returns {Promise<unknown>}
 * @constructor
 */
export function GetCapitalCounts ( userid , capitalstatus ) {
    return new Promise( ( resolve , reject ) => {

        const query = Bmob.Query( tableName );

        // console.log( 'capitalstatus' , capitalstatus )

        query.equalTo( "capitalstatus" , "==" , capitalstatus );

        if ( userid ) {
            query.equalTo( "userid" , "==" , userid );
        }

        query.count().then( res => {
            //返回的是 数字
            // console.log( 'GetCapitalCounts' , res )

            resolve( res );
        } );

    } );
}

/**
 * 由资产代码得资产数据
 * @param capitalcode
 * @returns {*|Promise|Promise<unknown>}
 * @constructor
 */
export function GetCapitalByCapitalCode ( capitalcode ) {

    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );
        query.equalTo( "capitalcode" , "==" , capitalcode );

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

export function getnormalcapitallistbyminid ( minid , loadcounts , typename , userid , searchkey ) {

    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );

        query.equalTo( "capitalstatus" , "==" , globalconstant.CapitalStatus.normal );

        if ( typename ) {
            query.equalTo( "typename" , "==" , typename );
        }

        if ( minid > 0 ) {
            query.equalTo( "autokey" , "<" , minid );
        }

        //该用户填写的
        if ( userid ) {
            query.equalTo( "userid" , "==" , userid );
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

export function getaddquerylistbyminid ( minid , loadcounts , typename , userid , CapitalStatus , searchkey ) {

    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );

        if ( CapitalStatus ) {
            query.equalTo( "capitalstatus" , "==" , CapitalStatus );
        }

        if ( typename ) {
            query.equalTo( "typename" , "==" , typename );
        }

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

/**
 * 删除检查
 * @param capitalcode
 * @param userid
 * @returns {Promise<unknown>}
 * @constructor
 */
export function DeleteCheck ( capitalcode , userid ) {

    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );
        query.equalTo( "capitalcode" , "==" , capitalcode );

        Promise.all( [
            query.find() ,

            MoveGetNosList( capitalcode ) ,
        ] ).then( ( ress ) => {

            if ( ress != null && ress.length >= 2 ) {
                let res = ress[ 0 ];

                if ( res != null && res.length > 0 ) {
                    let _data = res[ 0 ];

                    let _userid = _data.userid;

                    if ( _userid && userid && _userid == userid ) {
                        let _capitalstatus = _data.capitalstatus;

                        if ( _capitalstatus && _capitalstatus == globalconstant.CapitalStatus.normal ) {
                            let movedata = ress[ 1 ];

                            if ( movedata != null && movedata.length > 0 ) {
                                resolve( {
                                    isok : false ,
                                    msg : '资产已转移,不可删除'
                                } );
                            }
                            else {
                                resolve( {
                                    isok : true ,
                                    msg : ''
                                } );
                            }
                        }
                        else {
                            resolve( {
                                isok : false ,
                                msg : '只可删除正常状态资产'
                            } );
                        }
                    }
                    else {
                        resolve( {
                            isok : false ,
                            msg : '只可删除自己登记资产'
                        } );
                    }

                    // resolve( res[ 0 ] );
                }
                else {
                    resolve( {
                        isok : false ,
                        msg : '资产编号错误'
                    } );
                }

            }
            else {
                resolve( {
                    isok : false ,
                    msg : '运算错误'
                } );
            }
        } )

    } );

}

/**
 * 删除方法
 * @param capitalcode
 * @returns {Promise<unknown>}
 * @constructor
 */
export function DeleteCapital ( capitalobjectId ) {

    return new Promise( ( resolve , reject ) => {
        const query = Bmob.Query( tableName );

        //按id删除
        query.destroy( capitalobjectId ).then( res => {
            // 成功删除  返回 {msg: "ok"}
            //id 错误或者不存在  返回 {code: 101, error: "object not found for a08b661111."}
            resolve( res )
        } ).catch( err => {
            resolve( null );
        } )

    } );

}


