/*
 作者: chenghao
 功能: 定义一些常量
 */

//token名称
export const usertokenname = 'MyCapitalToken'

//bmob  单次API返回数据大小进行限制  204800  bytes
export const bmobapidatamax = 204800;

export const MyVuePersistedName = {
    LoginUserId : 'MyCapitalLoginUserId'
}

/**
 * 登录帐号Cookie保存天数
 * @type {number}
 */
export const CookieExpires = 7;

/**
 * 头像列表
 * @type {*[]}
 */
export const avatariconlist = [

    'touxiang6' ,
    'touxiang5' ,
    'touxiang4' ,
    'touxiang3' ,
    'touxiang2' ,
    'touxiang1' ,

];

/**
 * 资产类型
 * @type {Array}
 */
export const CapitalType = [
    "房屋建筑" ,
    "机器设备" ,
    "运输设备" ,
    "电子设备" ,
    "其它"

];

/**
 * 资产状态
 * @type {{normal: string, sale: string, scrap: string}}
 */
export const CapitalStatus = {
    sale : '出售' ,
    scrap : '报废' ,
    normal : '正常'
}

/**
 * 数据表
 * @type {string}
 */
export const DlTable = "dl";

/**
 * 报废表
 * @type {string}
 */
export const ScrapTable = "scrap";

/**
 * 资产转移表
 * @type {string}
 */
export const MoveTable = "move";

/**
 * 部门表
 * @type {string}
 */
export const DeptTable = "dept";


