function mergeSortedArray(a1, a2) {
    let result = [];
    let i=0, j=0, k=0;

    while(i < a1.length && j < a2.length ) {

        if(a1[i] < a2[j]){
            result[k++] = a1[i++]
        }  

    }

    let lastEl = undefined;
    for(let i=0; i < a1.length; i++) {
        
        for(let j=0; j < a2.length; j++) {

            if(a1[i] < a2[j]){
                lastEl = a1[i]
                result.push(a1[i])
                break;
            } else if (a2[j] > lastEl && a2[j] < a1[i+1]) {
                result.push(a2[j])
                break;
            }

        }

    }
console.log(result);
}

mergeSortedArray([1,3,5,7,9], [2,4,6,8,10])