<!--
作者:chenghao
Date: 2019/8/24
Time: 14:53
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-dropdown-menu>
            <!--            value	当前选中项对应的 value -->
            <!--            options	选项数组	Array	 -->
            <van-dropdown-item v-model="CapitalTypeItemVal"
                               :options="optionitemCapitalType"/>
            <van-dropdown-item v-model="MyItemVal"
                               :options="optionitemMy"/>
            <van-dropdown-item v-model="CapitalStatusVal"
                               :options="optionitemCapitalStatus"/>
        </van-dropdown-menu>


        <mytabbar></mytabbar>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import dayjs from 'dayjs'

    //引入 lodash
    import * as _ from "lodash"

    import * as globalconstant from '@/common/constant.js'
    import * as util from '@/common/util/util.js'
    import * as dlapi from '@/common/bmobapi/dl.js'

    import detaildata from '@/components/detail/detaildata.vue'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"

    export default {
        name : "QueryData" ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,

        ] ,
        //注册组件
        components : {

            detaildata ,

        } ,
        //过滤器
        filters : {
            //
            formattitle : ( item ) => {

                return `${ item.capitalname }(${ item.capitalcode })`
            } ,
            formatlabel : ( item ) => {

                return `类型:${ item.typename } 保管人:${ item.saveman }`
            } ,
        } ,
        //数据模型
        data () {
            return {
                //资产列表
                capitallist : [] ,
                //资产类型
                CapitalTypeItemVal : '' ,
                optionitemCapitalType : [] ,

                //全部和我的
                MyItemVal : '' ,
                optionitemMy : [] ,

                CapitalStatusVal : '正常' ,
                optionitemCapitalStatus : [] ,

                searchval : '' ,

                loadobj : {
                    isover : false ,
                    isshowdivider : false ,
                    isloading : false
                } ,

                DlgObj : {

                    capitalcode : '' ,
                    nos : '' ,
                    notype : '' ,
                    tabindex : 0 ,
                    tempdata : ''
                } ,

                diaObj : {
                    isshow : false
                }
            }
        } ,
        //方法
        methods : {
            createoptionitem () {

                this.optionitemCapitalType = util.GetCapitalTypeList( true );

                this.optionitemCapitalStatus = util.GetCapitalStatus( true );

                this.optionitemMy = [
                    {
                        text : '全部' ,
                        value : ''
                    } ,
                    {
                        text : '我登记的' ,
                        value : this.loginusermobile
                    }
                ]
            } ,
            onSearch () {
                this.initlist();
            } ,

        } ,
        //计算属性
        computed : {
            //name() {
            //代码搞这里
            //return this.data;
            //}
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log('QueryData mounted')

            this.createoptionitem();

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./QueryData.css">
</style>
