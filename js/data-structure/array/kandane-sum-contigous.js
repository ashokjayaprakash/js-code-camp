/**
 * Find sum of contigous array using Kandane algorithm
 * Search for maximum sum of sub array by companring the best sum with sub arrays
 * 
 */

function findSum(data, k) {
    let maxSum = 0, maxEnd = 0;
    for(let i of data) {
        maxEnd += i;
        if(maxEnd > maxSum) {
            maxSum = maxEnd
        } else if(maxEnd < 0) {
            maxEnd = 0
        }        
    }    
    return maxSum
}
/**
 -2  -3  4 -1 -2 1 5 -3 
maxEnd = 0  0   0   4 3  1  2 7 4
maxSum = 0  0   0   4 4  4  4 7 7
*/
console.log(findSum([-2,-3,4,-1,-2,1,5,-3]))