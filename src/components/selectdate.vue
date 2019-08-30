<!--
作者:chenghao
Date: 2019/8/27
Time: 16:35
功能:
-->

<!-- html代码片段 -->
<template>

    <div>
        <van-popup position="bottom"
                   v-model="diaObj.isshow">

            <van-datetime-picker :formatter="formatterdatestring"
                                 @cancel="oncancel"
                                 @confirm="onconfirm"
                                 type="date"
                                 title="请选择日期"
                                 v-model="currentDate"/>
        </van-popup>
    </div>

</template>

<!-- js脚本代码片段 -->
<script>
    import dayjs from 'dayjs'

    export default {
        name : "selectdate" ,
        props : {
            diaObj : Object
        } ,
        watch : {
            'diaObj.date' : {
                //监听资产类型,类型变化，重新生成资产代号
                handler ( newName , oldName ) {
                    // console.log( 'diaObj.date changed' );

                    this.currentDate = newName ? dayjs( newName ).toDate() : new Date();
                } ,
                immediate : true ,

            }
        } ,
        //数据模型
        data () {
            return {

                currentDate : this.diaObj.date ? dayjs( this.diaObj.date ).toDate() : new Date()

            }
        } ,
        //方法
        methods : {
            formatterdatestring ( type , value ) {
                // console.log(type)
                // console.log(value)

                if ( type === "year" ) {
                    return `${ value }年`
                }
                else if ( type === "month" ) {
                    return `${ value }月`
                }
                else if ( type == "day" ) {
                    return `${ value }日`
                }

                return value
            } ,
            oncancel () {
                //传递空，就是没有选择
                this.$emit( "dateresult" , '' );

                return;
            } ,
            onconfirm ( val ) {
                // console.log( val )

                this.$emit( "dateresult" , dayjs( val ).format( 'YYYY-MM-DD' ) );

                return;
            } ,
        } ,
        //计算属性
        computed : {
            //name() {
            //代码搞这里
            //return this.data;
            //}
        } ,
        //生命周期(mounted)
        mounted () {

        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./selectdate.css">
</style>
