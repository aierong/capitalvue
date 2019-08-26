<!--
作者:chenghao
Date: 2019/8/25
Time: 11:17
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-nav-bar title="添加新资产"
                     left-text="返回"
                     left-arrow
                     @click-left="onClickLeft"/>
        <br>
        <van-cell-group>
            <van-field v-model="capitalmodel.capitalcode"
                       required
                       clearable
                       label="资产代号"
                       placeholder="请输入资产代号"/>
            <van-field v-model="capitalmodel.capitalname"
                       required
                       clearable
                       label="资产名称"
                       placeholder="请输入资产名称"/>
            <van-field v-model="capitalmodel.money"
                       required
                       clearable
                       type="number"
                       label="资产金额"
                       placeholder="请输入资产金额"/>
            <van-field v-model="capitalmodel.typename"
                       require
                       label="资产类型"
                       placeholder="请选择资产类型"
                       readonly>
                <van-button slot="button"
                            @click="opentypedlg"
                            size="small"
                            type="primary">选择
                </van-button>
            </van-field>
            <van-field v-model="capitalmodel.unit"
                       required
                       clearable
                       label="资产单位"
                       placeholder="请输入资产单位"/>
            <van-field v-model="deptinfo"
                       required
                       label="保管部门"
                       placeholder="请选择部门"
                       readonly>
                <van-button slot="button"
                            @click="opendeptdlg"
                            size="small"
                            type="primary">选择
                </van-button>
            </van-field>
            <van-field v-model="capitalmodel.savesite"
                       required
                       clearable
                       label="保管位置"
                       placeholder="请输入保管位置"/>
            <van-field v-model="capitalmodel.saveman"
                       required
                       clearable
                       label="保管人"
                       placeholder="请输入保管人"/>

            <van-field v-model="capitalmodel.comment"
                       clearable
                       label="备注"
                       placeholder="请输入备注"/>
            <van-field v-model="loginuserallname"
                       label="添加人"
                       placeholder="请输入添加人"
                       readonly/>
        </van-cell-group>
        <br><br>
        <van-button size="large"
                    @click="AddClick"
                    type="primary">保 存
        </van-button>
        <!--        选择类型的弹窗
        -->
        <UserSelectCapitalType @typeselectresult="typeselectresult"
                               :diaObj="TypeDlgObj"></UserSelectCapitalType>

        <UserSelectDept :diaObj="DeptDlgObj"
                        @deptselectresult="deptselectresult"></UserSelectDept>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import * as globalconstant from '@/common/constant.js'
    import UserSelectCapitalType from '@/components/UserSelectCapitalType.vue'
    import UserSelectDept from '@/components/UserSelectDept.vue'

    // 导入
    import { mixloginuserdata } from "@/mixin/loginuserdata.js"

    export default {
        name : "addcapital" ,
        //导入混入对象 可以是多个,数组
        mixins : [ mixloginuserdata ] ,
        //注册组件
        components : {

            UserSelectCapitalType ,
            UserSelectDept

        } ,
        //数据模型
        data () {
            return {
                capitalmodel : {
                    capitalcode : '' ,
                    capitalname : '' ,
                    money : 0 ,
                    unit : '个' ,
                    deptno : '' ,
                    deptname : '' ,
                    savesite : '' ,
                    saveman : '' ,
                    comment : '' ,
                    userid : '' ,
                    username : '' ,
                    //先默认一个
                    typename : globalconstant.CapitalType[ 0 ]
                } ,

                TypeDlgObj : {
                    //是显示选择类型弹窗
                    isshowdialog : false ,
                    typename : globalconstant.CapitalType[ 0 ]
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
            typeselectresult ( val ) {
                // console.log( val )

                this.TypeDlgObj.typename = val;

                this.capitalmodel.typename = val;

                //不用自己关闭dlg
                // this.closetypedlg();

                return;
            } ,
            //打开 类型选择弹窗
            opentypedlg () {

                this.TypeDlgObj = {
                    isshowdialog : true ,
                    typename : this.capitalmodel.typename
                }
            } ,
            /**
             * 打开部门选择弹窗
             */
            opendeptdlg () {
                this.DeptDlgObj = {
                    isshowdialog : true ,
                    deptno : this.capitalmodel.deptno
                }
            } ,
            deptselectresult ( deptno , deptname ) {
                // console.log( val )

                this.DeptDlgObj.deptno = deptno;

                this.capitalmodel.deptno = deptno;
                this.capitalmodel.deptname = deptname;

                //不用自己关闭dlg
                // this.closetypedlg();

                return;
            } ,
            /**
             * 保存
             * @constructor
             */
            AddClick () {
                if ( !this.userinfo.mobile ) {
                    this.$toast( "请输入手机号码" )

                    return;
                }

            } ,
        } ,
        //计算属性
        computed : {
            deptinfo () {
                if ( this.capitalmodel.deptno == '' || this.capitalmodel.deptname == '' ) {
                    return '';
                }
                return `(${ this.capitalmodel.deptno })${ this.capitalmodel.deptname }`
            } ,
            loginuserallname () {
                return `(${ this.loginusermobile })${ this.loginusername }`
            } ,
        } ,
        //生命周期(mounted)
        mounted () {
            console.log( 'addcapital mounted' )

            //登录用户
            this.capitalmodel.userid = this.loginusermobile;
            this.capitalmodel.username = this.loginusername;
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./addcapital.css">
</style>
