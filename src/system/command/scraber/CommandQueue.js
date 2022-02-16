import Command from '../Command.js';

export default class CommandsQueue extends Command { 
    constructor(receiver, ...commands) { 
        super();
        this.commands = commands;
        this.receiver = receiver;
    }
    async execute() {
        for (let command of this.commands) {
            await command.execute(this.receiver);
            await this.sleep(1000);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    undo() {
     
        for (let command of this.commands) {
            command.undo(this.receiver);
        }
    }
}