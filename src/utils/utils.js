const defineProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const getInputValue = (obj, e, key, isNumeric = false, isDate = false) => {
  let val = isNumeric ? parseInt(e.target.value || '0') : isDate ? e : e.target.value;
  let objectUpdated = { ...obj };

  const keys = key.split(".");
  if (keys.length > 1) {
    objectUpdated[keys[0]][keys[1]] = val;
  } else {
    objectUpdated[key] = val;
  }
  return objectUpdated;
}

const objIsNull = (obj) => {
  if(obj === null) return true;
  
  let numKeys = 0;
  let nullAttributes = 0;
  
  for (let key in obj) {
      numKeys++;
      if (obj[key] === null || obj[key] === "")
      nullAttributes++;
  }
  return numKeys === nullAttributes;
}

export {
  defineProps,
  getInputValue,
  objIsNull
}