export default class User {
  public constructor(
    public id: number,
    public email: string,
    public password: string,
    public type: string,
    public firstName?: string,
    public lastName?: string
  ) {}
}
