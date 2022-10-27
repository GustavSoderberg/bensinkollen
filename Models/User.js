/**
 * 
 * User
 * 
 * This is a model of a User object
 * 
 * @authors
 * Hampus B
 * Karol Ö
 * Oscar K
 * Gustav S
 * 
 */

import uuid from 'react-native-uuid';

export const User = (lat, long) => { 
    return { 
        key: uuid.v4(),
        lat: lat, 
        long: long 
    } 
}