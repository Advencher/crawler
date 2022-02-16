
 export default class InstructedScrabingInvoker {
  
    setCommand(command) { 
        this.command = command;
    }

    async execute() {
      await this.command.execute();
    }
}
  