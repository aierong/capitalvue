<!--
作者:chenghao
Date: 2019/8/26
Time: 22:00
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-nav-bar title="登记出售资产"
                     left-text="返回"
                     left-arrow
                     @click-left="onClickLeft"/>
        <br>

        <van-cell-group>
            <van-field v-model="salemodel.nos"
                       required
                       readonly
                       label="出售单号"/>
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

    import * as  dlapi from '@/common/bmobapi/dl.js'
    import * as sale from '@/common/bmobapi/sale.js'

    export default {
        name : "salecapital" ,
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
                prefix : 'CS' ,
                //用户选择资产的objectId
                UserSelectCapitalObjectId : '' ,
                /**
                 * 模型
                 */
                salemodel : {
                    nos : '' ,
                    capitalcode : '' ,
                    capitalname : '' ,

                    salemoney : 0 ,
                    salename : '' ,
                    //默认今天
                    saledate : dayjs().format( 'YYYY-MM-DD' ) ,
                    saleto : '' ,

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
            setupscrapmodel () {
                //给一些变量赋初始化值
                //登录用户
                this.salemodel.userid = this.loginusermobile;
                this.salemodel.username = this.loginusername;

                // this.salemodel.scrapname = RandomUtil.getcname();

                this.salemodel.nos = RandomUtil.getrandomno( this.prefix );

                this.salemodel.salename = RandomUtil.getcname();
            } ,
            opencapitaldlg () {
                this.CapitalDlgObj.isshow = true;
            } ,
            selectcapital ( capitalcode , capitalname , CapitalObjectId ) {
                this.salemodel.capitalcode = capitalcode;
                this.salemodel.capitalname = capitalname;
                //记录id，后面保存要用
                this.UserSelectCapitalObjectId = CapitalObjectId;

                this.CapitalDlgObj.isshow = false;

            } ,
            opendateldlg () {
                this.DateDlgObj.isshow = true;
                this.DateDlgObj.date = this.scrapmodel.scrapdate;
            } ,
            dateresult ( date ) {
                if ( date ) {

                    this.salemodel.saledate = date;

                }

                this.DateDlgObj.isshow = false;
                //这里置为空，可以激发
                this.DateDlgObj.date = '';

            } ,
        } ,
        //计算属性
        computed : {
            capitalallname () {
                if ( !this.salemodel.capitalcode || !this.salemodel.capitalname ) {
                    return '';
                }

                return `(${ this.salemodel.capitalcode })${ this.salemodel.capitalname }`
            } ,
            loginuserallname () {
                return `(${ this.loginusermobile })${ this.loginusername }`
            } ,
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log( 'salecapital mounted' )

            this.setupscrapmodel();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./salecapital.css">
</style>
