function search(arr, startIndex, endIndex, el) {
    console.log(`Search: ${startIndex} , ${endIndex} `);
    if(endIndex < startIndex) {
        return startIndex
    }
    
    const midPoint = Math.floor((startIndex + endIndex)/2);
    if(arr[midPoint] = el) {
        return midPoint;
    } else if (arr[midPoint] > el){
        console.log(`Search:Left: ${startIndex} , ${midPoint} `);
        return search(arr, startIndex, midPoint - 1, el);        
    } else {
        console.log(`Search:Right: ${midPoint + 1} , ${endIndex} `);
        return search(arr, midPoint + 1, endIndex, el);
    }
}

let data = [1,2,3,4,5,6,7,8];
let result = search(data, 0, data.length - 1, 4);

console.log(`Data : ${result}`);