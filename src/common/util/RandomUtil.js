/*
 作者: chenghao
 Date: 2019/8/26
 Time: 16:15
 功能: js脚本
 */

import Mock from "mockjs";
import dayjs from 'dayjs'

/**
 * 得随机中文名字
 */
export function getcname () {
    let cname = Mock.mock( "@cname()" );

    return cname;
}

/**
 * 得资产代号
 * @param 前缀
 */
export function getcapitalcode ( prefix ) {
    let num = getrandomint( 1000000 , 9999999 );

    return prefix + num.toString();
}

/**
 * 得随机整数
 * @param 位数
 * @returns {{valid, XHR, RE, _mocked, Random, toJSONSchema, Handler, setup, Util, heredoc}}
 */
export function getrandomint ( start , end ) {
    let num = Mock.mock( `@integer(${ start },${ end })` );

    return num;
}

/**
 * 得随机单号
 * @param prefix
 * @returns {string}
 */
export function getrandomno ( prefix ) {
    //前缀+年月日
    // let nos = prefix + dayjs().format( 'YYYYMMDD' );

    let num = getrandomint( 10000 , 99999 );
    let ymd = dayjs().format( 'YYYYMMDD' );

    //return nos + num.toString();
    return `${ prefix }${ ymd }${ num }`
}


