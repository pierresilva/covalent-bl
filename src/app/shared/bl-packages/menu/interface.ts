export interface MenuIcon {
  type: 'class' | 'icon' | 'img';
  /** valor, que incluye: nombre de clase, icono `tipo`, imagen * /
  value: string;
  /** Estilo del tema del icono, por defecto: `outline` * /
  theme?: 'outline' | 'twotone' | 'fill';
  /** ¿Hay una animación de rotación, por defecto: `falso` */
  spin?: boolean;
  /** Solo para los iconos de dos colores, establezca el color principal del icono de dos colores, solo para el icono actual */
  twoToneColor?: string;
  /** Especifique el tipo de icono de IconFont */
  iconfont?: string;
}

export interface Menu {
  // tslint:disable-next-line:no-any
  [key: string]: any;
  /** Texto */
  text: string;
  /** i18n clave primaria*/
  i18n?: string;
  /** Ya sea para mostrar el nombre del grupo, por defecto: `true` */
  group?: boolean;
  /** Enrutamiento */
  link?: string;
  /**
   * @deprecated
   * Si la ruta coincide exactamente, por defecto：`false`，see:
   * - [RouterLinkActive](https://angular.io/api/router/RouterLinkActive#routerLinkActiveOptions)
   */
  linkExact?: boolean;
  /** Enlace externo */
  externalLink?: string;
  /** 链接 target */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Icono */
  icon?: string | MenuIcon;
  /** Número de logos, números mostrados. (Nota: `group: true` no es válido) */
  badge?: number;
  /** Número de logos, mostrando pequeños puntos rojos. */
  badgeDot?: boolean;
  /** Color de la insignia del logotipo (predeterminado: error) */
  badgeStatus?: string;
  /** Si deshabilitar */
  disabled?: boolean;
  /** Ya sea para ocultar el menú */
  hide?: boolean;
  /** Ocultar migas de pan, que es válido cuando el componente `page-header` genera automáticamente migas de pan*/
  hideInBreadcrumb?: boolean;
  /** Configuración de ACL, si es automáticamente válida al importar `bl-packages/acl`, es equivalente a
   * `ACLService.can (roleOrAbility: ACLCanType)` valor del parámetro */
  // tslint:disable-next-line:no-any
  acl?: any;
  /** Si el elemento del menú de acceso directo */
  shortcut?: boolean;
  /** Nodo raíz del menú de acceso directo */
  shortcutRoot?: boolean;
  /** Ya sea para permitir la reutilización, es necesario cooperar con el componente `reuse-tab`*/
  reuse?: boolean;
  /** Menú secundario */
  children?: Menu[];
}
