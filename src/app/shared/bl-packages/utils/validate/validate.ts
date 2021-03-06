/** Whether it is a number */
export function isNum(value: string | number): boolean {
  return /^((-?\d+\.\d+)|(-?\d+)|(-?\.\d+))$/.test(value.toString());
}

/** Whether it is an integer */
export function isInt(value: string | number): boolean {
  // tslint:disable-next-line:triple-equals
  return isNum(value) && parseInt(value.toString(), 10) == value;
}

/** Whether it is a decimal */
export function isDecimal(value: string | number): boolean {
  return isNum(value) && !isInt(value);
}

/** Is it an ID card? */
export function isIdCard(value: string): boolean {
  return (
    typeof value === 'string' && /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(value)
  );
}

/** Whether it is a mobile phone number */
export function isMobile(value: string): boolean {
  return (
    typeof value === 'string' &&
    /^(0|\+?86|17951)?(13[0-9]|15[0-9]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(
      value,
    )
  );
}

/** Whether the URL address */
export function isUrl(url: string): boolean {
  return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(url);
}
