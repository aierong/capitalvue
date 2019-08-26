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
