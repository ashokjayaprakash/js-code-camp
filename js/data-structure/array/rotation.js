/** 
 * Array rotation O(n)
*/
function rotate(data, index) {
    let result = []
    let len = data.length
    for(let i=0; i < len; i++ ) {
        let elementIndex = (i + index) % len
        result.push(data[elementIndex])
    }
    return result
}
console.log(rotate([1,2,3,4,5,6,7,8], 2))


/**
 * To rotate array without using temporary variables
 * O (n * d)
 * @param {*} data 
 * @param {*} index 
 * @returns 
 */
function rotateOneByOne(data, index) {
    let len = data.length
    for(let i=0; i < index; i++ ) {
        data = cyclicRotation(data, len)
    }
    return data
}

/**
 * Rotate the array cylically
 * @param {*} a 
 * @param {*} len 
 * @returns 
 */
function cyclicRotation(a, len) {
    let temp = a[0]
    for(let i=1; i < len; i++ ) {
        a[i-1] = a[i]
    }
    a[len-1] = temp
    return a
}
console.log(rotateOneByOne([1,2,3,4,5,6,7,8], 2))


/***
 * Reversal Algorithm
 * Split the Array by rotation index and 
 * O(n)
 */

function reversalAlgortithm(data, r) {

    rotateByStartEnd(data, 0, r-1)
    rotateByStartEnd(data, r, data.length - 1)
    rotateByStartEnd(data, 0, data.length - 1)
    return data

} 

function rotateByStartEnd(a, start, end) {
    let temp
    while (start < end) {
        temp = a[start]
        a[start] = a[end]
        a[end] = temp
        start++
        end--        
    }
    return a;
}
console.log(reversalAlgortithm([1,2,3,4,5,6,7,8], 2))

/**
 * To count the array rotation 
 * @param {*} data 
 */
function countRotation(data) {
    for(let i=1; i < data.length; i++) {
        if(data[i-1] > data[i]) {
            return data.length - i
        }

    }
}
console.log(countRotation([3,4,5,6,7,8,1,2]))

/**
 * Reversal Algorithm - Rotate Right
 */
function rotateRightReversalAlgorithm(a, k) {
    let len = a.length;
    reverse(a, 0, len - k- 1)
    reverse(a, len - k, len -1)
    reverse(a, 0, len -1)
    return a
}
function reverse(a, start, end) {
    while(start < end) {
        let temp = a[start];
        a[start] = a[end]
        a[end] = temp
        start++
        end--
    }    
    return a
}
console.log(rotateRightReversalAlgorithm([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3))

/**
 * Array Reversal using recursion
 * @param {*} a 
 * @param {*} s 
 * @param {*} e 
 * @returns 
 */
function reverseRecursion(a, s, e) {
    if(s < e) {        
        let temp = a[s];
        a[s] = a[e]
        a[e] = temp
        s++
        e--
        return reverseRecursion(a, s, e)
    } 
    return a
}
console.log(reverseRecursion([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0,9))