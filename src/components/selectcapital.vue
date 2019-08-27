<!--
作者:chenghao
Date: 2019/8/27
Time: 14:53
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        selectcapital
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    //引入 lodash
    import * as _ from "lodash"

    export default {
        name : "selectcapital" ,
        //数据模型
        data () {
            return {
                capitallist : null
            }
        } ,
        //方法
        methods : {
            //methodsname() {
            //代码搞这里
            //},

        } ,
        //计算属性
        computed : {
            /**
             * 得列表中最小的autokey
             * @returns {number|*}
             */
            minautokey () {
                if ( this.listcounts > 0 ) {
                    let obj = _.maxBy( this.capitallist , ( val ) => {
                        return val.autokey;
                    } )

                    return obj.autokey;
                }

                return 0;
            } ,
            /**
             * 列表中记录数量
             * @returns {number|*}
             */
            listcounts () {
                if ( this.capitallist != null && this.pyqlist.length > 0 ) {
                    return this.pyqlist.length;
                }

                return 0;
            } ,
        } ,
        //生命周期(mounted)
        mounted () {

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./selectcapital.css"
       scoped>
</style>
