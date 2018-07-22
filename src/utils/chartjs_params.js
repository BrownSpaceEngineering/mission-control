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
    result.push({x: timestamps[i], y: values[i]});
  }

  return result;
}

export function dataLineOne(title, data) {
  return {
    label: title,
    fill: false,
    lineTension: 0.1,
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




