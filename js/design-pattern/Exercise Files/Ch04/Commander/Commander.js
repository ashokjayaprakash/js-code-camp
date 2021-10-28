const { writeFile, unlink} = require('fs');

class Commander {

    constructor() {
        this.historyList = [];
        this.undoHistory = [];
    }

    
    run(command) {
        this.historyList.push(command);
        command.execute();        
    }

    undo() {
        const command = this.historyList.pop();
        this.undoHistory.push(command);
        command.undo();
    }

    redo() {
        const command = this.undoHistory.pop();
        this.historyList.push(command);
        command.execute();
    }

    history() {
        this.historyList.forEach(element => {
            console.log(`${element.name}`);
        });
    }
}

class ExitProcess {

    get name() {
        return "exit"
    }

    execute() {
        console.log("execute: delete command");
        process.exit(0);
    }
}

class CreateFile {

    constructor(name, content) {
        this.fileName = name;
        this.content = content;
    }

    get name() {
        return `create ${this.fileName} ${this.content}`;
    }

    execute() {
        writeFile(this.fileName, this.content, () => {})
    }

    undo() {
        unlink(this.fileName, () => {})
    }
}

module.exports = { ExitProcess, CreateFile, Commander: new Commander() };