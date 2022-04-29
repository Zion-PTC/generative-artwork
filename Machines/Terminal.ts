import * as readline from 'node:readline';

type rlKey = readline.Key;
let obj: rlKey;

interface ITerminal {
  name: string;
  answer: string;
  interface: readline.Interface;
  line: string;
  makeQuestion(question: string): Promise<this>;
  makeQuestions(questions: string[]): Promise<this>;
  sendMessage(data: string | Buffer, key?: readline.Key): this;
  listenForAnswer(): Promise<this>;
  close(): this;
}

//@ts-expect-error
export class Terminal implements ITerminal {
  name: string;
  answer: string;
  interface: readline.Interface;
  line: string;
  constructor(name: string) {
    this.name = name;
    this.answer = 'No question was passed';
    this.interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
  async makeQuestion(question: string): Promise<this> {
    this.answer = '';
    let terminalInterface = async (question: string): Promise<string> => {
      return new Promise(async (res, rej) => {
        this.interface.question(question, (answer) => {
          res(answer);
        });
      });
    };
    this.answer = await terminalInterface(question);
    console.log(`Hi ${this.answer}!`);
    return this;
  }
  async listenForAnswer(): Promise<this> {
    this.line;
    let terminalInterface = async (): Promise<string> => {
      return new Promise(async (res, rej) => {
        this.interface.on('line', (line: string): void => {
          res(line);
        });
      });
    };
    this.line = await terminalInterface();
    return this;
  }
  sendMessage(data: string | Buffer, key?: readline.Key): this {
    this.interface.write(data, key);
    return this;
  }
  close(): this {
    this.interface.close();
    return this;
  }
}
