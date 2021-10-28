function selectionSort(el) {
    for(let i=0; i< el.length; i++) {

        let leastElement = i;

        for(let j=i; j < el.length; j++) {
            if(el[j] < el[leastElement] ) {
                leastElement = j;
            }
        }

        if(leastElement != i) {
            let temp = el[leastElement];
            el[leastElement] = el[i];
            el[i] = temp;
        }
    }
    return el;
}


console.log(`Selection Sort : ${selectionSort([3,4,7,89,23,56,71,20, 1])}`)
