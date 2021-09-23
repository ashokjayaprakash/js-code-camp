/**
//low  --> Starting index,  high  --> Ending index
quickSort(arr[], low, high)
{
    if (low < high)
    {
        pi is partitioning index, arr[pi] is now at right place 
        pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);  // Before pi
        quickSort(arr, pi + 1, high); // After pi
    }
}

This function takes last element as pivot, places
   the pivot element at its correct position in sorted
    array, and places all smaller (smaller than pivot)
   to left of pivot and all greater elements to right
   {
       // pivot (Element to be placed at right position)
       pivot = arr[high];  
    
       i = (low - 1)  // Index of smaller element
   
       for (j = low; j <= high- 1; j++)
       {
           // If current element is smaller than or
           // equal to pivot
           if (arr[j] <= pivot)
           {
               i++;    // increment index of smaller element
               swap arr[i] and arr[j]
           }
       }
       swap arr[i + 1] and arr[high])
       return (i + 1)
   }


 */

function quickSort(a, l, h) {
    if(l < h) {
        console.log(`quickSort      (${a}, ${l}, ${h});`);
        let partitionIndex = partition(a, l, h);
        console.log(`quickSort:LB   (${a}, ${l}, ${partitionIndex -1});`);
        quickSort(a, l, partitionIndex -1);
        console.log(`quickSort:UB   (${a}, ${partitionIndex +1}, ${h});`);
        quickSort(a, partitionIndex + 1, h);
        return a;
    }
}

function partition(a, l, h) {
    let pivot = a[h];
    let i = l -1;

    for(j = l; j < h; j++) {
        if(a[j] <= pivot) {
            i++;
            let temp = a[i];
            a[i] = a[j];
            a[j] = temp;
        }
    }

    a[h] = a[i + 1];
    a[i + 1] = pivot; 

    return(i + 1);
}

console.log(quickSort([5,4,3,2,1], 0, 4));


