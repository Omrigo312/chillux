import { Color } from '@material-ui/lab';
import { v4 } from 'uuid';

export default class Alert {
  public constructor(
    public message: string | boolean,
    public severity: Color,
    public timeout: number,
    public id: string = v4()
  ) {}
}
