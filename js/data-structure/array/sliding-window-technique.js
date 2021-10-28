/**
 * Two Pointer Technique is an optimization technique which cleary optimized the iteration by using
 * the start and end pointer values in an array
 * 
 * Searching a Pair in an Sorted Array
 */

function findSumMax(a, k) {
    let len = a.length;
    let max = 0

    for(let i=0; i< (len -k + 1); i++) {
        let currentSum = 0
        for(let j=0; j < k; j++) {
            currentSum =  currentSum  + a[i+j]
        }
        max = Math.max(max, currentSum)
    }
    return max
}

console.log(findSumMax([1,2,3,4,5,6,7,8,9], 4))

/**
 * Sliding Window technique is the optimization technique to move the array one by one like joint windows
 * @param {*} a 
 * @param {*} k 
 * @returns 
 */
function slidingWindowTechique(a, k) {

    let len = a.length;

    let maxSum = 0
    for(let i=0; i < k; i++) {
        maxSum += a[i]
    }
    let currentSum = maxSum
    for(let i=k; i < len; i++) {
        currentSum = currentSum + a[i] - a[i-k]
        maxSum = Math.max(maxSum, currentSum)
    }
    return maxSum
}

console.log(slidingWindowTechique([1, 4, 2, 10, 2, 3, 1, 0, 20 ], 4))