<!--
作者:chenghao
Date: 2019/9/1
Time: 18:09
功能:
-->

<!-- html代码片段 -->
<template>

    <div>

        <van-tabs v-model="tabactive">
            <van-tab title="资产信息">
                <van-divider class="mydivider"
                             content-position="left"
                             dashed>
                    <span>{{ `${diaObj.capitalcode}资产详情` }}</span><span v-if="capitalstatus">{{ `(状态:${capitalstatus})`   }}</span>
                </van-divider>

                <capitaldata @getstatus="setstatus"
                             :code="diaObj.capitalcode"></capitaldata>

                <van-divider class="mydivider"
                             content-position="left"
                             dashed>时光轴(点击可看单据详情)
                </van-divider>
                <nosstep @userselectnos="userselectnos"
                         :capitalcode="diaObj.capitalcode"></nosstep>
            </van-tab>
            <van-tab title="单据信息">
                <!--                做一个判断，显示谁-->
                <movedetaildata v-if="ismove"
                                :nos="selectnos"></movedetaildata>
                <saledetaildata v-if="issale"
                                :nos="selectnos"></saledetaildata>
                <scrapdetaildata v-if="isscrap"
                                 :nos="selectnos"></scrapdetaildata>
            </van-tab>
        </van-tabs>


    </div>

</template>

<!--
js脚本代码片段
-->
<script>
    import capitaldata from '@/components/detail/capitaldata.vue'
    import nosstep from '@/components/detail/nosstep.vue'

    import movedetaildata from '@/components/detail/movedetaildata.vue'
    import saledetaildata from '@/components/detail/saledetaildata.vue'
    import scrapdetaildata from '@/components/detail/scrapdetaildata.vue'

    import * as globalconstant from '@/common/constant.js'
    import * as util from '@/common/util/util.js'

    export default {
        name : "detaildata" ,
        props : {
            diaObj : Object ,
        } ,
        watch : {
            // 'diaObj.nos' : {
            //     //监听 资产编号变化，重新生成列表
            //     handler ( newName , oldName ) {
            //         // console.log( 'detaildata. diaObj.nos changed' );
            //
            //         if ( !newName ) {
            //             this.tabactive = 0;
            //         }
            //
            //         this.selectnos = newName;
            //     } ,
            //     immediate : true ,
            //
            // } ,
            // 'diaObj.notype' : {
            //     //监听 资产编号变化，重新生成列表
            //     handler ( newName , oldName ) {
            //         // console.log( 'detaildata. diaObj.notype changed' );
            //
            //         this.notype = newName;
            //     } ,
            //     immediate : true ,
            //
            // } ,
            diaObj : {
                handler ( newName , oldName ) {
                    // console.log( 'detaildata diaObj watch handler' , newName , oldName );

                    this.notype = newName.notype;
                    this.tabactive = newName.tabindex;
                    this.selectnos = newName.nos;
                } ,
                immediate : true ,
                //深度
                deep : true
            } ,
        } ,
        //注册组件
        components : {

            capitaldata ,
            nosstep ,
            movedetaildata ,
            saledetaildata ,
            scrapdetaildata

        } ,
        //数据模型
        data () {
            return {
                tabactive : 0 ,

                selectnos : '' ,

                notype : '' ,

                capitalstatus : ''
            }
        } ,
        //方法
        methods : {
            userselectnos ( nos , _type ) {
                // console.log( 'userselectnos' , nos , _type )

                //切换tab
                this.tabactive = 1;

                this.selectnos = nos;

                this.notype = _type;
            } ,

            initmodel () {
                this.selectnos = '';

                this.notype = '';

                this.tabactive = 0;
            } ,

            setstatus ( status ) {

                this.capitalstatus = status;

            } ,
        } ,
        //计算属性
        computed : {
            IsNormalStstus () {
                return util.IsNormal( this.capitalstatus );
            } ,
            ismove () {
                if ( this.notype == globalconstant.notype.move ) {
                    return true;
                }
                return false;
            } ,
            issale () {
                if ( this.notype == globalconstant.notype.sale ) {
                    return true;
                }
                return false;
            } ,
            isscrap () {
                if ( this.notype == globalconstant.notype.scrap ) {
                    return true;
                }
                return false;
            } ,
        } ,
        //生命周期(mounted)
        mounted () {
            // console.log( 'detaildata mounted' )

            // //接收监听
            // this.$bus.$on( "initdetaildata" , ( val ) => {
            //     // console.log( val );
            //
            //     this.initmodel();
            //     // this.message = val.c;
            // } )
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./detaildata.css">
</style>
