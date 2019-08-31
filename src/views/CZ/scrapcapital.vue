<!--
作者:chenghao
Date: 2019/8/27
Time: 8:12
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-nav-bar title="登记报废资产"
                     left-text="返回"
                     left-arrow
                     @click-left="onClickLeft"/>
        <br>
        <van-cell-group>
            <van-field v-model="scrapmodel.nos"
                       required
                       readonly
                       label="报废单号"/>
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
            <van-field v-model="scrapmodel.scrapname"
                       required
                       clearable
                       label="报废人"
                       placeholder="请输入报废人"/>
            <van-field v-model="scrapmodel.scrapdate"
                       required
                       readonly
                       label="报废日期"
                       placeholder="请选择报废日期">
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
                       placeholder="请输入报废金额"/>
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
        <br><br>
        <van-button size="large"
                    @click="AddClick"
                    type="primary">保 存
        </van-button>

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
    import * as scrapapi from '@/common/bmobapi/scrap.js'

    export default {
        name : "scrapcapital" ,
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
                prefix : 'BF' ,
                //用户选择资产的objectId
                UserSelectCapitalObjectId : '' ,
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
                this.$router.push( "/cz" )

                return;
            } ,
            setupscrapmodel () {
                //给一些变量赋初始化值
                //登录用户
                this.scrapmodel.userid = this.loginusermobile;
                this.scrapmodel.username = this.loginusername;

                // this.scrapmodel.scrapname = RandomUtil.getcname();

                this.scrapmodel.nos = RandomUtil.getrandomno( this.prefix );

                this.scrapmodel.scrapname = RandomUtil.getcname();
            } ,
            opencapitaldlg () {
                this.CapitalDlgObj.isshow = true;
            } ,
            selectcapital ( capitalcode , capitalname , CapitalObjectId ) {
                this.scrapmodel.capitalcode = capitalcode;
                this.scrapmodel.capitalname = capitalname;
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

                    this.scrapmodel.scrapdate = date;

                }

                this.DateDlgObj.isshow = false;
                //这里置为空，可以激发
                this.DateDlgObj.date = '';

            } ,
            AddClick () {
                if ( !this.scrapmodel.nos ) {
                    this.$toast( "报废单号为空" )

                    return;
                }

                if ( !this.scrapmodel.capitalcode ) {
                    this.$toast( "请选择资产" )

                    return;
                }

                if ( !this.scrapmodel.scrapname ) {
                    this.$toast( "请输入报废人" )

                    return;
                }

                if ( !this.scrapmodel.scrapdate ) {
                    this.$toast( "请选择报废日期" )

                    return;
                }

                //把插入时间补上
                this.scrapmodel.inputdate = dayjs().format( 'YYYY-MM-DD HH:mm:ss' );
                this.scrapmodel.userid = this.loginusermobile;
                this.scrapmodel.username = this.loginusername;

                ( async () => {
                    let isexistsnos = await scrapapi.isexistsnos( this.scrapmodel.nos );

                    if ( isexistsnos != null && isexistsnos.isexists ) {
                        this.$toast( "报废单号重复" )

                        return;
                    }

                    let _capitals = await dlapi.GetCapitalByCapitalCode( this.scrapmodel.capitalcode );

                    if ( _capitals != null && _capitals.length > 0 ) {
                        //多条记录，取第一条
                        let _capital = _capitals[ 0 ];

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

                    let newno = await scrapapi.addscrap( this.scrapmodel , this.UserSelectCapitalObjectId );

                    if ( newno != null ) {
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

                // this.scrapmodel.scrapname = RandomUtil.getcname();

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

                return `(${ this.scrapmodel.capitalcode })${ this.scrapmodel.capitalname }`
            } ,
            loginuserallname () {
                return `(${ this.loginusermobile })${ this.loginusername }`
            } ,
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log( 'scrapcapital mounted' )

            this.setupscrapmodel();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./scrapcapital.css">
</style>
