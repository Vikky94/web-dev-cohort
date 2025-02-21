function getNestedValue(obj, keyPath) {
  const splitAry = keyPath.split(".");
  let newObj = {};
  // console.log(obj[splitAry[0]])
  for (let i = 0; i < splitAry.length; i++) {

    if (i === 0) {
      if (obj[splitAry[i]]) {
        newObj = obj[splitAry[i]];
      } else return "Key not found";

    } else {
      if (newObj[splitAry[i]]) {
        newObj = newObj[splitAry[i]];
      }
      else return "Key not found";
    }
  }

  return newObj;
}

const obj = {
  a: {
    b: {
      c: 1
    }
  }
};

getNestedValue(obj, "a.b.c")
