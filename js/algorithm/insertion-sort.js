/*
BUBBLE SORT
    Repeatedly traverse, compare the consecutive elements, interchanges them when they are out of order
    Largest element sinks to the bottom and smallest floats to the top
 
(A is an array of elements, where N is the length of an array)
FOR I = 0 to N - 2
    FOR J = 0 to N - 2
        IF A[J] > A[J + 1]
            TEMP = A[J]
            A[J] = A[J + 1]
            A[J + 1] = A[J]
    END-FOR
END-FOR
*/
function bubbleSort(a) {
    const n = a.length;
    // Iteration of array till last before element 
    for (let i = 0; i < (n - 2); i++) {
        // Iteration of array till last before element 
        for (j = 0; j < (n - 2); j++) {
            if (a[j] > a[j + 1]) {
                //Swap the consecutive elements 
                let temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }
    return a;
}

/**
INSERTION SORT
(i.e) Sorting a hand of playing cards 
Traverse the list and insert each element in to the sorted part of an array

Pseudo Code
(A is an array of elements, where N is the length of an array)
FOR I = 0 to N - 1
    J = 1
    WHILE J > 0 AND A[J] < A[J - 1]
        TEMP = A[J]
        A[J] = A[J - 1]
        A[J - 1] = TEMP
    END-WHILE
END-FOR
*/
function insertionSort(a) {
    const n = a.length;
    // Iteration of array till last element 
    for (i = 0; i < n; i++) {
        let j = i;
        // Iterate over the sorted part of array and insert the element
        while (j >= 0 && a[j] < a[j - 1]) {
            let temp = a[j];
            a[j] = a[j - 1]
            a[j - 1] = temp;
            j--;
        }
    }
    return a;
}

/**
SELECTION SORT
Find the smallest element in the unsorted array and swap it with the first element

Pseudo Code

(A is an array of elements, where N is the length of an array)
For I = 0 to N-1 do:
    leastElementIndex = I
    For J = I + 1 to N-1 do:
        If A(J) < A(leastElementIndex)
        leastElementIndex = J
        End-If
    End-For
    Temp = A(I)
    A(I) = A(leastElementIndex)
    A(leastElementIndex) = Temp
End-For
 */
function selectionSort(a) {
    const n = a.length;
    // Iteration of array till last element 
    for (let i = 0; i < (n - 1); i++) {
        let leastElementIndex = i;
        for (let j = i + 1; j < (a.length - i); j++) {
            // Check for least element and override least element index
            if (a[j] < a[leastElementIndex]) {
                leastElementIndex = j;
            }
        }
        // Swap elements
        let temp = a[i];
        a[i] = a[leastElementIndex];
        a[leastElementIndex] = temp;
    }
    return a;
}

const data = [9,12,1,5,2,4,6,4,1,3,11,13];

console.log(`INSERTION-SORT : ${insertionSort([...data])}`);
console.log(`BUBBLE-SORT : ${bubbleSort([...data])}`);
console.log(`SELECTION-SORT : ${selectionSort([...data])}`);
