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
                       label="报废单"/>
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

        <selectcapital @selectcapital="selectcapital"
                       :diaObj="CapitalDlgObj"></selectcapital>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    // 导入
    import { loginuserdatamix } from "@/mixin/loginuserdata.js"
    import * as RandomUtil from '@/common/util/RandomUtil.js'

    import selectcapital from '@/components/selectcapital.vue'

    export default {
        name : "scrapcapital" ,
        //注册组件
        components : {

            selectcapital
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
                /**
                 * 模型
                 */
                scrapmodel : {
                    nos : '' ,
                    capitalcode : '' ,
                    capitalname : '' ,

                    scrapmoney : 0 ,
                    scrapname : '' ,
                    scrapdate : '' ,
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

                this.scrapmodel.scrapname = RandomUtil.getcname();

                this.scrapmodel.nos = RandomUtil.getrandomno( this.prefix );
            } ,
            opencapitaldlg () {
                this.CapitalDlgObj.isshow = true;
            } ,
            selectcapital ( capitalcode , capitalname ) {
                this.scrapmodel.capitalcode = capitalcode;
                this.scrapmodel.capitalname = capitalname;

                this.CapitalDlgObj.isshow = false;

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
        } ,
        //生命周期(mounted)
        mounted () {
            console.log( 'scrapcapital mounted' )

            this.setupscrapmodel();
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./scrapcapital.css">
</style>
