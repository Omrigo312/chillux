export class Vacation {
  public constructor(
    public id: number,
    public description: string,
    public destination: string,
    public imageUrl: string,
    public price: number,
    public followers: number,
    public startDate: Date,
    public endDate: Date
  ) {}
}
