// Problem 1: Complete the secondLargest function which takes in an array of numbers in input and return the second biggest number in the array. (without using sort)?
function secondLargest(array) {
    let first = 0;
    let second = 0;
    for (let i = 0; i < array.length; i++ ) {
      if ( first < array[i]) {
        second=first;
        first=array[i];
        
      } else if (second < array[i]) {
        second = array[i];
      } else {
        continue;
      }
    }
    return second;
    // Write your code here
  }
  
  // Problem 2: Complete the calculateFrequency function that takes lowercase string as input and returns frequency of all english alphabet. (using only array, no in-built function)
  function calculateFrequency(string) {
    var  alpha = new Array();
    var count = new Array();
    for (let i=0; i<string.length ; i++) {
      if (string.charCodeAt(i)>96 && string.charCodeAt(i)<123) {
         if (alpha.includes(string.charAt(i))){
         var index=alpha.indexOf(string.charAt(i));
         count[index]+=1;
        } else {
        alpha.push(string.charAt(i));
        var b=alpha.length-1;
        count[b]=1;
      }
     }
    }
    var res = new Object();
    for (let j=0; j<alpha.length; j++){
      res[alpha[j]]=count[j]
    }
    console.log(res);
    return res;
  }
  // Problem 3: Complete the flatten function that takes a JS Object, returns a JS Object in flatten format (compressed)
  
        
     
  function flatten(unflatObject) {
     var res={};
      for (let i in unflatObject){ 
        if ((typeof unflatObject[i]) === 'object') {
              const temp = flatten(unflatObject[i]);
              for (const j in temp) {
                  res[i + '.' + j] = temp[j];
              }
          } else {
              res[i] = unflatObject[i];
          }
      }
      console.log(res)
      return res;
    // Write your code here
  }
  
  // Problem 4: Complete the unflatten function that takes a JS Object, returns a JS Object in unflatten format
  function unflatten(flatObject) {
      let result={}
      for (let i in flatObject) {
        let keys = i.split(".");
        keys.reduce((acc, value, index) => {
          return (
            acc[value] ||
            (acc[value] = isNaN(Number(keys[index + 1]))
              ? keys.length - 1 === index
                ? flatObject[i]
                : {}
              : [])
          );
        }, result);
      }
      return result;
    // Write your code here
  }
  