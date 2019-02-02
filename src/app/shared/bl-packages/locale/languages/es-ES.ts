import { LocaleData } from '../locale.types';

export default {
  abbr: 'es-ES',
  exception: {
    403: `Lo sentimos, no tienes acceso a esta página.`,
    404: `Lo sentimos, esa página no existe.`,
    500: `Lo sentimos, error del servidor`,
    backToHome: 'Volver al inicio',
  },
  noticeIcon: {
    emptyText: 'Sin datos',
    clearText: 'Limpiar',
  },
  reuseTab: {
    close: 'Cerrar pestaña',
    closeOther: 'Cerrar otras pestañas',
    closeRight: 'Cerrar pestañas a la derecha',
    clear: 'Cerrar todas las pestañas',
  },
  tagSelect: {
    expand: 'Expandir',
    collapse: 'Contraer',
  },
  miniProgress: {
    target: 'Objetivo: ',
  },
  st: {
    total: '{{range[0]}} - {{range[1]}} of {{total}}',
  },
  sf: {
    submit: 'Enviar',
    reset: 'Reestablecer',
    search: 'Buscar',
    edit: 'Guardar',
    addText: 'Agregar',
    removeText: 'Eliminar',
    checkAllText: 'Chequear todo',
  },
} as LocaleData;
