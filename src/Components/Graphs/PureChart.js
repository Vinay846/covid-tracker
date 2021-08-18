import React from 'react';
import Chart from 'react-apexcharts'



function PureChart({handleStateSelection, chartDataForState: {state, testedConfirmedChartData, recoveredChartData}}) {

  if(!state){
    return <h1>Loading</h1>
  }

  return (
    <>
      <div className='header'>
        <h5 className='title'>STATE WISE</h5>
      </div>
      <Chart options={{
        colors : ['#ff0000', '#00ff00'],
        chart: {
          events: {
            dataPointSelection: (event, chartContext, config) => {
              console.log(config.selectedDataPoints[0]);
              handleStateSelection(config.selectedDataPoints[0]);
            }
          },
          stacked: true,
          type: 'bar',
        },
        
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '70%'
          },
        },

        xaxis: {
          categories: state
        }
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
      height={state.length > 10 ? 40*state.length: '500'}     
    />
  </>
  )
}

export default PureChart;
