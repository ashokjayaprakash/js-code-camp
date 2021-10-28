const {createInterface } = require("readline");
const { Commander, ExitProcess, CreateFile } = require('./Commander');



const cmd = createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("Available Commands: create <filename> <data> / exit / undo / redo / history");

cmd.on('line', (data) => {
    const [ command, ...content] = data.split(' ');
    const [filename, ...fileContent] = content
    const text = fileContent.join(' ');
    
    switch(command) {
        case "exit":
            Commander.run(new ExitProcess());
            break;
        case "create":
            Commander.run(new CreateFile(filename, text))
            break;
        case "redo":
            Commander.redo()
            break;
        case "undo":
            Commander.undo()
            break;
        case "history":
            Commander.history()
            break;
        default:
            console.log("Invalid command");
        
    }

    cmd.prompt();

})