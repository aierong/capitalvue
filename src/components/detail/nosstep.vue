<!--
作者:chenghao
Date: 2019/9/2
Time: 9:53
功能:
-->

<!-- html代码片段 -->
<!-- 资产时光轴 -->
<template>

    <div>
        <!--
       可以通过设置direction属性来改变步骤条的显示方式
       -->
        <van-steps direction="vertical"
                   :active="steplistcounts-1">
            <van-step :key="_index"
                      v-for="(item,_index) in steplist">
                <h3 @click="noquery(item)">【{{ item.action }}】{{ item.nos }}</h3>
                <p @click="noquery(item)">{{ item.date }}{{ item.man }}</p>
            </van-step>
        </van-steps>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>

    import * as dlapi from '@/common/bmobapi/dl.js'
    import * as moveapi from '@/common/bmobapi/move.js'
    import * as scrapapi from '@/common/bmobapi/scrap.js'
    import * as saleapi from '@/common/bmobapi/sale.js'

    import * as globalconstant from '@/common/constant.js'

    export default {
        name : "nosstep" ,
        props : {
            capitalcode : String
        } ,
        watch : {
            capitalcode : {
                //监听 资产编号变化，重新生成列表
                handler ( newName , oldName ) {
                    // console.log( 'diaObj.date changed' );

                    this.getsteplist()
                } ,
                immediate : true ,

            }
        } ,
        //数据模型
        data () {
            return {
                steplist : []
            }
        } ,
        //方法
        methods : {
            noquery ( item ) {
                if ( !item.isno ) {
                    //点击登记，不反应
                    return;
                }

                //点击某个单据
                this.$emit( "userselectnos" , item.nos , item.type );

                return;
            } ,
            getsteplist () {
                //先清空一把
                this.steplist = [];

                if ( this.capitalcode ) {
                    Promise.all( [

                        dlapi.GetCapitalByCapitalCode( this.capitalcode ) ,
                        moveapi.GetNosList( this.capitalcode ) ,
                        scrapapi.GetNosList( this.capitalcode ) ,
                        saleapi.GetNosList( this.capitalcode )

                    ] ).then( ( res ) => {
                        if ( res != null && res.length >= 4 ) {
                            //先搞登记的信息
                            if ( res[ 0 ] != null ) {
                                let _data = res[ 0 ];

                                let obj = {
                                    isno : false ,
                                    action : '登记' ,
                                    nos : this.capitalcode ,
                                    date : _data.inputdate ,
                                    man : _data.username ,
                                    //类型为空
                                    type : ''
                                };

                                this.steplist.push( obj );
                            }

                            //再搞转移单
                            if ( res[ 1 ] != null && res[ 1 ].length > 0 ) {
                                let _datas = res[ 1 ];   //是数组  转移单有多个

                                _datas.forEach( ( value , index , array ) => {
                                    let obj = {
                                        isno : true ,
                                        action : '转移单' ,
                                        nos : value.nos ,
                                        date : value.inputdate ,
                                        man : value.username ,
                                        type : globalconstant.notype.move
                                    };

                                    this.steplist.push( obj );
                                } )

                            }

                            //再搞报废单
                            if ( res[ 2 ] != null && res[ 2 ].length > 0 ) {
                                let _data = res[ 2 ][ 0 ];   //是数组，只有1个报废单，所以取第一个

                                let obj = {
                                    isno : true ,
                                    action : '报废单' ,
                                    nos : _data.nos ,
                                    date : _data.inputdate ,
                                    man : _data.username ,
                                    type : globalconstant.notype.scrap
                                };

                                this.steplist.push( obj );
                            }

                            //再搞出售单
                            if ( res[ 3 ] != null && res[ 3 ].length > 0 ) {
                                let _data = res[ 3 ][ 0 ];   //是数组，只有1个出售单，所以取第一个

                                let obj = {
                                    isno : true ,
                                    action : '出售单' ,
                                    nos : _data.nos ,
                                    date : _data.inputdate ,
                                    man : _data.username ,
                                    type : globalconstant.notype.sale
                                };

                                this.steplist.push( obj );
                            }

                        }
                        else {
                            this.steplist = [];
                        }
                    } );
                }

            } ,

        } ,
        //计算属性
        computed : {
            steplistcounts () {
                if ( this.steplist != null ) {
                    return this.steplist.length;
                }

                return 0;
            }
        } ,
        //生命周期(mounted)
        mounted () {

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./nosstep.css">
</style>
