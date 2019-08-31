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
            <van-field v-model="olddeptinfo"
                       required
                       readonly
                       label="原部门"/>
            <van-field v-model="newdeptinfo"
                       required
                       readonly
                       label="现部门"
                       placeholder="请选择部门">
                <van-button slot="button"
                            @click="opendeptdlg"
                            size="small"
                            type="primary">选择
                </van-button>
            </van-field>
            <van-field v-model="movemodel.oldsavesite"
                       required
                       readonly
                       label="原位置"/>
            <van-field v-model="movemodel.newsavesite"
                       required
                       clearable
                       label="现位置"
                       placeholder="请输入现位置"/>
            <van-field v-model="movemodel.oldsaveman"
                       required
                       readonly
                       label="原保管人"/>
            <van-field v-model="movemodel.newsaveman"
                       required
                       clearable
                       label="现保管人"
                       placeholder="请输入现保管人"/>
            <van-field v-model="movemodel.movedate"
                       required
                       readonly
                       label="转移日期"
                       placeholder="请选择转移日期">
                <van-button slot="button"
                            @click="opendateldlg"
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

        <!--        选择部门的弹窗
        -->
        <UserSelectDept :diaObj="DeptDlgObj"
                        @deptselectresult="deptselectresult"></UserSelectDept>

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
    import UserSelectDept from '@/components/UserSelectDept.vue'

    import * as util from '@/common/util/util.js'

    import * as dlapi from '@/common/bmobapi/dl.js'
    import * as moveapi from '@/common/bmobapi/move.js'

    export default {
        name : "movecapital" ,
        //注册组件
        components : {

            selectcapital ,
            selectdate ,
            UserSelectDept

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
                DeptDlgObj : {
                    //是显示选择类型弹窗
                    isshowdialog : false ,
                    deptno : ''
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

                //把部门信息写上
                this.movemodel.olddeptno = item.deptno;
                this.movemodel.olddeptname = item.deptname;
                this.movemodel.newdeptno = item.deptno;
                this.movemodel.newdeptname = item.deptname;

                //把位置信息写上
                this.movemodel.oldsavesite = item.savesite;
                this.movemodel.newsavesite = item.savesite;

                //把保管人信息写上
                this.movemodel.oldsaveman = item.saveman;
                this.movemodel.newsaveman = item.saveman;

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
            /**
             * 打开部门选择弹窗
             */
            opendeptdlg () {
                this.DeptDlgObj = {
                    isshowdialog : true ,
                    deptno : this.movemodel.newdeptno
                }
            } ,
            deptselectresult ( deptno , deptname ) {
                // console.log( val )

                this.DeptDlgObj.deptno = deptno;

                this.movemodel.newdeptno = deptno;
                this.movemodel.newdeptname = deptname;

                //不用自己关闭dlg
                // this.closetypedlg();

                return;
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
            /**
             * 原部门信息
             * @returns {string}
             */
            olddeptinfo () {
                if ( !this.movemodel.olddeptno || !this.movemodel.olddeptname ) {
                    return '';
                }
                return `(${ this.movemodel.olddeptno })${ this.movemodel.olddeptname }`
            } ,
            /**
             * 新部门信息
             * @returns {string}
             */
            newdeptinfo () {
                if ( !this.movemodel.newdeptno || !this.movemodel.newdeptname ) {
                    return '';
                }
                return `(${ this.movemodel.newdeptno })${ this.movemodel.newdeptname }`
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
