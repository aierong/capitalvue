<template>
    <div id="app">
        <router-view/>
    </div>
</template>


<script>
    import { mapMutations } from 'vuex'

    export default {
        name : "App" ,
        //数据模型
        data () {
            return {
                msg : ''
            }
        } ,
        //方法
        methods : {
            ...mapMutations( [

                'SET_LOCATION' , 'SET_ADDRESS'

            ] ) ,
            getLocation () {
                const self = this;

                //api:https://lbs.amap.com/api/javascript-api/guide/services/geolocation  浏览器定位

                AMap.plugin( "AMap.Geolocation" , function () {
                    var geolocation = new AMap.Geolocation( {
                        // 是否使用高精度定位，默认：true
                        enableHighAccuracy : true ,
                        // 设置定位超时时间，默认：无穷大
                        timeout : 10000 ,

                        //下面的属性删除了，暂时没有用
                        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                        //buttonOffset: new AMap.Pixel(10, 20),
                        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                        //zoomToAccuracy: true,
                        //  定位按钮的排放位置,  RB表示右下
                        //buttonPosition: 'RB'
                    } );

                    geolocation.getCurrentPosition();
                    AMap.event.addListener( geolocation , "complete" , onComplete );
                    AMap.event.addListener( geolocation , "error" , onError );

                    function onComplete ( data ) {
                        // data是具体的定位信息  精准定位
                        console.log( '精准定位' );
                        console.log( data );

                        // self.$store.dispatch( "setLocation" , data );
                        self.SET_LOCATION( data );

                        // self.$store.dispatch( "setAddress" , data.formattedAddress );
                        self.SET_ADDRESS( data.formattedAddress );
                    }

                    function onError ( data ) {
                        // 定位出错    非精准定位
                        console.log( '非精准定位' )
                        console.log( data );
                        self.getLngLatLocation();
                    }
                } );
            } ,
            getLngLatLocation () {
                const self = this;
                //api:https://lbs.amap.com/api/javascript-api/guide/services/geolocation  IP定位获取当前城市信息
                AMap.plugin( "AMap.CitySearch" , function () {
                    var citySearch = new AMap.CitySearch();
                    citySearch.getLocalCity( function ( status , result ) {
                        if ( status === "complete" && result.info === "OK" ) {
                            // 查询成功，result即为当前所在城市信息
                            console.log( result );

                            //api:https://lbs.amap.com/api/javascript-api/guide/services/geocoder  逆向地理编码方法
                            AMap.plugin( "AMap.Geocoder" , function () {
                                var geocoder = new AMap.Geocoder( {
                                    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                                    city : result.adcode
                                } );

                                var lnglat = result.rectangle.split( ";" )[ 0 ].split( "," );

                                geocoder.getAddress( lnglat , function ( status , data ) {
                                    if ( status === "complete" && data.info === "OK" ) {
                                        // result为对应的地理位置详细信息
                                        // console.log(data);

                                        // self.$store.dispatch( "setLocation" , {
                                        //     addressComponent : {
                                        //         city : result.city ,
                                        //         province : result.province
                                        //     } ,
                                        //     formattedAddress : data.regeocode.formattedAddress
                                        // } );
                                        //
                                        // self.$store.dispatch(
                                        //     "setAddress" ,
                                        //     data.regeocode.formattedAddress
                                        // );

                                        self.SET_LOCATION( {
                                            addressComponent : {
                                                city : result.city ,
                                                province : result.province
                                            } ,
                                            formattedAddress : data.regeocode.formattedAddress
                                        } );

                                        self.SET_ADDRESS( data.regeocode.formattedAddress );
                                    }
                                } );
                            } );
                        }
                    } );
                } );
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
            this.getLocation();
        } ,
    }
</script>

<style>
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        background-color: #FAFAFA;

    }
</style>
