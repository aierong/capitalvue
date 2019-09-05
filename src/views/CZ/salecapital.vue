<!--
作者:chenghao
Date: 2019/8/26
Time: 22:00
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <mynavbar title="出售资产"
                  lefttext="返回"
                  @ClickRight="onClickRight"
                  @ClickLeft="onClickLeft"
                  righttext="主页"
                  righticon="shop"></mynavbar>

        <van-tabs v-model="tabactive">
            <van-tab title="登记">
                <van-cell-group>
                    <van-field v-model="salemodel.nos"
                               required
                               readonly
                               label="出售单号"
                               placeholder="出售单号"

                               :error="errors.has('nos')"
                               data-vv-name="nos"
                               v-validate="'required'"/>
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
                    <van-field v-model="salemodel.salename"
                               required
                               clearable
                               label="出售人"
                               placeholder="请输入出售人"

                               :error="errors.has('salename')"
                               data-vv-name="salename"
                               v-validate="'required'"/>
                    <van-field v-model="salemodel.saledate"
                               required
                               readonly
                               label="出售日期"
                               placeholder="请选择出售日期"

                               :error="errors.has('saledate')"
                               data-vv-name="saledate"
                               v-validate="'required'">
                        <van-button slot="button"
                                    @click="opendateldlg"
                                    size="small"
                                    type="primary">选择
                        </van-button>
                    </van-field>
                    <van-field v-model.number="salemodel.salemoney"
                               required
                               clearable
                               type="number"
                               label="出售金额"
                               placeholder="请输入出售金额"

                               :error-message="errors.first('salemoney')"
                               :error="errors.has('salemoney')"
                               data-vv-name="salemoney"
                               v-validate="'required|min_value:0'"/>
                    <van-field v-model="salemodel.saleto"
                               clearable
                               label="出售对象"
                               required
                               placeholder="请输入出售对象"

                               :error="errors.has('saleto')"
                               data-vv-name="saleto"
                               v-validate="'required'"/>
                    <van-field v-model="salemodel.comment"
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
                <addsalequery></addsalequery>
            </van-tab>
        </van-tabs>

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
    import addsalequery from '@/components/addsalequery.vue'

    import * as util from '@/common/util/util.js'

    import * as dlapi from '@/common/bmobapi/dl.js'
    import * as saleapi from '@/common/bmobapi/sale.js'

    const validate = {
        custom : {

            salemoney : {
                required : () => '请输入报废金额' ,
                min_value : ( fiield , params ) => {

                    return `报废金额请大于等于${ params[ 0 ] }`
                } ,

            } ,

        } ,
    };

    export default {
        name : "salecapital" ,
        //注册组件
        components : {

            selectcapital ,
            selectdate ,
            addsalequery

        } ,
        //导入混入对象 可以是多个,数组
        mixins : [

            loginuserdatamix ,

        ] ,
        //数据模型
        data () {
            return {
                tabactive : 0 ,
                /**
                 * 单据的前缀
                 */
                prefix : 'CS' ,
                //用户选择资产的objectId
                UserSelectCapitalObjectId : '' ,
                buttonobj : {
                    isloading : false
                } ,
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
            selectcapital ( item ) {
                this.salemodel.capitalcode = item.capitalcode;
                this.salemodel.capitalname = item.capitalname;
                //记录id，后面保存要用
                this.UserSelectCapitalObjectId = item.objectId;

                this.CapitalDlgObj.isshow = false;

            } ,
            opendateldlg () {
                this.DateDlgObj.isshow = true;
                this.DateDlgObj.date = this.salemodel.saledate;
            } ,
            dateresult ( date ) {
                if ( date ) {

                    this.salemodel.saledate = date;

                }

                this.DateDlgObj.isshow = false;
                //这里置为空，可以激发
                this.DateDlgObj.date = '';

            } ,
            AddClick () {
                // if ( !this.salemodel.nos ) {
                //     this.$toast( "出售单号为空" )
                //
                //     return;
                // }
                //
                // if ( !this.salemodel.capitalcode ) {
                //     this.$toast( "请选择资产" )
                //
                //     return;
                // }
                //
                // if ( !this.salemodel.salename ) {
                //     this.$toast( "请输入出售人" )
                //
                //     return;
                // }

                // if ( !this.salemodel.saledate ) {
                //     this.$toast( "请选择出售日期" )
                //
                //     return;
                // }
                //
                // if ( !this.salemodel.saleto ) {
                //     this.$toast( "请输入出售对象" )
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
                    this.salemodel.inputdate = dayjs().format( 'YYYY-MM-DD HH:mm:ss' );
                    this.salemodel.userid = this.loginusermobile;
                    this.salemodel.username = this.loginusername;

                    let isexistsnos = await saleapi.isexistsnos( this.salemodel.nos );

                    if ( isexistsnos != null && isexistsnos.isexists ) {
                        this.$toast( "出售单号重复" )

                        return;
                    }

                    let _capital = await dlapi.GetCapitalByCapitalCode( this.salemodel.capitalcode );

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

                    // let newno = await saleapi.addsale( this.salemodel , this.UserSelectCapitalObjectId );
                    let arr = await Promise.all( [
                        util.runlongtims( 2000 ) ,
                        saleapi.addsale( this.salemodel , this.UserSelectCapitalObjectId )
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

                this.salemodel = {
                    nos : '' ,
                    capitalcode : '' ,
                    capitalname : '' ,

                    salemoney : 0 ,
                    salename : '' ,
                    //默认今天
                    saledate : dayjs().format( 'YYYY-MM-DD' ) ,
                    saleto : '' ,

                    comment : '' ,

                    //这3个属性不必清空
                    // userid : '' ,
                    // username : '' ,
                    // inputdate : '' ,
                }

                this.salemodel.nos = RandomUtil.getrandomno( this.prefix );

                this.salemodel.salename = RandomUtil.getcname();

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

            this.$validator.localize( 'zh_CN' , validate );

            this.setupscrapmodel();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./salecapital.css">
</style>
