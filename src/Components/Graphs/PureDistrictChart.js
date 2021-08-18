import React from 'react';
import ReactApexChart  from 'react-apexcharts'


function PureDistrictChart({chartDataForDist: {district, testedConfirmedChartData, recoveredChartData}}) {
  if(!district){
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div className='header'>
        <h5 className='title'>DISTRICT WISE BY STATE GROUPED</h5>
      </div>
      <ReactApexChart options={{
              chart: {
                type: 'bar',
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                  dataLabels: {
                    position: 'top',
                  },
                  barHeight: '70%'
                }
              },
              
              stroke: {
                show: true,
                width: 1,
                colors: ['#fff']
              },
              tooltip: {
                shared: true,
                intersect: false
              },
              xaxis: {
                categories: district,
              },
            }}
      series={[{
        name: 'Tested Confirmed',
        data: testedConfirmedChartData
      },
      {
        name: 'Recoverd',
        data: recoveredChartData
      }]} 
      type="bar" 
      width={'500'} 
      height={district.length > 10 ? 40*district.length: '500'}    
    />
  </>
  )
}

export default PureDistrictChart;
