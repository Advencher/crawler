import Command from '../Command.js';

export default class GetItemsCommand extends Command {

    constructor(receiver,selector) {
        super();
        this.receiver = receiver;
        this.selector = selector;
    }

    async execute() {
        this.receiver.scrabHTMLTableContent(this.selector);
    }

    // undo() {
    //     let command = this.commandStack.pop();
    //     this.current = command.undo(this.current, command.value);
    // }
}