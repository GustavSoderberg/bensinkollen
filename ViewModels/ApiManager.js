import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


async function getBensinmack() {

    const data = await (await fetch('https://henrikhjelm.se/api/getdata.php?lan=stockholms-lan')).text()

    const sep = data.split(",");

    for (let i = 0; i < sep.length - 1; i++) {
        
        sep[i] = sep[i].replace(/["{}]/g, "");

        sep[i] = sep[i].split("_");

        // Merge Circle and K
        if (sep[i][1] == "Circle") {

            sep[i][1] = sep[i][1] + " " + sep[i][2];

            sep[i].splice(2, 1)
        }

        // Merge addresses
        for (let m = 3; m < sep[i].length; m++) {
            if (!sep[i][m].includes(":")) {
                sep[i][m] = sep[i][m-1] + " " + sep[i][m]
            }
        }
        // Remove duplicate addresses
        sep[i] = [sep[i][0], sep[i][1], sep[i][sep[i].length-2], sep[i][sep[i].length-1]]

        // Split type of gas and price
        const temp = sep[i][3].split(":");
        sep[i][3] = temp[0]
        sep[i].push(temp[1].trim())

        
        //filer:
        //etanol, diesel, 98, 95
        if (sep[i][3] == "etanol"){
            for (let l = 0; l < sep[i].length; l++) {
                console.log(sep[i][l]);
           }
           console.log("---------------------")
           console.log("*********************")
           console.log("---------------------")
        }

        //non filer aka all
        // for (let l = 0; l < sep[i].length; l++) {
        //      console.log(sep[i][l]);
        // }
        // console.log("---------------------")
        // console.log("*********************")
        // console.log("---------------------")

    }
    console.log(sep.length)

}

export { getBensinmack }