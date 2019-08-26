/*
 作者: chenghao
 功能: js脚本
 定义一些公用方法
 */

import Mock from "mockjs";

/**
 *
 * @param val
 * @returns {string}
 */
export function geticonallname ( val ) {
    if ( !val ) {
        return ''
    }

    return '#icon-' + val;
}

/**
 * 得随机中文名字
 */
export function getcname () {
    let cname = Mock.mock( "@cname()" );

    return cname;
}

