<!--
作者:chenghao
Date: 2019/8/26
Time: 16:56
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-nav-bar title="登记转移资产"
                     left-text="返回"
                     left-arrow
                     @click-left="onClickLeft"/>
        <br>
        <van-cell-group>
            <van-field v-model="movemodel.nos"
                       required
                       readonly
                       label="转移单号"/>
            <van-field v-model="capitalallname"
                       required
                       readonly
                       label="资产"
                       placeholder="请选择资产">
                <van-button slot="button"
                            @click="opencapitaldlg"
                            size="small"
                            type="primary">选择
                </van-button>
            </van-field>
        </van-cell-group>


        <!--        选择资产的弹窗
-->
        <selectcapital @selectcapital="selectcapital"
                       :diaObj="CapitalDlgObj"></selectcapital>
        <!--        选择日期的弹窗
-->
        <selectdate @dateresult="dateresult"
                    :diaObj="DateDlgObj"></selectdate>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import dayjs from 'dayjs'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"
    import * as RandomUtil from '@/common/util/RandomUtil.js'

    import selectcapital from '@/components/selectcapital.vue'
    import selectdate from '@/components/selectdate.vue'

    import * as util from '@/common/util/util.js'

    import * as dlapi from '@/common/bmobapi/dl.js'
    import * as moveapi from '@/common/bmobapi/move.js'

    export default {
        name : "movecapital" ,
        //注册组件
        components : {

            selectcapital ,
            selectdate

        } ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,

        ] ,
        //数据模型
        data () {
            return {
                /**
                 * 单据的前缀
                 */
                prefix : 'ZZ' ,
                //用户选择资产的objectId
                UserSelectCapitalObjectId : '' ,
                /**
                 * 模型
                 */
                movemodel : {
                    nos : '' ,
                    capitalcode : '' ,
                    capitalname : '' ,

                    olddeptno : '' ,
                    olddeptname : '' ,

                    newdeptno : '' ,
                    newdeptname : '' ,

                    oldsavesite : '' ,
                    newsavesite : '' ,

                    oldsaveman : '' ,
                    newsaveman : '' ,

                    //默认今天
                    movedate : dayjs().format( 'YYYY-MM-DD' ) ,

                    comment : '' ,

                    userid : '' ,
                    username : '' ,
                    inputdate : '' ,

                } ,
                CapitalDlgObj : {
                    //是显示选择资产弹窗
                    isshow : false ,

                } ,
                DateDlgObj : {
                    //是显示选择日期弹窗
                    isshow : false ,
                    //先默认一个 ，后面会重新赋值
                    date : dayjs().format( 'YYYY-MM-DD' )
                } ,
            }
        } ,
        //方法
        methods : {
            onClickLeft () {
                // 页面跳转
                this.$router.push( "/cz" )

                return;
            } ,
            opencapitaldlg () {
                this.CapitalDlgObj.isshow = true;
            } ,
            selectcapital ( item ) {
                this.movemodel.capitalcode = item.capitalcode;
                this.movemodel.capitalname = item.capitalname;
                //记录id，后面保存要用
                this.UserSelectCapitalObjectId = item.objectId;

                this.CapitalDlgObj.isshow = false;

            } ,
            opendateldlg () {
                this.DateDlgObj.isshow = true;
                this.DateDlgObj.date = this.movemodel.movedate;
            } ,
            dateresult ( date ) {
                if ( date ) {

                    this.movemodel.movedate = date;

                }

                this.DateDlgObj.isshow = false;
                //这里置为空，可以激发
                this.DateDlgObj.date = '';

            } ,
        } ,
        //计算属性
        computed : {
            capitalallname () {
                if ( !this.movemodel.capitalcode || !this.movemodel.capitalname ) {
                    return '';
                }

                return `(${ this.movemodel.capitalcode })${ this.movemodel.capitalname }`
            } ,
            loginuserallname () {
                return `(${ this.loginusermobile })${ this.loginusername }`
            } ,
        } ,
        //生命周期(mounted)
        mounted () {

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./movecapital.css"
       scoped>
</style>
