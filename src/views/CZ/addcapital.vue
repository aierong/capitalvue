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
                       placeholder="请选择保管部门"
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
    import dayjs from 'dayjs'

    import * as globalconstant from '@/common/constant.js'
    import UserSelectCapitalType from '@/components/UserSelectCapitalType.vue'
    import UserSelectDept from '@/components/UserSelectDept.vue'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"

    import * as RandomUtil from '@/common/util/RandomUtil.js'
    import * as util from '@/common/util/util.js'

    import * as  dlapi from '@/common/bmobapi/dl.js'

    export default {
        name : "addcapital" ,

        //注册组件
        components : {
            UserSelectCapitalType ,
            UserSelectDept
        } ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,

        ] ,
        watch : {
            'capitalmodel.typename' : {
                //监听资产类型,类型变化，重新生成资产代号
                handler ( newName , oldName ) {
                    // console.log( 'capitalmodel.typename changed' );

                    let _prefix = util.getprefix( newName );

                    this.capitalmodel.capitalcode = RandomUtil.getcapitalcode( _prefix );
                } ,
                immediate : true ,

            }
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
                    inputdate : '' ,

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
                if ( !this.capitalmodel.capitalcode ) {
                    this.$toast( "请输入资产代号" )

                    return;
                }

                if ( !this.capitalmodel.capitalname ) {
                    this.$toast( "请输入资产名称" )

                    return;
                }

                if ( !this.capitalmodel.typename ) {
                    this.$toast( "请选择资产类型" )

                    return;
                }

                if ( !this.capitalmodel.unit ) {
                    this.$toast( "请输入资产单位" )

                    return;
                }

                if ( !this.capitalmodel.deptno ) {
                    this.$toast( "请选择保管部门" )

                    return;
                }

                if ( !this.userinfo.savesite ) {
                    this.$toast( "请输入保管位置" )

                    return;
                }

                if ( !this.capitalmodel.saveman ) {
                    this.$toast( "请输入保管人" )

                    return;
                }

                //把插入时间补上
                this.capitalmodel.inputdate = dayjs().format( 'YYYY-MM-DD HH:mm:ss' );

                ( async () => {
                    let checkresult = await dlapi.isexistscapital( this.capitalmodel.capitalcode );

                    if ( checkresult != null && checkresult.isexists ) {
                        this.$toast( "资产代号重复" )

                        return;
                    }

                    let newcapital = await dlapi.adddl( this.capitalmodel );

                    if ( newcapital != null ) {
                        //添加成功
                        this.$toast.success( "成功" );
                        //重新初始化一下
                        this.initcapitalmodel();

                        return;
                    }
                    else {
                        //失败
                        this.$toast.fail( "失败" )

                        return;
                    }

                } )();
            } ,
            setupcapitalmodel () {
                //给一些变量赋初始化值
                //登录用户
                this.capitalmodel.userid = this.loginusermobile;
                this.capitalmodel.username = this.loginusername;

                this.capitalmodel.saveman = RandomUtil.getcname();
            } ,
            initcapitalmodel () {
                this.capitalmodel = {
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
                    inputdate : '' ,

                    //先默认一个
                    typename : globalconstant.CapitalType[ 0 ]
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

            this.setupcapitalmodel();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./addcapital.css">
</style>
