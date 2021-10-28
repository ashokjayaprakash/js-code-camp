function getTotalX(a, b) {
    // Write your code here
    const el = a //[...a, ...b];
    const elLength = el.length;
    const result = [];
    for (let i = 0; i < b.length; i++) {
        let num = b[i]; 
        for (let j = 1; j <= num; j++) {
            const factorsForNum = []
            for (let k = 0; k < elLength; k++) {
                if (!(j % el[k])) { 
                    for (let l = 0; l < b.length; l++) {
                        if (!(b[l] % el[k])) { 
                            factorsForNum.push(el[k]);
                        }
                    }                    
                }                
            }
            if (factorsForNum.length == elLength) {
                result.push(j);
            }
        }
    }
    return result.length;
}

function getTotal(a, b) {
    const result = [];
    for (let i = 0; i < b.length; i++) {
        const factor = getFactorial(b[i], a, b);
        
        for(let el of factor) {
            if(result.indexOf(el) < 0) result.push(el);
        }
    }
    return result;
}


function getFactorial(num, a, b) {
    let result = []
    for(let i =1; i <= num; i++) {
        if(!(num % i) && isFactorOfA(i, a) && isFactorOfB(i, b)) result.push(i);
    }
    return result;
}

function isFactorOfA(num, el) {
    let result = [];
    for(let i=0; i < el.length; i++) {
        if(!(num % el[i])) result.push(el[i]);
    }
    return (result.length == el.length);
}

function isFactorOfB(num, el) {
    let result = [];
    for(let i=0; i < el.length; i++) {
        if(!(el[i] % num)) result.push(el[i]);
    }
    return (result.length == el.length);
}



// getTotalX([2,4], [16,32,96]);

console.log(getTotal([2,6], [24, 36]));
// console.log(isFactorOfA(6, [2,4]));

function record(el) {
    let hs, ls, best =0, least =0;

    for(let i =0; i < el.length; i++) {
        let currentEl = el[i]
        if(i ==0) {
            hs = currentEl;
            ls = currentEl;
        } else {
            let previousEl = el[i - 1];
            if(currentEl >= previousEl && currentEl > hs) {
                best++;
                hs = currentEl;
            } else if(currentEl <= previousEl && currentEl < ls) {
                least++;
                ls = previousEl;
            }
        }    
    }
    return [best, least];
}
console.log("Rec :", record([10, 10, 10, 10, 10, 10, 10, 10]));