export default class User {
  public constructor(
    public id: number,
    public email: string,
    public type: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string
  ) {}
}
