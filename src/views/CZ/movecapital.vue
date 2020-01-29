<!--
作者:chenghao
Date: 2019/8/26
Time: 16:56
功能:
-->

<!-- html代码片段 -->
<template>

    <div>

        <mynavbar title="转移资产"
                  lefttext="返回"
                  @ClickRight="onClickRight"
                  @ClickLeft="onClickLeft"
                  righttext="主页"
                  righticon="shop"></mynavbar>

        <van-tabs v-model="tabactive">
            <van-tab title="登记">
                <van-cell-group>
                    <van-field v-model="$v.movemodel.nos.$model"
                               required
                               readonly
                               label="转移单号"
                               placeholder="转移单号"
                               :error-message="NosErrorInfo"/>

                    <van-field v-model="capitalallname"
                               required
                               readonly
                               label="资产"
                               placeholder="请选择资产"
                               :error-message="CapitalErrorInfo">
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
                               placeholder="请选择现部门"
                               :error-message="NewDeptErrorInfo">
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

                    <van-field v-model="$v.movemodel.newsavesite.$model"
                               required
                               clearable
                               label="现位置"
                               placeholder="请输入现位置"
                               :error-message="NewSaveSiteErrorInfo"/>

                    <van-field v-model="movemodel.oldsaveman"
                               required
                               readonly
                               label="原保管人"/>

                    <van-field v-model="$v.movemodel.newsaveman.$model"
                               required
                               clearable
                               label="现保管人"
                               placeholder="请输入现保管人"
                               :error-message="NewSaveManErrorInfo"/>

                    <van-field v-model="$v.movemodel.movedate.$model"
                               required
                               readonly
                               label="转移日期"
                               placeholder="请选择转移日期"
                               :error-message="MoveDateErrorInfo">

                        <van-button slot="button"
                                    @click="opendateldlg"
                                    size="small"
                                    type="primary">选择
                        </van-button>
                    </van-field>

                    <van-field v-model="$v.movemodel.movename.$model"
                               required
                               clearable
                               label="转移人"
                               placeholder="请输入转移人"
                               :error-message="MoveNameErrorInfo"/>

                    <van-field v-model="movemodel.comment"
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
                选择资产的弹窗
                -->
                <selectcapital @selectcapital="selectcapital"
                               :diaObj="CapitalDlgObj"></selectcapital>
                <!--
                选择日期的弹窗
                 -->
                <selectdate @dateresult="dateresult"
                            :diaObj="DateDlgObj"></selectdate>

                <!--
                选择部门的弹窗
                -->
                <UserSelectDept :diaObj="DeptDlgObj"
                                @deptselectresult="deptselectresult"></UserSelectDept>

            </van-tab>
            <van-tab title="查询">
                <addmovequery></addmovequery>
            </van-tab>
        </van-tabs>

    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import dayjs from 'dayjs'

    //验证器
    import {
        minValue ,
        required
    } from 'vuelidate/lib/validators'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"
    import { mixmethods } from '@/mixin/mixmethods.js'

    import * as RandomUtil from '@/common/util/RandomUtil.js'

    import selectcapital from '@/components/selectcapital.vue'
    import selectdate from '@/components/selectdate.vue'
    import UserSelectDept from '@/components/UserSelectDept.vue'
    import addmovequery from '@/components/addmovequery.vue'

    import * as util from '@/common/util/util.js'

    import * as dlapi from '@/common/bmobapi/dl.js'
    import * as moveapi from '@/common/bmobapi/move.js'

    export default {
        name : "movecapital" ,
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

            selectcapital ,
            selectdate ,
            UserSelectDept ,
            addmovequery

        } ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,
            mixmethods

        ] ,
        //每个要验证的值，必须在validations选项内部创建一个键
        validations : {
            movemodel : {
                nos : {
                    required ,
                } ,
                capitalcode : {
                    required ,
                } ,
                // capitalname : {
                //     required ,
                // } ,
                newdeptno : {
                    required ,
                } ,
                // newdeptname : {
                //     required ,
                // } ,
                newsavesite : {
                    required ,
                } ,
                newsaveman : {
                    required ,
                } ,
                movedate : {
                    required ,
                } ,
                movename : {
                    required ,
                } ,
            } ,
        } ,
        //数据模型
        data () {
            return {
                frompage : '' ,
                tabactive : 0 ,
                /**
                 * 单据的前缀
                 */
                prefix : 'ZZ' ,
                //用户选择资产的objectId
                UserSelectCapitalObjectId : '' ,
                buttonobj : {
                    isloading : false
                } ,
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
                    //转移人
                    movename : '' ,
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
            setupscrapmodel () {
                //给一些变量赋初始化值
                //登录用户
                this.movemodel.userid = this.loginusermobile;
                this.movemodel.username = this.loginusername;

                this.movemodel.nos = RandomUtil.getrandomno( this.prefix );

                this.movemodel.movename = RandomUtil.getcname();
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
            AddClick () {

                ( async () => {

                    this.$v.$touch();

                    let _valid = this.$v.$invalid;

                    if ( _valid ) {
                        //验证失败 退出
                        // 不用提示
                        // this.$toast( "验证失败" )

                        return;
                    }

                    if ( this.olddeptinfo == this.newdeptinfo
                        && this.movemodel.oldsaveman == this.movemodel.newsaveman
                        && this.movemodel.oldsavesite == this.movemodel.newsavesite ) {
                        this.$toast( "信息没有变化,不用转移" )

                        return;
                    }

                    //把插入时间补上
                    this.movemodel.inputdate = dayjs().format( 'YYYY-MM-DD HH:mm:ss' );
                    this.movemodel.userid = this.loginusermobile;
                    this.movemodel.username = this.loginusername;

                    let isexistsnos = await moveapi.isexistsnos( this.movemodel.nos );

                    if ( isexistsnos != null && isexistsnos.isexists ) {
                        this.$toast( "转移单号重复" )

                        return;
                    }

                    let _capital = await dlapi.GetCapitalByCapitalCode( this.movemodel.capitalcode );

                    if ( _capital != null ) {

                        //检查一下资产的状态
                        let IsNormal = util.IsNormal( _capital.capitalstatus );

                        if ( !IsNormal ) {
                            this.$toast( "资产不是正常状态" )

                            return;
                        }
                    }
                    else {
                        this.$toast( "资产不存在" )

                        return;
                    }

                    this.buttonobj.isloading = true;

                    let arr = await Promise.all( [
                        util.runlongtims( 2000 ) ,
                        moveapi.addmove( this.movemodel , this.UserSelectCapitalObjectId )
                    ] );

                    this.buttonobj.isloading = false;

                    if ( arr != null && arr.length >= 2 ) {
                        //添加成功
                        this.$toast.success( "成功" );
                        //重新初始化一下
                        this.initmodel();

                        return;
                    }
                    else {
                        //失败
                        this.$toast.fail( "失败" )

                        return;
                    }

                } )();

            } ,
            initmodel () {

                this.movemodel = {
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
                    movename : '' ,
                    comment : '' ,

                    //这3个属性不必清空
                    // userid : '' ,
                    // username : '' ,
                    // inputdate : '' ,
                }

                this.movemodel.nos = RandomUtil.getrandomno( this.prefix );

                this.movemodel.movename = RandomUtil.getcname();

            } ,
        } ,
        //计算属性
        computed : {
            NosErrorInfo () {
                if ( this.$v.movemodel.nos.$error ) {
                    if ( !this.$v.movemodel.nos.required ) {
                        return "转移单号不可以为空";
                    }
                }

                return "";
            } ,
            MoveNameErrorInfo () {
                if ( this.$v.movemodel.movename.$error ) {
                    if ( !this.$v.movemodel.movename.required ) {
                        return "请输入转移人";
                    }
                }

                return "";
            } ,
            NewSaveSiteErrorInfo () {
                if ( this.$v.movemodel.newsavesite.$error ) {
                    if ( !this.$v.movemodel.newsavesite.required ) {
                        return "请输入现位置";
                    }
                }

                return "";
            } ,
            MoveDateErrorInfo () {
                if ( this.$v.movemodel.movedate.$error ) {
                    if ( !this.$v.movemodel.movedate.required ) {
                        return "请选择转移日期";
                    }
                }

                return "";
            } ,
            NewSaveManErrorInfo () {
                if ( this.$v.movemodel.newsaveman.$error ) {
                    if ( !this.$v.movemodel.newsaveman.required ) {
                        return "请输入现保管人";
                    }
                }

                return "";
            } ,
            CapitalErrorInfo () {
                if ( this.$v.movemodel.capitalcode.$error ) {
                    if ( !this.$v.movemodel.capitalcode.required ) {
                        return "请选择资产";
                    }
                }

                return "";
            } ,
            NewDeptErrorInfo () {
                if ( this.$v.movemodel.newdeptno.$error ) {
                    if ( !this.$v.movemodel.newdeptno.required ) {
                        return "请选择现部门";
                    }
                }

                return "";
            } ,
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
            // console.log( 'movecapital mounted' )

            this.setupscrapmodel();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style src="./movecapital.css"
       scoped>
</style>
