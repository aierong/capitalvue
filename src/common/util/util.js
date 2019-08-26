/*
 作者: chenghao
 功能: js脚本
 定义一些公用方法
 */

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

