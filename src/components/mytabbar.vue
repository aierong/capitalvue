<!--
作者:chenghao
Date: 2019/8/20
Time: 22:44
功能:
-->

<!-- html代码片段 -->
<template>
    <div>
        <!--        style="z-index: 1999; position: fixed "
        style="z-index: 1999;position: fixed;"
        :fixed="fixed"
        -->
        <van-tabbar v-model="active"
                    @change="onchange"
                    active-color="#07c160">
            <van-tabbar-item icon="home-o">资产</van-tabbar-item>
            <van-tabbar-item icon="shrink">操作</van-tabbar-item>
            <van-tabbar-item icon="label-o">查询</van-tabbar-item>
            <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<!-- js脚本代码片段 -->
<script>
    import { mapMutations } from 'vuex'

    export default {
        name : "mytabbar" ,
        //数据模型
        data () {
            return {

                fixed : true ,

                active : 0 ,

            }
        } ,
        //方法
        methods : {
            ...mapMutations( [

                'SetRefreshContactsList'

            ] ) ,
            setupactive ( path ) {
                // console.log( 'mytabbar setupactive' )
                // console.log( path )

                if ( path == "/myindexpage" ) {
                    this.active = 0;

                    return;
                }
                else if ( path == '/cz' ) {
                    this.active = 1;

                    return;
                }
                else if ( path == '/querydata' ) {
                    this.active = 2;

                    return;
                }
                else if ( path == '/setupdata' ) {
                    this.active = 3;

                    return;
                }
                else {
                    this.active = 0;

                    return;
                }
            } ,
            onchange ( active ) {
                // active: 当前选中标签
                // console.log( 'mytabbar onchange' , active )

                if ( active == 0 ) {
                    // 页面跳转
                    this.$router.push( "/myindexpage" )
                }
                else if ( active == 1 ) {

                    this.$router.push( "/cz" );
                }
                else if ( active == 2 ) {
                    // this.SetRefreshContactsList( true );  //刷新列表

                    this.$router.push( "/querydata" );
                }
                else if ( active == 3 ) {
                    this.$router.push( "/setupdata" )
                }
                // else if ( active == 3 ) {
                //     this.$router.push( "/me" )
                // }
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
            // console.log( this.$route.path )

            let _path = this.$route.path;

            // console.log( '_path' , _path )

            // 这里设置一下，防止操作者 强制浏览器刷新,下面tabbar中图标不对应了
            this.setupactive( _path );
        } ,
        activated () {
            // console.log( 'mytabbar activated' )

            let _path = this.$route.path;

            this.setupactive( _path );
        } ,
    }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./mytabbar.css">
</style>
