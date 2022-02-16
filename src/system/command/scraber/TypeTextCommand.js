import Command from '../Command.js';

export default class TypeTextCommand extends Command {

    constructor(receiver, selector, text) {
        super();
        this.receiver = receiver;
        this.selector = selector;
        this.text = text;
    
    }

    async execute() {
        this.receiver.inputTextCommand(this.selector, this.text);
    }

    // undo() {
    //     let command = this.commandStack.pop();
    //     this.current = command.undo(this.current, command.value);
    // }

    getCurrentValue() {
        return this.current;
    }
}