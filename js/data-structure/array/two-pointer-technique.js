/**
 * Two Pointer Technique is an optimization technique which cleary optimized the iteration by using
 * the start and end pointer values in an array
 * 
 * Searching a Pair in an Sorted Array
 */

function findPair(data, k) {
    let len = data.length;
    let i =0;
    let j = len - 1

    while(i < j) {
        if(data[i] + data[j] == k) {
            return "PAIR"
        } else if(data[i] + data[j] < k) {
            i++
        } else {
            j--
        }
    }
    return "INVALID PAIR"
}

console.log(findPair([1,2,3,4,5,6,7,8,9], 22))