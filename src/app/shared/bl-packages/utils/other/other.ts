// tslint:disable:no-any
import extend from 'extend';

/**
 * Similar to `_.get`, get a safe value based on `path`
 * jsperf: https://jsperf.com/es-deep-getttps://jsperf.com/es-deep-get
 *
 * @param obj data source, returning `defaultValue` value directly if invalid
 * @param path Returns `defaultValue` if `null`, `[]`, undefined, and not found
 * @param defaultValue default value
 */
export function deepGet(obj: any, path: string | string[], defaultValue?: any): any {
  if (!obj || path === undefined || path.length === 0) {
    return defaultValue;
  }
  if (!Array.isArray(path)) {
    path = path.indexOf('.') ? path.split('.') : [path];
  }
  if (path.length === 1) {
    const checkObj: any = obj[path[0]];
    return typeof checkObj === 'undefined' ? defaultValue : checkObj;
  }
  return path.reduce((o: any, k: any) => (o || {})[k], obj) || defaultValue;
}

export function deepCopy(obj: any): any {
  const result: any = extend(true, {}, {_: obj});
  return result._;
}

/** Copy content to clipboard */
export function copy(value: string): Promise<string> {
  return new Promise<string>(
    (resolve: any, reject: any): void => {
      let copyTextArea: any = undefined as HTMLTextAreaElement;
      try {
        copyTextArea = document.createElement('textarea');
        copyTextArea.style.height = '0px';
        copyTextArea.style.opacity = '0';
        copyTextArea.style.width = '0px';
        document.body.appendChild(copyTextArea);
        copyTextArea.value = value;
        copyTextArea.select();
        document.execCommand('copy');
        resolve(value);
      } finally {
        if (copyTextArea && copyTextArea.parentNode) {
          copyTextArea.parentNode.removeChild(copyTextArea);
        }
      }
    },
  );
}

/**
 * merge deep key
 *
 * @param original
 * @param ingoreArray
 * @param objects
 */
export function deepMergeKey(original: any, ingoreArray: boolean, ...objects: any[]): any {
  if (Array.isArray(original) || typeof original !== 'object') {
    return original;
  }

  const isObject: any = (v: any) => typeof v === 'object' || typeof v === 'function';

  const merge: any = (target: any, obj: {}) => {
    Object.keys(obj)
      .filter((key: any) => key !== '__proto__' && Object.prototype.hasOwnProperty.call(obj, key))
      .forEach((key: any) => {
        const oldValue: any = obj[key];
        const newValue: any = target[key];
        if (!ingoreArray && Array.isArray(newValue)) {
          target[key] = [...newValue, ...oldValue];
        } else if (
          oldValue !== undefined &&
          isObject(oldValue) &&
          newValue !== undefined &&
          isObject(newValue)
        ) {
          target[key] = merge(newValue, oldValue);
        } else {
          target[key] = deepCopy(oldValue);
        }
      });
    return target;
  };

  objects.filter((v: any) => isObject(v)).forEach((v: any) => merge(original, v));

  return original;
}

/**
 * Deep merge
 *
 * @param original
 * @param objects
 */
export function deepMerge(original: any, ...objects: any[]): any {
  return deepMergeKey(original, false, ...objects);
}
