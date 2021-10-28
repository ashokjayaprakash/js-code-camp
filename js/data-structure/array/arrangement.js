/** 
 * Array Arrangement
*/
function removeElementInArray(data, el) {
    let len = data.length
    let counter = 0
    for(let i=0; i<len; i++) {
        if(data[i] != el) {
            data[counter++] = data[i]
        }
    }

    while(counter < len) {
        data[counter++] = 0
    }

    return data
}
console.log(removeElementInArray([1,0,0,4,5,6,7,8], 0))
/**
 * Remove the elemenet in Array by Swapping
 * @param {*} data 
 * @param {*} el 
 * @returns 
 */
function removeElementBySwapping(data, el) {
    let len = data.length
    let counter = 0
    for(let i=0; i<len; i++) {
        if(data[i] != el) {
            let temp = data[counter]
            data[counter] = data[i]
            data[i] = temp
            counter++
        }
    }
    return data
}
console.log(removeElementBySwapping([1,0,0,4,5,6,7,8], 0))
