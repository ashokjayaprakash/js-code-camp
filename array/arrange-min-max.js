/**
 * To arrange an array in min max value * 
 */

/**
 * Complexity: O(n/2)
 * Space: O(n) 
 */ 

function arrangeMinMax(data) {
    let result = []
    let len = data.length;
    let min =0;
    let max = len - 1
    let median = Math.floor(len / 2)

    for(let i=0; i<median; i++) {
        result.push(data[max--])
        result.push(data[min++])
    }

    if(len % 2 == 1) {
        result.push(data[median])
    }

    return result
}

console.log(arrangeMinMax([1,2,3,4,5,6,7,8,9]))