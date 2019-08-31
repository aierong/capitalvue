/*
 作者: chenghao
 Date: 2019/8/25
 Time: 18:00
 功能: js脚本
 */
//这个表数据是手工先添加进去的

/**
 * 部门表
 */
import { DeptTable as tableName } from '@/common/constant.js';

/**
 * 得部门列表
 * @returns {*|Promise|Promise<unknown>}
 */
export function getdeptlist () {
    //部门代号排序
    const query = Bmob.Query( tableName );
    query.order( "deptno" );

    return query.find();

}


