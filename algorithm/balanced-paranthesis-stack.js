const { Stack } = require('./ds/stack')

function findBalancedParanthesis(data) {
    try {
        let paranthesis = data.split('')
        let sym = {
            '{': '}',
            '[': ']',
            '(': ')'
        };
        
        let stack = new Stack()
        for(let i of paranthesis) {
            if(sym[i]){
                stack.push(i)
            } else {
                const peek = stack.peek()
                if(sym[peek] == i) {
                    stack.pop()
                } else {
                    break;
                }
            }
        }            
        console.log((!stack.size) ? 'YES' : 'NO')
    } catch (error) {
        console.log(error);
    }
}

findBalancedParanthesis('({(})');