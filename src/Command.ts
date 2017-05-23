export class Command {
    Name: string
    Args: string

    constructor(spaceDelimitedString: string) {
        this.parse(spaceDelimitedString);
    }

    parse(text: string) {
        this.Name = text.substring(0, text.indexOf(' '));
        this.Args = text.substring(text.indexOf(' ') + 1)
        if (text.indexOf(' ') === -1) {
            console.log('no args'); 
            // therefore the arg was the command
            this.Name = this.Args;
            this.Args = '';
        }
        
        console.log(`text: ${text} \n command: ${this.Name} \n args: ${this.Args}`);
    }
}