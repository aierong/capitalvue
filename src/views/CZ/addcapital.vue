<!--
作者:chenghao
Date: 2019/8/25
Time: 11:17
功能:
-->

<!-- html代码片段 -->
<template>

    <div>

        <mynavbar title="资产"
                  lefttext="返回"
                  @ClickRight="onClickRight"
                  @ClickLeft="onClickLeft"
                  righttext="主页"
                  righticon="shop">
        </mynavbar>
        <van-tabs v-model="tabactive">
            <van-tab title="登记">
                <van-cell-group>

                    <van-field v-model="$v.capitalmodel.capitalcode.$model"
                               required
                               clearable
                               label="资产代号"
                               placeholder="请输入资产代号"

                               :error-message="CapitalCodeErrorInfo"/>

                    <van-field v-model="$v.capitalmodel.capitalname.$model"
                               required
                               clearable
                               label="资产名称"
                               placeholder="请输入资产名称"

                               :error-message="CapitalNameErrorInfo"/>

                    <van-field v-model.number="$v.capitalmodel.money.$model"
                               required
                               clearable
                               type="number"
                               label="资产金额"
                               placeholder="请输入资产金额"

                               :error-message="MoneyErrorInfo"/>

                    <van-field v-model="$v.capitalmodel.typename.$model"
                               require
                               label="资产类型"
                               placeholder="请选择资产类型"
                               readonly
                               :error-message="TypeNameErrorInfo">

                        <van-button slot="button"
                                    @click="opentypedlg"
                                    size="small"
                                    type="primary">选择
                        </van-button>
                    </van-field>

                    <van-field v-model="$v.capitalmodel.unit.$model"
                               required
                               clearable
                               label="资产单位"
                               placeholder="请输入资产单位"

                               :error-message="UnitErrorInfo"/>

                    <van-field v-model="deptinfo"
                               required
                               label="保管部门"
                               placeholder="请选择保管部门"
                               readonly

                               :error-message="DeptErrorInfo">
                        <van-button slot="button"
                                    @click="opendeptdlg"
                                    size="small"
                                    type="primary">选择
                        </van-button>
                    </van-field>

                    <van-field v-model="$v.capitalmodel.savesite.$model"
                               required
                               clearable
                               label="保管位置"
                               placeholder="请输入保管位置"

                               :error-message="SaveSiteErrorInfo"/>

                    <van-field v-model="$v.capitalmodel.saveman.$model"
                               required
                               clearable
                               label="保管人"
                               placeholder="请输入保管人"

                               :error-message="SaveManErrorInfo"/>

                    <van-field v-model="capitalmodel.comment"
                               clearable
                               label="备注"
                               placeholder="请输入备注"/>

                    <van-field v-model="loginuserallname"
                               label="添加人"
                               placeholder="请输入添加人"
                               readonly/>
                </van-cell-group>
                <br>
                <van-button size="large"
                            @click="AddClick"
                            type="primary"
                            color="#7232dd"
                            plain
                            round
                            loading-type="spinner"
                            loading-text="保存中..."
                            :loading="buttonobj.isloading">保 存
                </van-button>
                <!--
                选择类型的弹窗
                -->
                <UserSelectCapitalType @typeselectresult="typeselectresult"
                                       :diaObj="TypeDlgObj"></UserSelectCapitalType>
                <!--
                选择部门的弹窗
                -->
                <UserSelectDept :diaObj="DeptDlgObj"
                                @deptselectresult="deptselectresult"></UserSelectDept>
            </van-tab>
            <van-tab title="我登记的">
                <addquery></addquery>
            </van-tab>

        </van-tabs>

    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import dayjs from 'dayjs'

    //验证器
    import {
        required ,
        minValue
    } from 'vuelidate/lib/validators'

    import * as globalconstant from '@/common/constant.js'
    import UserSelectCapitalType from '@/components/UserSelectCapitalType.vue'
    import UserSelectDept from '@/components/UserSelectDept.vue'
    import addquery from '@/components/addquery.vue'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"
    import { mixmethods } from '@/mixin/mixmethods.js'

    import * as RandomUtil from '@/common/util/RandomUtil.js'
    import * as util from '@/common/util/util.js'

    import * as  dlapi from '@/common/bmobapi/dl.js'

    export default {
        name : "addcapital" ,
        beforeRouteEnter ( to , from , next ) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建

            //你可以通过传一个回调给next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
            // vm替代了this
            next( vm => {

                if ( from != null && from.path != null ) {
                    vm.frompage = from.path;
                }
                else {
                    vm.frompage = "";
                }

            } )

            // console.log( "dao1独自守卫beforeRouteEnter,进入之前to:" , to );
            // console.log( "dao1独自守卫beforeRouteEnter,进入之前from:" , from );

            next();
        } ,
        //注册组件
        components : {
            UserSelectCapitalType ,
            UserSelectDept ,
            addquery
        } ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,
            mixmethods

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
        //每个要验证的值，必须在validations选项内部创建一个键
        validations : {
            capitalmodel : {
                capitalcode : {
                    required ,
                } ,
                capitalname : {
                    required ,
                } ,
                money : {
                    required ,
                    minValue : minValue( 0 )
                } ,
                typename : {
                    required ,
                } ,
                unit : {
                    required ,
                } ,
                savesite : {
                    required ,
                } ,
                saveman : {
                    required ,
                } ,
                deptno : {
                    required ,
                } ,
                deptname : {
                    required ,
                } ,

            } ,

        } ,
        //数据模型
        data () {
            return {
                frompage : '' ,
                tabactive : 0 ,
                buttonobj : {
                    isloading : false
                } ,
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
                if ( this.frompage ) {
                    this.$router.push( this.frompage );

                    return;
                }

                // 页面跳转
                this.$router.push( "/cz" )

                return;
            } ,
            onClickRight () {
                // 页面跳转

                this.GoToMainPage();

                return
            } ,
            typeselectresult ( val ) {

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

                ( async () => {

                    // let valid = await this.$validator.validate();
                    let _valid = this.$v.$invalid;

                    if ( _valid ) {
                        //验证失败 退出
                        // 不用提示
                        // this.$toast( "验证失败" )

                        return;
                    }

                    //把插入时间补上
                    this.capitalmodel.inputdate = dayjs().format( 'YYYY-MM-DD HH:mm:ss' );
                    this.capitalmodel.userid = this.loginusermobile;
                    this.capitalmodel.username = this.loginusername;

                    let checkresult = await dlapi.isexistscapital( this.capitalmodel.capitalcode );

                    if ( checkresult != null && checkresult.isexists ) {
                        this.$toast( "资产代号重复" )

                        return;
                    }

                    this.buttonobj.isloading = true;

                    let arr = await Promise.all( [
                        util.runlongtims( 2000 ) ,
                        dlapi.adddl( this.capitalmodel )
                    ] );

                    this.buttonobj.isloading = false;

                    if ( arr != null && arr.length >= 2 ) {
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
                let _typename = globalconstant.CapitalType[ 0 ];

                this.capitalmodel = {
                    capitalcode : '' ,
                    capitalname : '' ,
                    money : 0 ,
                    unit : '个' ,
                    deptno : '' ,
                    deptname : '' ,
                    savesite : '' ,
                    saveman : RandomUtil.getcname() ,
                    comment : '' ,

                    //这2个属性不要清空
                    // userid : '' ,
                    // username : '' ,

                    inputdate : '' ,

                    typename : _typename
                }
                let _prefix = util.getprefix( _typename );
                this.capitalmodel.capitalcode = RandomUtil.getcapitalcode( _prefix );

            } ,
        } ,
        //计算属性
        computed : {
            DeptErrorInfo () {
                if ( !this.$v.capitalmodel.deptno.required ) {
                    return "请选择保管部门";
                }
                if ( !this.$v.capitalmodel.deptname.required ) {
                    return "请选择保管部门";
                }

                return "";
            } ,
            SaveManErrorInfo () {
                if ( !this.$v.capitalmodel.saveman.required ) {
                    return "请输入保管人";
                }
                return "";
            } ,
            SaveSiteErrorInfo () {
                if ( !this.$v.capitalmodel.savesite.required ) {
                    return "请输入保管位置";
                }
                return "";
            } ,
            UnitErrorInfo () {
                if ( !this.$v.capitalmodel.unit.required ) {
                    return "请输入资产单位";
                }
                return "";
            } ,
            TypeNameErrorInfo () {
                if ( !this.$v.capitalmodel.typename.required ) {
                    return "请选择资产类型";
                }
                return "";
            } ,
            CapitalNameErrorInfo () {
                if ( !this.$v.capitalmodel.capitalname.required ) {
                    return "资产名称不允许空";
                }
                return "";
            } ,
            CapitalCodeErrorInfo () {
                if ( !this.$v.capitalmodel.capitalcode.required ) {
                    return "资产代号不允许空";
                }
                return "";
            } ,
            MoneyErrorInfo () {
                if ( !this.$v.capitalmodel.money.required ) {
                    return "资产金额不允许空";
                }

                if ( !this.$v.capitalmodel.money.minValue ) {
                    return "资产金额请大于等于" + this.$v.capitalmodel.money.$params.minValue.min;
                }

                return "";
            } ,
            deptinfo () {
                if ( !this.capitalmodel.deptno || !this.capitalmodel.deptname ) {
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

            this.setupcapitalmodel();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./addcapital.css">
</style>
