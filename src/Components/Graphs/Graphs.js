import React from 'react'

function Graphs({selectedData}) {

   console.log(selectedData);

    if(!selectedData){
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <div>
                <div>SELECTED STATE {selectedData.selectedState}</div>
                <div>TESTED {selectedData.tested}</div>
                <div>CONFIRMED {selectedData.confirmed}</div>
                <div>RECOVERED {selectedData.recovered}</div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Graphs


function getStateName(){
    if(shortName === 'AP') 'Andhra Pradesh';
    if(shortName === 'AR') 'Arunachal Pradesh';
    if(shortName === 'AS') 'Assam';
    if(shortName === 'BR') 'Bihar';
    if(shortName === 'CG') 'Chhattisgarh';
    if(shortName === 'GA') 'Goa';
    if(shortName === 'GJ') 'Gujarat';
    if(shortName === 'HR') 'Haryana';
    if(shortName === 'HP') 'Himachal Pradesh';
    if(shortName === 'JK') 'Jammu and Kashmir';
    if(shortName === 'JH') 'Jharkhand';
    if(shortName === 'KA') 'Karnataka';
    if(shortName === 'KL') 'Kerala';
    if(shortName === 'MP') 'Madhya Pradesh';
    if(shortName === 'MH') 'Maharashtra';
    if(shortName === 'MN') 'Manipur';
    if(shortName === 'ML') 'Meghalaya';
    if(shortName === 'MZ') 'Mizoram';
    if(shortName === 'NL') 'Nagaland';
    if(shortName === 'OR') 'Orissa';
    if(shortName === 'PB') 'Punjab';
    if(shortName === 'RJ') 'Rajasthan';
    if(shortName === 'SK') 'Sikkim';
    if(shortName === 'TN') 'Tamil Nadu';
    if(shortName === 'UK') 'Uttarakhand';
    if(shortName === 'UP') 'Uttar Pradesh';
    if(shortName === 'WB') 'West Bengal';
    if(shortName === 'AN') 'Andaman and Nicobar Islands';
    if(shortName === 'CH') 'Chandigarh';
    if(shortName === 'DH') 'Dadra and Nagar Haveli';
    if(shortName === 'DD') 'Daman and Diu';
    if(shortName === 'DL') 'Delhi';
    if(shortName === 'LD') 'Lakshadweep';
    if(shortName === 'Pondicherry') 'PY';
}