<!--
作者:chenghao
Date: 2019/8/25
Time: 17:55
功能:
-->

<!-- html代码片段 -->

<!-- 选择部门 -->
<template>

    <div>

        <van-dialog :before-close="beforeClose"
                    v-model="diaObj.isshowdialog">
            <van-radio-group v-model="diaObj.deptno">
                <van-cell-group>
                    <van-cell :key="_index"
                              v-for="(item,_index) in deptdatalist">
                        <span slot="title">
                            <span style="color:green;">{{ `(${ item.deptno })` }}</span>
                            <span>{{ `${ item.deptname }` }}</span>
                        </span>
                        <van-radio slot="right-icon"
                                   :name="item.deptno"/>
                    </van-cell>

                </van-cell-group>
            </van-radio-group>
        </van-dialog>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import {
        mapState ,
        mapMutations
    } from 'vuex'

    import * as deptapi from '@/common/bmobapi/dept.js'

    export default {
        name : "UserSelectDept" ,
        props : {
            diaObj : Object
        } ,
        //数据模型
        data () {
            return {
                //部门列表
                deptdatalist : []
            }
        } ,
        //方法
        methods : {
            ...mapMutations( [ 'SetDeptData' ] ) ,
            async getdeptdatalist () {
                if ( this.deptdata != null ) {
                    this.deptdatalist = this.deptdata;

                    return;
                }
                else {
                    var result = await deptapi.getdeptlist();

                    // console.log( 'deptlist' , result );

                    this.SetDeptData( result );

                    this.deptdatalist = result;

                    return;
                }
            } ,
            //关闭窗体事件
            beforeClose ( action , done ) {
                if ( action === "confirm" ) {

                    // 选择确定事件 ,把选择好的部门代号和部门名称传递回去
                    this.$emit( "deptselectresult" , this.diaObj.deptno , this.getdeptname );

                    done()
                }
                else {
                    //没有取消按钮,下面代码不会执行

                    //没有选择就是关闭
                    //this.$emit( "selectresult" , false , '' );

                    done()
                }
            } ,

        } ,
        //计算属性
        computed : {
            ...mapState( {
                deptdata : 'deptdata'
            } ) ,
            /**
             * 得部门名称
             * @returns {string}
             */
            getdeptname () {
                if ( this.deptdatalist != null && this.deptdatalist.length > 0 ) {
                    if ( this.diaObj.deptno ) {
                        let result = this.deptdatalist.find( ( element , index , array ) => {
                            return element.deptno == this.diaObj.deptno;
                        } );

                        if ( result != null && result != undefined ) {
                            return result.deptname;
                        }
                    }
                }

                return "";
            } ,
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log( 'UserSelectDept mounted' )

            this.getdeptdatalist();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./UserSelectDept.css"
       scoped>
</style>
