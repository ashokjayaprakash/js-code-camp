/**
 * To shuffle an array using Fishers-Yates shuffle algorithm
 * Complexity - O(n)
 * Iterate an array from last index  
 * Create random function 0 < r < n-1
 * Swap the index
 */

function fishersYatesShuffleAlgorithm(data) {
    const len = data.length - 1;
    for(i = len; i >= 0; --i) {
        const r = random(len, 2, i)
        swap(data, i, r)
    }
    return data
}

// Random function to generate random number
function random(len, multipler, i) {
    return (i*multipler) % len
}

function swap(data, i, r) {
    let temp = data[i]
    data[i] = data[r]
    data[r] = temp
}

console.log(fishersYatesShuffleAlgorithm([1,2,3,4,5,6,7,8,9]))