/**
PSEUDO CODE

MERGE-SORT(A, p, r)
    If p < r
    q =  [ ( p + q ) /2 ]
    MERGE-SORT(A, p, q)
    MERGE-SORT(A, q+1, r)
    MERGE(A, p, q, r)

MERGE (A, p, q, r)
    n1 = q – p +1
    n2 = r – q
    let L [1.. n1 + 1 ] and L [1.. n2 + 1 ]  be new arrays
    for i=1 to  n1
    L[ i ]  =  A [ p + i -1]
    for j=1 to n2
    R[ j ]= A[ q + j ]
    L [n1 + 1 ] =  ∞
    R [n2 + 1 ] =  ∞
    i = 1
    j = 1
    for k = p to r
    if L[ i ] < R [ j ]
    A[ k ] = L[ i ]
    i = i + 1
    else  A[ k ] = R [ j ]
    j = j + 1
 */

let arr = [8,7,6,5,4,3,2,1]; // 45,36,78,32,12,5,1,2,3,4,5,6,7,49];

function mergeSort(a, l, r) {
    if(l < r) {
        let m = Math.floor((l + r) / 2);
        console.log(`mergeSort:L(${l}, ${m});`);
        mergeSort(a, l, m);
        console.log(`mergeSort:R(${m+1}, ${r});`);
        mergeSort(a, m + 1, r);
        console.log(`merge(${l}, ${m}, ${r});`);
        merge(a,l, m, r);
        return arr;
    }
}

function merge(a, l, m, r) {
    let leftBlock = [], rightBlock = [], n1, n2;
    n1 = (m - l) + 1;
    n2 = (r - m);
    
    for(let i =0; i < n1; ++i) {
        leftBlock[i] = a[ l + i];
    }

    for(let j =0; j < n2; ++j) {
        rightBlock[j] = a[m + j + 1];
    }
    
    let i = 0 ,j = 0;

    // Initial index of merged subarry array 
    let k = l; 

    while (i < n1 && j < n2) 
    { 
        if (leftBlock[i] <= rightBlock[j]) 
        { 
            a[k] = leftBlock[i]; 
            i++; 
        } 
        else
        { 
            a[k] = rightBlock[j]; 
            j++; 
        } 
        k++; 
    } 

    /* Copy remaining elements of L[] if any */
    while (i < n1) 
    { 
        a[k] = leftBlock[i]; 
        i++; 
        k++; 
    } 

    /* Copy remaining elements of R[] if any */
    while (j < n2) 
    { 
        a[k] = rightBlock[j]; 
        j++; 
        k++; 
    } 

    // for(let q=l; q <= r; q++) {
    //     if(rightBlock[j] == undefined || leftBlock[i] <= rightBlock[j]) {
    //         if(a[q] != leftBlock[i]) {
    //             a[q] = leftBlock[i];
    //             if(rightBlock[j] != undefined) {
    //                 a[q+1] = rightBlock[j];
    //             }                
    //         }
    //         i++
    //     } else {
    //         if(a[q] != rightBlock[j]) {
    //             a[q] = rightBlock[j];
    //             a[q+1] = leftBlock[i];
    //         }
    //         j++;
    //     }
    // }
}

let result = mergeSort(arr, 0, (arr.length - 1));
console.log(`Result ${ arr.length % 2 }: ${result}`);





