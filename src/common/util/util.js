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

/**
 *
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


