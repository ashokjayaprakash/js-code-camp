/**
 * a+ b = c + d 
 * 
 */

 function comparator(el) {
     let len = el.length;
     let result = [];
     let e = {};
     for(let i=0; i< len - 1; i++) {
        for(let j=i+1; j<len; j++) {
            let sum = el[i] + el[j];
            if(!e[sum]) {
                e[sum] = [el[i], el[j]];
            } else {
                result.push([ e[sum], [el[i] , el[j]] ])
            }
        }
     }
     return result;
 }

 console.log(comparator([65, 30, 7, 90, 1, 9, 8]))