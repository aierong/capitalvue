/*
 作者: chenghao
 Date: 2019/8/25
 Time: 18:00
 功能: js脚本
 */

/**
 * 部门表
 * @type {string}
 */
const tableName = 'dept';

//这个表数据是手工先添加进去的

/**
 * 得部门列表
 * @returns {*|Promise|Promise<unknown>}
 */
function getdeptlist () {
    //部门代号排序
    const query = Bmob.Query( tableName );
    query.order( "deptno" );

    return query.find();

}


