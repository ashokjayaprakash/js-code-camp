/**
 * Find the second minimum element of an array
 */

function getSecondLeastElement(el) {
    if(el.length < 2) throw (new Error("Invalid input array size"))

    let firstLeastEl, secondLeastElement = undefined;

    if(el[0] < el[1]) {
      firstLeastEl = el[0];
      secondLeastElement = el[1]  
    } else {
        firstLeastEl = el[1];
      secondLeastElement = el[0]  
    }

    for(let index = 2; index < el.length; index++) {
        if(el[index] < firstLeastEl) {
            secondLeastElement = firstLeastEl;
            firstLeastEl = el[index]
        } else if(el[index] < secondLeastElement) {
            secondLeastElement = el[index];
        }
    }
    return secondLeastElement;
}

let input = [3,4,5,6,1,67,89,12, 2];
let result = getSecondLeastElement(input);

console.log(result);