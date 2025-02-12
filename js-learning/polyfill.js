const ary = [1, 2, 3];
/* start Polyfill function for myPush functions */
if (!Array.prototype.myPush) {
  Array.prototype.myPush = function (newItem) {
    this[this.length] = newItem;
    return this.length;
  };
}
ary.myPush(4);
console.log(ary);
/* end Polyfill function for myPush functions */

/* start Polyfill function for unShift functions */
//add the new item in front of the array
// returns the new length

if (!Array.prototype.unShift) {
  Array.prototype.unShift = function (newItem) {
    let previousValue, currentVal;
    var index;
    for (index = 0; index < this.length; index++) {
      if (index === 0) {
        previousValue = this[index];
        this[index] = newItem;
      } else {
        currentVal = this[index];
        this[index] = previousValue;
        previousValue = currentVal;
      }
    }
    this[this.length] = previousValue;
    return this.length;
  };
}

ary.unShift(5);
console.log(ary);
/* end Polyfill function for unShift functions */

/*Start for myShipt Polyfill function*/
//removes the first element of the array
//returns the removed element

if (!Array.prototype.myShift) {
  Array.prototype.myShift = function () {
    if (this.length) {
      const val = this[0];
      for (let index = 0; index < this.length; index++) {
        this[index] = this[index + 1];
      }
      this.length = this.length - 1;
      return val;
    } else return undefined;
  };
}
ary.myShift();
console.log(ary);
/*End for myShipt Polyfill function*/

/*Start for myMap Polyfill function*/
if( !Array.prototype.myMap ){

// map() creates a new array from calling a function for every array element.
// map() does not execute the function for empty elements.
// map() does not change the original array.

    Array.prototype.myMap = function(userFn){
        const newAry = [];
        for (let index = 0; index < this.length; index++) {
            const element = this[index];
            if( element ){
                newAry.myPush(userFn(element, index));
            }   
        }
        return newAry;
    }
}

const newAry = ary.myMap(function(val){
    return val*2;
});
console.log(newAry);
/*End for myMap Polyfill function*/



/*Start for myEvery Polyfill function*/
if( !Array.prototype.myEvery ){
    Array.prototype.myEvery = function(userFn){
        let flag = true;
        for (let index = 0; index < this.length; index++) {
            const element = this[index];
            if( !userFn(element, index, this) ){
                flag = false;
                break;
            }
        }
        return flag;        
    }
}

console.log(ary);
console.log(ary.every(ele => { return ele < 5 }));
console.log(ary.myEvery(ele => { return ele < 5 }));
/*End for myEvery Polyfill function*/


/*Start for myFill Polyfill function*/
//method::Signature
// fill(value)
// fill(value, start)
// fill(value, start, end)

if( !Array.prototype.myFill ){
    Array.prototype.myFill = function(...params){
        const [value, start, end] = [...params];
        if(value !== undefined && start && end){
            for (let index = 0; index < end; index++) {
                const element = this[index];
                if( index >=  start){
                    this[index] = value;
                }else{
                    this[index] = element;
                }
            }    
        }

        return this;
    }
}
let array1 = [1, 2, 3, 4];
// Fill with 0 from position 2 until position 4
array1.myFill(66, 2, 4);
console.log(array1);
/*End for myFill Polyfill function*/

