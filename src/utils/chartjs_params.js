import moment from 'moment';

export function opt_L_BATTERY(percentage) {
  return {
    cutoutPercentage: 80,
    elements: {
      center: {
        text: `${percentage}%`,
        color: 'rgb(75, 192, 192)',
        fontStyle: 'Helvetica',
        sidePadding: 30
      }
    },
    legend: {
      display: false
    }
  };
}

export function data_L_BATTERY(percentage) {
  return {
      datasets: [{
          data: [percentage, 100 - percentage],
          backgroundColor: [
              'rgba(75, 192, 192, 1)',
              'rgb(100, 100, 100)',
          ],
          borderColor: [
              'rgb(37, 40, 48)',
              'rgb(37, 40, 48)',
          ],
          borderWidth: [5, 5]
      }],
      labels: ['Charged', 'Not charged']
  };
}

export function opt_LF_BATTERY(percentage) {
  return {
    maintainAspectRatio: false,
    cutoutPercentage: 80,
    legend: {display: false},
    elements: {
      center: {
        text: `${percentage}%`,
        color: 'rgb(75, 192, 192)',
        fontStyle: 'Helvetica',
        sidePadding: 30
      }
    },
  };
}

function zipTimestampAndValue(data) {
  const result = [];
  const timestamps = data.timestamps;
  const values = data.values;

  for (let i = 0; i < timestamps.length; i++) {
    // result.push({x: moment(timestamps[i]).format("MM/DD/YY, HH:mm:ss.SSS"), y: values[i]});
    result.push({x: timestamps[i], y: values[i]});
    // result.push({x: timestamps[i], y: values[i]});
  }

  return result;
}

export function dataLineOne(title, data) {
  return {
    label: title,
    fill: false,
    lineTension: 0.1,
    yAxisID: 'y-axis-1',
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: 'rgba(75,192,192,1)',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: zipTimestampAndValue(data)
  };
}

export function dataLineTwo(title, data) {
  return {
    label: title,
    fill: false,
    lineTension: 0.1,
    yAxisID: 'y-axis-2',
    backgroundColor: 'rgba(255, 99, 132,0.4)',
    borderColor: 'rgba(255, 99, 132,1)',
    borderCapStyle: 'butt',
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(255, 99, 132,1)',
    pointBackgroundColor: 'rgba(255, 99, 132,1)',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(255, 99, 132,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: zipTimestampAndValue(data)
  };
}

export function dataLineThree(title, data) {
  return {
    label: title,
    fill: false,
    lineTension: 0.1,
    yAxisID: 'y-axis-3',
    backgroundColor: 'rgba(255, 206, 86, 0.4)',
    borderColor: 'rgba(255, 206, 86, 1)',
    borderCapStyle: 'butt',
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(255, 206, 86, 1)',
    pointBackgroundColor: 'rgba(255, 206, 86, 1)',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(255, 206, 86, 1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: zipTimestampAndValue(data)
  };
}

export function dataLineFour(title, data) {
  return {
    label: title,
    fill: false,
    lineTension: 0.1,
    yAxisID: 'y-axis-4',
    backgroundColor: 'rgba(40, 205, 152,0.4)',
    borderColor: 'rgba(40, 205, 152,1)',
    borderCapStyle: 'butt',
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(40, 205, 152,1)',
    pointBackgroundColor: 'rgba(40, 205, 152,1)',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(40, 205, 152,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: zipTimestampAndValue(data)
  };
}

export function historicalOptions(opt1, opt2, opt3, opt4) {
  return {
    scales: {
      xAxes: [{
          // display: opt1 || opt2 || opt3 || opt4,
          title: "time",
          type: 'time',
          gridLines: {
              lineWidth: 2
          },
          time: {
              displayFormats: {
                  millisecond: 'MMM DD hh:mm:ss',
                  second: 'MMM DD hh:mm:ss',
                  minute: 'MMM DD hh:mm:ss',
                  hour: 'MMM DD hh:mm:ss',
                  day: 'MMM DD hh:mm:ss',
                  week: 'MMM DD hh:mm:ss',
                  month: 'MMM DD hh:mm:ss',
                  quarter: 'MMM DD hh:mm:ss',
                  year: 'MMM DD hh:mm:ss',
              }
          }
      }],
      yAxes: [
        {
          type: 'linear',
          display: opt1,
          position: 'left',
          id: 'y-axis-1',
          title: 'abc',
          scaleLabel: {
              display: true,
              labelString: opt1,
              fontColor: 'rgba(75,192,192,1)',
              padding: {
                top: 10,
              },
          },
        },
        {
          type: 'linear',
          display: opt2,
          position: 'right',
          id: 'y-axis-2',
          scaleLabel: {
              display: true,
              labelString: opt2,
              fontColor: 'rgba(255, 99, 132,1)',
              padding: {
                top: 10,
              },
          },
        },
              {
          type: 'linear',
          display: opt3,
          position: 'left',
          id: 'y-axis-3',
          scaleLabel: {
              display: true,
              labelString: opt3,
              fontColor: 'rgba(255, 206, 86, 1)',
              padding: {
                top: 10,
              },
          },
        },
              {
          type: 'linear',
          display: opt4,
          position: 'right',
          id: 'y-axis-4',
          scaleLabel: {
              display: true,
              labelString: opt4,
              fontColor: 'rgba(40, 205, 152,1)',
              padding: {
                top: 10,
              },
          },
        },
      ]
    }
  };
}


export const unitMappings = {
  "L1_REF": "mV",
  "L2_REF": "mV",
  "LREF_AVG": "mV",
  "L1_SNS": "mA",
  "L2_SNS": "mA",
  "PANELREF": "mV",
  "L_REF": "mV",
  "LF1REF": "mV",
  "LF2REF": "mV",
  "LF3REF": "mV",
  "LF4REF": "mV",
  "LFREF_AVG": "mV",
  "LFB1SNS": "mA",
  "LFB1OSNS": "mA",
  "LFB2SNS": "mA",
  "LFB2OSNS": "mA",
  "LFBSNS_AVG": "mA",
  "LED1SNS": "mA",
  "LED2SNS": "mA",
  "LED3SNS": "mA",
  "LED4SNS": "mA",
  "LEDSNS_AVG": "mA",
  "RAD_TEMP": "C",
  "IMU_TEMP": "C",
  "IR_FLASH_AMB": "C",
  "IR_SIDE1_AMB": "C",
  "IR_SIDE2_AMB": "C",
  "IR_RBF_AMB": "C",
  "IR_ACCESS_AMB": "C",
  "IR_TOP1_AMB": "C",
  "IR_AMB_AVG": "C",
  "IR_FLASH_OBJ": "C",
  "IR_SIDE1_OBJ": "C",
  "IR_SIDE2_OBJ": "C",
  "IR_RBF_OBJ": "C",
  "IR_ACCESS_OBJ": "C",
  "IR_TOP1_OBJ": "C",
  "LED1TEMP": "C",
  "LED2TEMP": "C",
  "LED3TEMP": "C",
  "LED4TEMP": "C",
  "LEDTEMP_AVG": "C",
  "L1_TEMP": "C",
  "L2_TEMP": "C",
  "LF1_TEMP": "C",
  "LF3_TEMP": "C",
  "LTEMP_AVG": "C",
  "PD_TOP1": "b",
  "PD_SIDE1": "b",
  "PD_SIDE2": "b",
  "PD_FLASH": "b",
  "PD_ACCESS ": "b",
  "PD_RBF": "binary",
  "PROG_MEM_REWRITTEN":"binary",
  "L2_FAULTN":"binary",
  "LF_B1_FAULTN":"binary",
  "LF_B1_CHGN":"binary",
  "FIRST_FLASH":"binary",
  "gyroscopeX":"deg/s",
  "gyroscopeZ":"deg/s",
  "gyroscopeY":"deg/s",
  "timestamp":"s",
  "LF_B2_CHGN":"binary",
  "L1_FAULTN":"binary",
  "LION_2_CHARGED":"binary",
  "L1_ST":"binary",
  "accelerometer2Z":"g",
  "accelerometer2X":"g",
  "accelerometer2Y":"g",
  "magnetometer2X":"G",
  "magnetometer2Y":"G",
  "magnetometer2Z":"G",
  "L2_CHGN":"binary",
  "L2_ST":"binary",
  "ANTENNA_DEPLOYED":"binary",
  "L1_CHGN":"binary",
  "LION_1_CHARGED":"binary",
  "LF_B2_FAULTN":"binary",
  "LIFEPO4_B1_CHARGED":"binary",
  "LIFEPO4_B2_CHARGED":"binary"
}
