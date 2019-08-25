import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ACLCanType, ACLType } from './acl.type';

@Injectable({ providedIn: 'root' })

/**
 * Access Control Layer service
 */
export class ACLService {

  private roles: string[] = [];
  private abilities: (number | string)[] = [];
  private full: boolean = false;
  private aclChange: BehaviorSubject<ACLType | boolean> = new BehaviorSubject<ACLType | boolean>(false);

  /** ACL Change Notice */
  get change(): Observable<ACLType | boolean> {
    return this.aclChange.asObservable();
  }

  /** Get all data */
  get data(): { abilities: (number | string)[]; roles: string[]; full: boolean } {
    return {
      full: this.full,
      roles: this.roles,
      abilities: this.abilities,
    };
  }

  /**
   * Set current user role or permission capabilities (will clear all first)
   */
  set(value: ACLType): void {
    this.abilities = [];
    this.roles = [];
    this.add(value);
    this.aclChange.next(value);
  }

  /**
   * Identifies the current user as full, that is, unlimited
   */
  setFull(val: boolean): void {
    this.full = val;
    this.aclChange.next(val);
  }

  /**
   * Set current user permission capabilities (will clear all first)
   */
  setAbility(abilities: (number | string)[]): void {
    this.set({ ability: abilities } as ACLType);
  }

  /**
   * Set the current user role (will clear all first)
   */
  setRole(roles: string[]): void {
    this.set({ role: roles } as ACLType);
  }

  /**
   * Add role or permission to the current user
   */
  add(value: ACLType): void {
    if (value.role && value.role.length > 0) {
      this.roles.push(...value.role);
    }
    if (value.ability && value.ability.length > 0) {
      this.abilities.push(...value.ability);
    }
  }

  /**
   * Attach a role to the current user
   */
  attachRole(roles: string[]): void {
    for (const val of roles) {
      if (!this.roles.includes(val)) {
        this.roles.push(val);
      }
    }
    this.aclChange.next(this.data);
  }

  /**
   * Attach permissions to the current user
   */
  attachAbility(abilities: (number | string)[]): void {
    for (const val of abilities) {
      if (!this.abilities.includes(val)) {
        this.abilities.push(val);
      }
    }
    this.aclChange.next(this.data);
  }

  /**
   * Remove the role for the current user
   */
  removeRole(roles: string[]): void {
    for (const val of roles) {
      const idx: any = this.roles.indexOf(val);
      if (idx !== -1) {
        this.roles.splice(idx, 1);
      }
    }
    this.aclChange.next(this.data);
  }

  /**
   * Remove permissions for the current user
   */
  removeAbility(abilities: (number | string)[]): void {
    for (const val of abilities) {
      const idx: any = this.abilities.indexOf(val);
      if (idx !== -1) {
        this.abilities.splice(idx, 1);
      }
    }
    this.aclChange.next(this.data);
  }

  /**
   * Whether the current user has a corresponding role, in fact, `number` means Ability
   *
   * - Returns `true` when `full: true` or argument `null`
   * - If you use the `ACLType` parameter, you can specify the `mode` check mode.
   */
  can(roleOrAbility: ACLCanType): boolean {
    if (this.full === true || !roleOrAbility) {
      return true;
    }

    let t: ACLType = {};
    if (typeof roleOrAbility === 'number') {
      t = { ability: [roleOrAbility] };
    } else if (
      Array.isArray(roleOrAbility) &&
      roleOrAbility.length > 0 &&
      typeof roleOrAbility[0] === 'number'
    ) {
      t = { ability: roleOrAbility };
    } else {
      t = this.parseACLType(roleOrAbility);
    }

    if (t.role) {
      if (t.mode === 'allOf') {
        return t.role.every((v: any) => this.roles.includes(v));
      } else {
        return t.role.some((v: any) => this.roles.includes(v));
      }
    }
    if (t.ability) {
      if (t.mode === 'allOf') {
        // tslint:disable-next-line:no-any
        return (t.ability as any[]).every((v: any) => this.abilities.includes(v));
      } else {
        // tslint:disable-next-line:no-any
        return (t.ability as any[]).some((v: any) => this.abilities.includes(v));
      }
    }
    return false;
  }

  /** @inner */
  parseAbility(value: ACLCanType): ACLCanType {
    if (
      typeof value === 'number' ||
      typeof value === 'string' ||
      Array.isArray(value)
    ) {
      value = { ability: Array.isArray(value) ? value : [value] } as ACLType;
    }
    delete value.role;
    return value;
  }

  /**
   * Whether the current user has the corresponding permission point
   */
  canAbility(value: ACLCanType): boolean {
    return this.can(this.parseAbility(value));
  }

  /**
   * Parse the ACL type
   * @param val
   */
  private parseACLType(val: string | string[] | ACLType): ACLType {
    if (typeof val !== 'string' && !Array.isArray(val)) {
      return val as ACLType;
    }
    if (Array.isArray(val)) {
      return { role: val as string[] } as ACLType;
    }
    return {
      role: [val],
    } as ACLType;
  }
}
