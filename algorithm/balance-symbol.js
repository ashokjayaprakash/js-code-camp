/**
 * Check for balanced parentheses in an expression
 */

function checkBalancedParantheses(el) {
    let symbolDetail = {
        '{': '}',
        '[': ']',
        '(': ')'
    };

    let result = [];
    let finalResult = []

    for(let val of el) {
        if(symbolDetail[val]) {
            result.push(val);
            finalResult.push(val);
        } else {
            const lastEl = result.pop();
            if(symbolDetail[lastEl] == val){
                finalResult.push(val)
            } 
        }
    }
    console.log(result)

} 
checkBalancedParantheses("[[(){}]()]".split(''));