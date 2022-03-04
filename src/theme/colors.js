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

const categoryColors = {
  'Math': 'red',
  'Memes': '#005EF3',
  'Programming': '#5F7ADB',
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

export {
  colors,
  getCategoryColors
}