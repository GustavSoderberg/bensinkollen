import uuid from 'react-native-uuid';

export const User = (lat, long) => { 
    return { 
        key: uuid.v4(),
        lat: lat, 
        long: long 
    } 
}