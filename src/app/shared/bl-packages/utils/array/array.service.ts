// tslint:disable:no-any
import { Injectable } from '@angular/core';
// import { any } from 'ng-zorro-antd';
import { BlUtilConfig } from '../util.config';
import { ArrayConfig } from './array.config';

@Injectable({ providedIn: 'root' })
export class ArrayService {
  private c: ArrayConfig;
  constructor(cog: BlUtilConfig) {
    this.c = {
      deepMapName: 'deep',
      parentMapName: 'parent',
      idMapName: 'id',
      parentIdMapName: 'parent_id',
      childrenMapName: 'children',
      titleMapName: 'title',
      checkedMapName: 'checked',
      selectedMapName: 'selected',
      expandedMapName: 'expanded',
      disabledMapName: 'disabled',
      ...(cog && cog.array),
    };
  }
  /**
   * Convert tree structure to array structure
   */
  treeToArr(
    tree: any[],
    options?: {
      /** Depth item name, default: `'deep'` */
      deepMapName?: string;
      /** The parent data item name of the flat array, default: `'parent'` */
      parentMapName?: string;
      /** Source data subkey name, default: `'children'` */
      childrenMapName?: string;
      /** Whether to remove the `children` node, default: `true` */
      clearChildren?: boolean;
      /** Callback when converting to array structure */
      cb?: (item: any, parent: any, deep: number) => void;
    },
  ): any[] {
    options = {
      deepMapName: this.c.deepMapName,
      parentMapName: this.c.parentMapName,
      childrenMapName: this.c.childrenMapName,
      clearChildren: true,
      cb: null,
      ...options,
    };
    const result: any[] = [];
    const inFn = (list: any[], parent: any, deep: number) => {
      for (const i of list) {
        i[options.deepMapName] = deep;
        i[options.parentMapName] = parent;
        if (options.cb) { options.cb(i, parent, deep); }
        result.push(i);
        const children = i[options.childrenMapName];
        if (
          children != null &&
          Array.isArray(children) &&
          children.length > 0
        ) {
          inFn(children, i, deep + 1);
        }
        if (options.clearChildren) { delete i[options.childrenMapName]; }
      }
    };
    inFn(tree, 1, null);
    return result;
  }

  /**
   * Array into tree data
   */
  arrToTree(
    arr: any[],
    options?: {
      /** Number item name, default: `'id'` */
      idMapName?: string;
      /** Parent number item name, default: `'parent_id'` */
      parentIdMapName?: string;
      /** Child name, default: `'children'` */
      childrenMapName?: string;
      /** Callback when converting to tree data */
      cb?: (item: any) => void;
    },
  ): any[] {
    options = {
      idMapName: this.c.idMapName,
      parentIdMapName: this.c.parentIdMapName,
      childrenMapName: this.c.childrenMapName,
      cb: null,
      ...options,
    };
    const tree: any[] = [];
    const childrenOf = {};
    for (const item of arr) {
      const id = item[options.idMapName];
      const pid = item[options.parentIdMapName];
      childrenOf[id] = childrenOf[id] || [];
      item[options.childrenMapName] = childrenOf[id];
      if (options.cb) { options.cb(item); }
      if (pid) {
        childrenOf[pid] = childrenOf[pid] || [];
        childrenOf[pid].push(item);
      } else {
        tree.push(item);
      }
    }
    return tree;
  }

  /**
   * Convert the array to a `nbl-tree` data source, convert the item name with `options`, or use `options.cb`
   * to determine the data item more advanced.
   */
  arrToTreeNode(
    arr: any[],
    options?: {
      /** Number item name, default: `'id'` */
      idMapName?: string;
      /** Parent number item name, default: `'parent_id'` */
      parentIdMapName?: string;
      /** Title item name, default: `'title'` */
      titleMapName?: string;
      /** Set to the leaf node item name. If the data source does not exist, it will automatically
       * determine whether it is a leaf node according to the `children` value. Default: `'isLeaf'`
       */
      isLeafMapName?: string;
      /** Whether the node Checkbox selects the item name, default: `'checked'` */
      checkedMapName?: string;
      /** Whether the node itself selects the item name, default: `'selected'` */
      selectedMapName?: string;
      /** Whether the node expands (the leaf node is invalid) item name, default: `'expanded'` */
      expandedMapName?: string;
      /** Set whether to disable the node (no operation can be done) item name, default: `'disabled'` */
      disabledMapName?: string;
      /** Recursive callbacks executed after conversion to tree data */
      cb?: (item: any, parent: any, deep: number) => void;
    },
  ): any[] {
    options = {
      idMapName: this.c.idMapName,
      parentIdMapName: this.c.parentIdMapName,
      titleMapName: this.c.titleMapName,
      isLeafMapName: 'isLeaf',
      checkedMapName: this.c.checkedMapName,
      selectedMapName: this.c.selectedMapName,
      expandedMapName: this.c.expandedMapName,
      disabledMapName: this.c.disabledMapName,
      cb: null,
      ...options,
    };
    const tree = this.arrToTree(arr, {
      idMapName: options.idMapName,
      parentIdMapName: options.parentIdMapName,
      childrenMapName: 'children',
    });
    this.visitTree(tree, (item: any, parent: any, deep: number) => {
      item.key = item[options.idMapName];
      item.title = item[options.titleMapName];
      item.checked = item[options.checkedMapName];
      item.selected = item[options.selectedMapName];
      item.expanded = item[options.expandedMapName];
      item.disabled = item[options.disabledMapName];
      if (item[options.isLeafMapName] == null) {
        item.isLeaf = item.children.length === 0;
      } else {
        item.isLeaf = item[options.isLeafMapName];
      }
      if (options.cb) { options.cb(item, parent, deep); }
    });
    return tree.map((node: any[]) => new Array(node));
  }

  /**
   * Recursive access to the entire tree
   */
  visitTree(
    tree: any[],
    cb: (item: any, parent: any, deep: number) => void,
    options?: {
      /** Child name, default: `'children'` */
      childrenMapName?: string;
    },
  ): void {
    options = {
      childrenMapName: this.c.childrenMapName,
      ...options,
    };
    const inFn = (data: any[], parent: any, deep: number) => {
      for (const item of data) {
        cb(item, parent, deep);
        const childrenVal = item[options.childrenMapName];
        if (childrenVal && childrenVal.length > 0) {
          inFn(childrenVal, item, deep + 1);
        }
      }
    };
    inFn(tree, null, 1);
  }

  /**
   * Get all the selected `key` values
   */
  getKeysByTreeNode(
    tree: any[],
    options?: {
      /** Whether to include the value of the semi-selected state, the default: `true` */
      includeHalfChecked?: boolean;
      /** Whether to re-specify the `key` key name, if not specified to use the `any.key` value */
      keyMapName?: string;
      /** Callback, return a value of `key` value, higher priority than other */
      cb?: (item: any, parent: any, deep: number) => any;
    },
  ): any[] {
    options = {
      includeHalfChecked: true,
      ...options,
    };
    const keys: any[] = [];
    this.visitTree(
      tree,
      (item: any, parent: any, deep: number) => {
        if (item.isChecked || (options.includeHalfChecked && item.isHalfChecked)) {
          keys.push(
            options.cb ?
              options.cb(item, parent, deep) :
              options.keyMapName ? item.origin[options.keyMapName] : item.key,
          );
        }
      },
    );
    return keys;
  }
}
