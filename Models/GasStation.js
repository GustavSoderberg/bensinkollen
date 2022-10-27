/**
 * 
 * GasStation
 * 
 * This is a model of a GasStation object
 * 
 * @authors
 * Hampus B
 * Karol Ö
 * Oscar K
 * Gustav S
 * 
 */

import uuid from 'react-native-uuid';

export const GasStation = (region, name, address, types, logo, lat, long) => { 
    return { 
        key: uuid.v4(),
        region: region,
        name: name, 
        address: address,
        types: types, 
        logo: logo,
        lat: lat,
        long: long 
    } 
}