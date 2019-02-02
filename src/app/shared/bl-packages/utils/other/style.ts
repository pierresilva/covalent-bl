import { Renderer2 } from '@angular/core';

function removeClass(
  el: HTMLElement,
  classMap: object,
  renderer: Renderer2,
): void {
  // tslint:disable-next-line:forin
  for (const i in classMap) {
    renderer.removeClass(el, i);
  }
}

function addClass(
  el: HTMLElement,
  classMap: object,
  renderer: Renderer2,
): void {
  for (const i in classMap) {
    if (classMap[i]) {
      renderer.addClass(el, i);
    }
  }
}

/**
 * Update the host component style `class`, for example:
 *
 * ```ts
 * updateHostClass(
 *  this.el.nativeElement,
 *  this.renderer,
 *  {
 *    [ 'classname' ]: true,
 *    [ 'classname' ]: this.type === '1',
 *    [ this.cls ]: true,
 *    [ `a-${this.cls}` ]: true
 *  })
 * ```
 *
 * @param [cleanAll] Whether to clean all `class` values first, default: `false`
 */
export function updateHostClass(
  el: HTMLElement,
  renderer: Renderer2,
  classMap: object,
  cleanAll: boolean = false,
): void {
  if (cleanAll === true) {
    renderer.removeAttribute(el, 'class');
  } else {
    removeClass(el, classMap, renderer);
  }
  classMap = { ...classMap };
  addClass(el, classMap, renderer);
}
