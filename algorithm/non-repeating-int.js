/**
 * First non-repeating integers in an array
 */
function nonRepeatingInteger(el) {

    let intCounter = {};

    for(let e of el) {
        if(intCounter[e]) {
            intCounter[e]++ 
        } else {
            intCounter[e] = 1; 
        }
    }
    console.log(intCounter);
    for(let key in intCounter) {
        
        if(intCounter[key] == 1) {
            console.log(key)
        }
    }
}

nonRepeatingInteger([1,1,2,3,4,5,6,6,5,2,3,4]);