export default class User {
  public constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public type: string
  ) {}
}
