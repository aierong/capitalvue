/*
 作者: chenghao
 Date: 2019/8/27
 Time: 10:50
 功能: js脚本
 */

import * as  dlapi from '@/common/bmobapi/dl.js'
import * as util from '@/common/util/util.js'

export const capitalmix = {
    // 资产相关的方法

    //方法
    methods : {
        /**
         * 是已经出售的资产
         * @param capitalcode
         * @returns {Promise<boolean>}
         * @constructor
         */
        async IsSaleCapital ( capitalcode ) {
            var result = await dlapi.GetCapitalByCapitalCode( capitalcode );

            if ( result != null && result.legend > 0 ) {
                let _data = result[ 0 ];  //取第一个

                //capitalstatus  资产状态   (正常  报废  出售)

                if ( _data.capitalstatus != null && util.IsSale( _data.capitalstatus ) ) {
                    return true;
                }
            }

            return false;
        } ,
        /**
         * 是已经报废的资产
         * @param capitalcode
         * @returns {Promise<boolean>}
         * @constructor
         */
        async IsScrapCapital ( capitalcode ) {
            var result = await dlapi.GetCapitalByCapitalCode( capitalcode );

            if ( result != null && result.legend > 0 ) {
                let _data = result[ 0 ];  //取第一个

                //capitalstatus  资产状态   (正常  报废  出售)

                if ( _data.capitalstatus != null && util.IsScrap( _data.capitalstatus ) ) {
                    return true;
                }
            }

            return false;
        } ,
        /**
         * 是正常的资产
         * @param capitalcode
         * @returns {Promise<boolean>}
         * @constructor
         */
        async IsNormalCapital ( capitalcode ) {
            var result = await dlapi.GetCapitalByCapitalCode( capitalcode );

            if ( result != null && result.legend > 0 ) {
                let _data = result[ 0 ];  //取第一个

                //capitalstatus  资产状态   (正常  报废  出售)

                if ( _data.capitalstatus != null && util.IsNormal( _data.capitalstatus ) ) {
                    return true;
                }
            }

            return false;
        } ,

    }
}
