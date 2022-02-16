import Command from '../Command.js';

export default class ScraberCommand extends Command {

    constructor(receiver,selector) {
        super();
        this.receiver = receiver;
        this.selector = selector;
    }

    async execute() {
        this.receiver.clickButtonCommand(this.selector);
    }

    // undo() {
    //     let command = this.commandStack.pop();
    //     this.current = command.undo(this.current, command.value);
    // }

    getCurrentValue() {
        return this.current;
    }
}
