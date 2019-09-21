/*
 作者: chenghao
 功能:
 */

import * as types from '@/store/location/mutation-types.js'

export default {

    [ types.SET_LOCATION ] ( state , location ) {
        if ( location ) {
            state.location = location;
        }
        else {
            state.location = null;
        }
    } ,
    [ types.SET_ADDRESS ] ( state , address ) {
        if ( address ) {
            state.address = address;
        }
        else {
            state.address = '';
        }
    } ,

}
