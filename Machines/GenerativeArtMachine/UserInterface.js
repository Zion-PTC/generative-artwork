import { Terminal } from '../Terminal.js';

export class UserInterface {
  constructor(name) {
    this.terminal = new Terminal(name);
  }
  async makeQuestion(question) {
    await this.terminal.makeQuestion(question);
  }
  async listenForAnswer() {
    await this.terminal.listenForAnswer();
  }
  sendMessage(data, key) {
    this.terminal.sendMessage(data, key);
    return this;
  }
}
