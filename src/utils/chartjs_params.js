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






