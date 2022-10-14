import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


async function getBensinmack() {
    
    const data = await ( await fetch('https://henrikhjelm.se/api/getdata.php?lan=stockholms-lan')).text()

    const sep = data.split(",");

    

    for(let i=0; i < sep.length -1; i++) {

        sep[i] = sep[i].split("_");

        if(sep[i][1] == "Circle") {
            sep[i][1] = sep[i][1] + "_" + sep[i][2];

            const temp = [sep[i][0], sep[i][1], sep[i][3], sep[i][4], sep[i][5], sep[i][6]]
            sep[i] = temp;
        }

        
        for(let l = 0; l < sep[i].length; l++) {
            
            console.log(sep[i][l]);
        }
        
    }

 }
 export{getBensinmack}