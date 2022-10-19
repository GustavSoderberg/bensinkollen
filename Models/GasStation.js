export const GasStation = (region, name, address, types, logo, lat, long) => { 
    return { 
        
        region: region,
        name: name, 
        address: address,
        types: types, 
        logo: logo,
        lat: lat,
        long: long 
    } 
}

    // //Template for GasStation obj
    // const gasStationTemplate = GasStation(
    //     "stockholmslan",             // Region
    //     "OKQ8",                      // Name
    //     "Huddinge Agestavagen 2",    // Address 
    //     [
    //         ["95", "diesel"],        //   Nested array
    //         ["22.12", "28.27"]       //   [["gas_type1", "gas_type2"], ["price_type1", "price_type2"]]
    //     ],
    //     null,                        // logo
    //     null,                        // lat
    //     null)                        // long
    
    //     //End of template