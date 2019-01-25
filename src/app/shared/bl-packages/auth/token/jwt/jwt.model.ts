import { ITokenModel } from '../interface';
import { urlBase64Decode } from './jwt.helper';

export class JWTTokenModel implements ITokenModel {
  // tslint:disable-next-line:no-any
  [key: string]: any;

  token: string;

  /**
   * Get load information
   */
  // tslint:disable-next-line:no-any
  get payload(): any {
    const parts = (this.token || '').split('.');
    if (parts.length !== 3) throw new Error('JWT must have 3 parts');

    const decoded = urlBase64Decode(parts[1]);
    return JSON.parse(decoded);
  }

  /**
   * Check if Token is expired, `payload` must be valid when it contains `exp`
   *
   * @param offsetSeconds Offset
   */
  isExpired(offsetSeconds: number = 0): boolean {
    const decoded = this.payload;
    if (!decoded.hasOwnProperty('exp')) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }
}
