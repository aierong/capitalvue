/*
 作者: chenghao
 Date: 2019/8/26
 Time: 16:15
 功能: js脚本
 */

import Mock from "mockjs";

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
    return prefix + getrandomint( 5 );
}

/**
 * 得随机整数
 * @param 位数
 * @returns {{valid, XHR, RE, _mocked, Random, toJSONSchema, Handler, setup, Util, heredoc}}
 */
export function getrandomint ( digit ) {
    let num = Mock.mock( `@range(${ digit },${ digit })` );

    return num;
}
