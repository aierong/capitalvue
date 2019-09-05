<!--
作者:chenghao
Date: 2019/8/27
Time: 8:12
功能:
-->

<!-- 报废资产 -->
<!-- html代码片段 -->
<template>

    <div>
        <mynavbar title="报废资产"
                  lefttext="返回"
                  @ClickRight="onClickRight"
                  @ClickLeft="onClickLeft"
                  righttext="主页"
                  righticon="shop"></mynavbar>

        <van-tabs v-model="tabactive">
            <van-tab title="登记">
                <van-cell-group>
                    <!--                    :error-message="errors.first('nos')"-->
                    <van-field v-model="scrapmodel.nos"
                               required
                               readonly
                               label="报废单号"
                               placeholder="报废单号"

                               :error="errors.has('nos')"
                               data-vv-name="nos"
                               v-validate="'required'"/>
                    <!--                    :error-message="errors.first('capitalallname')"-->
                    <van-field v-model="capitalallname"
                               required
                               readonly
                               label="资产"
                               placeholder="请选择资产"

                               :error="errors.has('capitalallname')"
                               data-vv-name="capitalallname"
                               v-validate="'required'">
                        <van-button slot="button"
                                    @click="opencapitaldlg"
                                    size="small"
                                    type="primary">选择
                        </van-button>
                    </van-field>
                    <van-field v-model="scrapmodel.scrapname"
                               required
                               clearable
                               label="报废人"
                               placeholder="请输入报废人"

                               :error="errors.has('scrapname')"
                               data-vv-name="scrapname"
                               v-validate="'required'"/>
                    <!--                    :error-message="errors.first('scrapdate')"-->
                    <van-field v-model="scrapmodel.scrapdate"
                               required
                               readonly
                               label="报废日期"
                               placeholder="请选择报废日期"

                               :error="errors.has('scrapdate')"
                               data-vv-name="scrapdate"
                               v-validate="'required'">
                        <van-button slot="button"
                                    @click="opendateldlg"
                                    size="small"
                                    type="primary">选择
                        </van-button>
                    </van-field>
                    <van-field v-model.number="scrapmodel.scrapmoney"
                               required
                               clearable
                               type="number"
                               label="报废金额"
                               placeholder="请输入报废金额"

                               :error-message="errors.first('scrapmoney')"
                               :error="errors.has('scrapmoney')"
                               data-vv-name="scrapmoney"
                               v-validate="'required|min_value:0'"/>
                    <van-field v-model="scrapmodel.scrapreason"
                               clearable
                               label="报废原因"
                               placeholder="请输入报废原因"/>
                    <van-field v-model="scrapmodel.comment"
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

                <!--        选择资产的弹窗
        -->
                <selectcapital @selectcapital="selectcapital"
                               :diaObj="CapitalDlgObj"></selectcapital>
                <!--        选择日期的弹窗
        -->
                <selectdate @dateresult="dateresult"
                            :diaObj="DateDlgObj"></selectdate>

            </van-tab>
            <van-tab title="查询">
                <addscrapquery></addscrapquery>
            </van-tab>
        </van-tabs>


    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import dayjs from 'dayjs'

    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"
    import { mixmethods } from '@/mixin/mixmethods.js'

    import * as RandomUtil from '@/common/util/RandomUtil.js'

    import selectcapital from '@/components/selectcapital.vue'
    import selectdate from '@/components/selectdate.vue'
    import addscrapquery from '@/components/addscrapquery.vue'

    import * as util from '@/common/util/util.js'

    import * as dlapi from '@/common/bmobapi/dl.js'
    import * as scrapapi from '@/common/bmobapi/scrap.js'

    const validate = {
        custom : {

            scrapmoney : {
                required : () => '请输入报废金额' ,
                min_value : ( fiield , params ) => {

                    return `报废金额请大于等于${ params[ 0 ] }`
                } ,

            } ,

        } ,
    };

    export default {
        name : "scrapcapital" ,
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
            addscrapquery

        } ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,
            mixmethods

        ] ,
        //数据模型
        data () {
            return {
                frompage : '' ,
                tabactive : 0 ,
                /**
                 * 单据的前缀
                 */
                prefix : 'BF' ,
                //用户选择资产的objectId
                UserSelectCapitalObjectId : '' ,
                buttonobj : {
                    isloading : false
                } ,
                /**
                 * 模型
                 */
                scrapmodel : {
                    nos : '' ,
                    capitalcode : '' ,
                    capitalname : '' ,

                    scrapmoney : 0 ,
                    scrapname : '' ,
                    //默认今天
                    scrapdate : dayjs().format( 'YYYY-MM-DD' ) ,
                    scrapreason : '' ,

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
                if ( this.frompage ) {
                    this.$router.push( this.frompage );

                    return;
                }

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
                this.scrapmodel.userid = this.loginusermobile;
                this.scrapmodel.username = this.loginusername;

                this.scrapmodel.nos = RandomUtil.getrandomno( this.prefix );

                this.scrapmodel.scrapname = RandomUtil.getcname();
            } ,
            opencapitaldlg () {
                this.CapitalDlgObj.isshow = true;
            } ,
            selectcapital ( item ) {
                this.scrapmodel.capitalcode = item.capitalcode;
                this.scrapmodel.capitalname = item.capitalname;
                //记录id，后面保存要用
                this.UserSelectCapitalObjectId = item.objectId;

                this.CapitalDlgObj.isshow = false;

            } ,
            opendateldlg () {
                this.DateDlgObj.isshow = true;
                this.DateDlgObj.date = this.scrapmodel.scrapdate;
            } ,
            dateresult ( date ) {
                if ( date ) {

                    this.scrapmodel.scrapdate = date;

                }

                this.DateDlgObj.isshow = false;
                //这里置为空，可以激发
                this.DateDlgObj.date = '';

            } ,
            AddClick () {
                // if ( !this.scrapmodel.nos ) {
                //     this.$toast( "报废单号为空" )
                //
                //     return;
                // }

                // if ( !this.scrapmodel.capitalcode ) {
                //     this.$toast( "请选择资产" )
                //
                //     return;
                // }

                // if ( !this.scrapmodel.scrapname ) {
                //     this.$toast( "请输入报废人" )
                //
                //     return;
                // }

                // if ( !this.scrapmodel.scrapdate ) {
                //     this.$toast( "请选择报废日期" )
                //
                //     return;
                // }

                ( async () => {
                    let valid = await this.$validator.validate();

                    if ( !valid ) {
                        // this.$toast( "验证失败" )

                        return;
                    }

                    //把插入时间补上
                    this.scrapmodel.inputdate = dayjs().format( 'YYYY-MM-DD HH:mm:ss' );
                    this.scrapmodel.userid = this.loginusermobile;
                    this.scrapmodel.username = this.loginusername;

                    let isexistsnos = await scrapapi.isexistsnos( this.scrapmodel.nos );

                    if ( isexistsnos != null && isexistsnos.isexists ) {
                        this.$toast( "报废单号重复" )

                        return;
                    }

                    let _capital = await dlapi.GetCapitalByCapitalCode( this.scrapmodel.capitalcode );

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

                    // let newno = await scrapapi.addscrap( this.scrapmodel , this.UserSelectCapitalObjectId );
                    let arr = await Promise.all( [
                        util.runlongtims( 2000 ) ,
                        //scrapapi.addscrap( this.scrapmodel , this.UserSelectCapitalObjectId )
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

                this.scrapmodel = {
                    nos : '' ,
                    capitalcode : '' ,
                    capitalname : '' ,

                    scrapmoney : 0 ,
                    scrapname : '' ,
                    //默认今天
                    scrapdate : dayjs().format( 'YYYY-MM-DD' ) ,
                    scrapreason : '' ,

                    comment : '' ,

                    //这3个属性不必清空
                    // userid : '' ,
                    // username : '' ,
                    // inputdate : '' ,
                }

                this.scrapmodel.nos = RandomUtil.getrandomno( this.prefix );

                this.scrapmodel.scrapname = RandomUtil.getcname();

            } ,
        } ,
        //计算属性
        computed : {
            capitalallname () {
                if ( !this.scrapmodel.capitalcode || !this.scrapmodel.capitalname ) {
                    return '';
                }

                return `(${ this.scrapmodel.capitalcode } )${ this.scrapmodel.capitalname }`
            } ,
            loginuserallname () {
                return `(${ this.loginusermobile } )${ this.loginusername }`
            } ,
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log( 'scrapcapital mounted' )

            this.$validator.localize( 'zh_CN' , validate );

            this.setupscrapmodel();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./scrapcapital.css">
</style>
