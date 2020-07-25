export default class Hoge {
  constructor(private message: string) {}

  public greeting(name: string): string {
    return `${name}さん ${this.message}`;
  }
}
console.log('test');
