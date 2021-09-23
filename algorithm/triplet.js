function triplet(a, trip) {
    let tr = []
    let len = a.length;
    for(let i=0; i < len - 2; i++) {
        for(let j=i+1; j < len - 1; j++) {
            for(let k=j+1; k < len; k++) {
                if(a[i] + a[j] + a[k] == trip) {
                    tr.push(`${a[i]} , ${a[j]}, ${a[k]}`)
                }
            }
        }
    }
    return tr;
}

function sort(el) {
    let len = el.length;
    for(let i=0; i < len; i++) {
        let leastEl = i;
        for(let j=i; j < len; j++) {
            if(el[j] < el[leastEl]) {
                leastEl = j;
            }
        }
        if(leastEl != i) {
            let temp = el[leastEl];
            el[leastEl] = el[i];
            el[i] = temp;
        }
    }
    return el;
}

function sortTriplet(el, trip) {
    let sortedEl = sort(el);
    console.log(sortedEl)
    let len = el.length;
    let i= 2;
    let r = []
    while(i < len) {
        if(el[i] + el[i-1] + el[i-2] == trip) {
            result.push( [el[i] , el[i-1] , el[i-2]])
        }
        i++
    }

    return r;
}


console.log(sortTriplet([12, 3, 4, 1, 6, 9], 24))