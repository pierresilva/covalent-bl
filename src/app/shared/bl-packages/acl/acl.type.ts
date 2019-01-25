// tslint:disable
export interface ACLType {
  /**
   * Role
   */
  role?: string[];

  /**
   * Ability
   */
  ability?: number[] | string[];

  /**
   * Verify mode, default: `oneOf`
   * - `allOf` indicates that all roles or permission point arrays must be valid
   * - `oneOf` means that only one of the roles or permission point arrays is valid.
   */
  mode?: 'allOf' | 'oneOf';

  // tslint:disable-next-line:no-any
  [key: string]: any;
}

export type ACLCanType = number | number[] | string | string[] | ACLType;
