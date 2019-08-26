/*
 作者: chenghao
 Date: 2019/8/26
 Time: 17:04
 功能: js脚本
 */

import dayjs from 'dayjs'


/**
 * 资产表
 * @type {string}
 */
const tableName = 'move';


export function isexistsnos ( nos ) {
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


