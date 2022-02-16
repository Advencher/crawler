
export default class Command {
    constructor() {
        if (this.constructor.name === 'Command') {
            throw new Error(`${this.constructor.name}: can not create instance of interface`);
        }
    }

    execute() {
    }

    undo() {
    }
}
