const colors = {
  'PRIMARY': '#0E0E10',
  'PRIMARYLIGHT': '#1B2223',
  'SECONDARY': '#626667',
  'BLUE': '#005EF3',
  'BLUELIGHT': '#79F2EC',
  'PURPLE': '#5F7ADB',
  'PURPLELIGHT': '#A2B2EE',
  'WHITE': '#F4FEFD'
}

const getCategoryColors = (category) => {
  switch(category) {
    case 'Math': 
      return 'red';
    case 'Memes': 
      return '#005EF3';
    case 'Programming': 
      return '#5F7ADB';
    default:
      return '#1B2223'; 
  }
}

const getNotificationColor = (sev) => {
  switch(sev) {
    case 'ERROR': 
      return 'error';
    case 'WARNING': 
      return 'warning';
    case 'INFO': 
      return'info';
    case 'SUCCESS': 
      return 'success';
    default: 
      return 'info';
  }
}

export {
  colors,
  getCategoryColors,
  getNotificationColor
}