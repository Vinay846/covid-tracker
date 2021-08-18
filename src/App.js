import React, { useState, useEffect, useCallback } from 'react';
import { PureChart, PureDistrictChart } from './Components/Graphs';
import styled from 'styled-components';

const StyledHeader = styled.header`
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;
  h2 {
    margin: 0;
  }
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: row;
`;

const StyledUL = styled.ul`
  list-style: none;
  /* border: 1px solid black; */
  width: 15%;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledChartDiv = styled.div`
  width: 40vw;
`;

const StyledULForSTAT = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  li fieldset {
    border: 1px solid #000;
    text-align: center;
  }
  
`;

function App() {
  const [currentDayData, setCurrentDayData] = useState({});
  const [chartDataForState, setChartDataForState] = useState({});
  const [isStateSelected, setIsStateSelected] = useState(false);
  const [chartDataForDist, setChartDataForDist] = useState({});
  const [allchecked, setAllchecked] = useState(true);

  const getTotalSelectedData = useCallback(
    () => {
      let selectedState = 0;
      const filterdata = currentDayData && Object.keys(currentDayData).reduce((res, data) => {
        if (currentDayData[data]['isSelected'] && data !== 'TT') {
          selectedState++;
          res['selectedState'] = selectedState;
          res['tested'] = res['tested'] === undefined ? currentDayData[data]['total']['tested'] : res['tested'] + currentDayData[data]['total']['tested'];
          res['confirmed'] = res['confirmed'] === undefined ? currentDayData[data]['total']['confirmed'] : res['confirmed'] + currentDayData[data]['total']['confirmed'];
          res['recovered'] = res['recovered'] === undefined ? currentDayData[data]['total']['recovered'] : res['recovered'] + currentDayData[data]['total']['recovered'];

          if (!res['testedConfirmedChartData'] || !res['recoveredChartData'] || !res['state']) {
            res['testedConfirmedChartData'] = [];
            res['recoveredChartData'] = [];
            res['state'] = [];
          }
          res['testedConfirmedChartData'].push(currentDayData[data]['total']['confirmed']);
          res['recoveredChartData'].push(currentDayData[data]['total']['recovered']);
          res['state'].push(getStateFullName(data));

        }
        return res;
      }, {});
      console.log(filterdata);
      setChartDataForState(filterdata)
    },
    [currentDayData],
  )


  const handleStateSelection = (idx) => {
    console.log(idx);
    if (!idx) return;
    if (idx.length === 0) {
      setIsStateSelected(false);
    } else {
      setIsStateSelected(true);
      const stateNames = getStateShortName(chartDataForState['state'][idx[0]]);
      let ListOfDist = currentDayData[stateNames];

      const fileterData = Object.keys(ListOfDist.districts).reduce((res, data) => {

        if (!res['testedConfirmedChartData'] || !res['recoveredChartData'] || !res['district']) {
          res['testedConfirmedChartData'] = [];
          res['recoveredChartData'] = [];
          res['district'] = [];
        }

        res['district'].push(data);
        res['testedConfirmedChartData'].push(ListOfDist.districts[data]['total']['confirmed'] || 0);
        res['recoveredChartData'].push(ListOfDist.districts[data]['total']['recovered'] || 0);
        return res;
      }, {})
      console.log(fileterData);
      setChartDataForDist(fileterData);
    }
  }


  const handleChecked = (e, state) => {
    let temp = currentDayData;
    temp[state]['isSelected'] = e.target.checked;
    setCurrentDayData(temp);
    getTotalSelectedData();
    setAllchecked(true);
  }

  const handleallCheck = (e) => {
    let temp = currentDayData;
    Object.keys(temp).map((data) => {
      console.log(temp[data]['isSelected']);
      return temp[data]['isSelected'] = e.target.checked;
    })
    setAllchecked(e.target.checked);
    setCurrentDayData(temp);
    getTotalSelectedData();
    console.log(e.target.checked);
  }

  const handleDate=(e)=>{
    console.log(e.target.value);
  }


  useEffect(() => {
    async function fetchData() {
      const data = await fetch('https://data.covid19india.org/v4/min/data.min.json');
      const resp = await data.json();
      Object.keys(resp).forEach(function (key, idx) {
        resp[key] = { ...resp[key], isSelected: true }
      })
      console.log(resp);
      setCurrentDayData(resp);
    }
    fetchData();
  }, [])

  useEffect(() => {
    getTotalSelectedData();
  }, [getTotalSelectedData])


  return (
    <>
      <StyledHeader>
        <h2>Covid Tracker</h2>
        <input type="date" value={getDate()} onChange={handleDate}/>
      </StyledHeader>
      <StyledMain>
        <StyledUL>
          <li>
            <input type="checkbox" checked={allchecked} name='SELECT_STATES' onChange={handleallCheck} />
            <label htmlFor='SELECT_STATES'>SELECT STATES</label>
          </li>
          {Object.keys(currentDayData).map((data, idx) => (
            data !== 'TT' && <li key={idx}>
              <input type="checkbox" checked={currentDayData[data]['isSelected']} name={data} onChange={(e) => handleChecked(e, data)} />
              <label htmlFor={data}>{data}</label>
            </li>
          ))}
        </StyledUL>
        <div>
          <div>
            <StyledULForSTAT>
              <li><fieldset><legend>SELECT STATES</legend>{chartDataForState.selectedState}</fieldset></li>
              <li><fieldset><legend>TESTED</legend>{chartDataForState.tested}</fieldset></li>
              <li><fieldset><legend>CONFIRMED</legend>{chartDataForState.confirmed}</fieldset></li>
              <li><fieldset><legend>RECOVERED</legend>{chartDataForState.recovered}</fieldset></li>
            </StyledULForSTAT>
          </div>
          {!allchecked ? 'No any state selected': <StyledDiv>
            <StyledChartDiv>
              <PureChart handleStateSelection={handleStateSelection} chartDataForState={chartDataForState} />
            </StyledChartDiv>
            <StyledChartDiv>
              {isStateSelected && <PureDistrictChart chartDataForDist={chartDataForDist} />}
            </StyledChartDiv>
          </StyledDiv>}
        </div>
      </StyledMain>
    </>
  );
}

export default App;



function getStateFullName(shortName) {
  if (shortName === 'AP') return 'Andhra Pradesh';
  if (shortName === 'AR') return 'Arunachal Pradesh';
  if (shortName === 'AS') return 'Assam';
  if (shortName === 'BR') return 'Bihar';
  if (shortName === 'CG') return 'Chhattisgarh';
  if (shortName === 'GA') return 'Goa';
  if (shortName === 'GJ') return 'Gujarat';
  if (shortName === 'HR') return 'Haryana';
  if (shortName === 'HP') return 'Himachal Pradesh';
  if (shortName === 'JK') return 'Jammu and Kashmir';
  if (shortName === 'JH') return 'Jharkhand';
  if (shortName === 'KA') return 'Karnataka';
  if (shortName === 'KL') return 'Kerala';
  if (shortName === 'MP') return 'Madhya Pradesh';
  if (shortName === 'MH') return 'Maharashtra';
  if (shortName === 'MN') return 'Manipur';
  if (shortName === 'ML') return 'Meghalaya';
  if (shortName === 'MZ') return 'Mizoram';
  if (shortName === 'NL') return 'Nagaland';
  if (shortName === 'OR') return 'Orissa';
  if (shortName === 'PB') return 'Punjab';
  if (shortName === 'RJ') return 'Rajasthan';
  if (shortName === 'SK') return 'Sikkim';
  if (shortName === 'TN') return 'Tamil Nadu';
  if (shortName === 'TR') return 'Tripura';
  if (shortName === 'TG') return 'Telangana';
  if (shortName === 'UK' || shortName === 'UT') return 'Uttarakhand';
  if (shortName === 'UP') return 'Uttar Pradesh';
  if (shortName === 'WB') return 'West Bengal';
  if (shortName === 'AN') return 'Andaman and Nicobar Islands';
  if (shortName === 'CH') return 'Chandigarh';
  if (shortName === 'CT') return 'Chhattisgarh';
  if (shortName === 'DH' || shortName === 'DN') return 'Dadra and Nagar Haveli';
  if (shortName === 'DD') return 'Daman and Diu';
  if (shortName === 'DL') return 'Delhi';
  if (shortName === 'LD') return 'Lakshadweep';
  if (shortName === 'PY') return 'Pondicherry';
  if (shortName === 'LA') return 'Ladakh';
}


function getStateShortName(shortName) {
  if (shortName === 'Andhra Pradesh') return 'AP';
  if (shortName === 'Arunachal Pradesh') return 'AR';
  if (shortName === 'Assam') return 'AS';
  if (shortName === 'Bihar') return 'BR';
  if (shortName === 'Chhattisgarh') return 'CG';
  if (shortName === 'Goa') return 'GA';
  if (shortName === 'Gujarat') return 'GJ';
  if (shortName === 'Haryana') return 'HR';
  if (shortName === 'Himachal Pradesh') return 'HP';
  if (shortName === 'Jammu and Kashmir') return 'JK';
  if (shortName === 'Jharkhand') return 'JH';
  if (shortName === 'Karnataka') return 'KA';
  if (shortName === 'Kerala') return 'KL';
  if (shortName === 'Madhya Pradesh') return 'MP';
  if (shortName === 'Maharashtra') return 'MH';
  if (shortName === 'Manipur') return 'MN';
  if (shortName === 'Meghalaya') return 'ML';
  if (shortName === 'Mizoram') return 'MZ';
  if (shortName === 'Nagaland') return 'NL';
  if (shortName === 'Orissa') return 'OR';
  if (shortName === 'Punjab') return 'PB';
  if (shortName === 'Rajasthan') return 'RJ';
  if (shortName === 'Sikkim') return 'SK';
  if (shortName === 'Tamil Nadu') return 'TN';
  if (shortName === 'Tripura') return 'TR';
  if (shortName === 'Telangana') return 'TG';
  if (shortName === 'Uttarakhand') return 'UT';
  if (shortName === 'Uttar Pradesh') return 'UP';
  if (shortName === 'West Bengal') return 'WB';
  if (shortName === 'Andaman and Nicobar Islands') return 'AN';
  if (shortName === 'Chandigarh') return 'CH';
  if (shortName === 'Chhattisgarh') return 'CT';
  if (shortName === 'Dadra and Nagar Haveli') return 'DN';
  if (shortName === 'Daman and Diu') return 'DD';
  if (shortName === 'Delhi') return 'DL';
  if (shortName === 'Lakshadweep') return 'LD';
  if (shortName === 'Pondicherry') return 'PY';
  if (shortName === 'Ladakh') return 'LA';
}


function getDate(){
  var today = new Date();
  return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)
}