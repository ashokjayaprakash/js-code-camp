/**
 * Get String 
 * Split string
 * Iterate the string items
 * Initialize open item symbols
 * Push opening symbol to new array
 * Pop opening symbol when it has matching close symbol
 */

function patternMatch(data) {
    let el = data.split('');
    let result = true;
    let o = {
        '{': '}',
        '[': ']',
        '(': ')'
    };
    // ]}
    let stack = [];
    for (let i = 0; i < el.length; i++) {
        if (o[el[i]]) {
            stack.push(o[el[i]])
        } else {
            if (stack.pop() !== el[i]) return false;
        }
    }
    return result;
}

let result = patternMatch('[{[]()}]');
console.log(result);