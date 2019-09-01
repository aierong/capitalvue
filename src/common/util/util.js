/*
 作者: chenghao
 功能: js脚本
 定义一些公用方法
 */

import * as globalconstant from '@/common/constant.js'

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
 * 长时间等待
 * @param 等待时间（毫秒）
 * @returns {Promise<any>}
 */
export function runlongtims ( times ) {

    return new Promise( ( resolve , reject ) => {

        setTimeout( () => {
            resolve( "" );
        } , times );

    } )

}

/**
 * 得资产编号的前缀
 * @param typename
 * @returns {string}
 */
export function getprefix ( typename ) {

    if ( typename ) {
        if ( typename == "房屋建筑" ) {
            return "FW";
        }

        if ( typename == "机器设备" ) {
            return "JQ";
        }

        if ( typename == "运输设备" ) {
            return "YS";
        }

        if ( typename == "电子设备" ) {
            return "DZ";
        }

        if ( typename == "其它" ) {
            return "QT";
        }

        return "QT";
    }

    return "";
}

/**
 * 是出售
 * @param val
 * @returns {boolean}
 * @constructor
 */
export function IsSale ( _CapitalStatus ) {
    if ( _CapitalStatus != null && _CapitalStatus == globalconstant.CapitalStatus.sale ) {
        return true;
    }

    return false;
}

/**
 * 是报废
 * @param val
 * @returns {boolean}
 * @constructor
 */
export function IsScrap ( _CapitalStatus ) {
    if ( _CapitalStatus != null && _CapitalStatus == globalconstant.CapitalStatus.scrap ) {
        return true;
    }

    return false;
}

/**
 * 是正常
 * @param val
 * @returns {boolean}
 * @constructor
 */
export function IsNormal ( _CapitalStatus ) {
    if ( _CapitalStatus != null && _CapitalStatus == globalconstant.CapitalStatus.normal ) {
        return true;
    }

    return false;
}

/**
 * 资产类型列表
 * @param isincludeall
 * @returns {Array}
 * @constructor
 */
export function GetCapitalTypeList ( isincludeall ) {
    let arr = [];

    if ( isincludeall ) {
        arr.push( {
            text : '全部' ,
            value : ''
        } )
    }

    globalconstant.CapitalType.forEach( ( val , index , array ) => {
        arr.push( {
            text : val ,
            value : val
        } )
    } )

    return arr;
}


