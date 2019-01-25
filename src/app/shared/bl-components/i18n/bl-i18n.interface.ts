export interface BlPaginationI18nInterface {
  items_per_page: string;
  jump_to: string;
  jump_to_confirm: string;
  page: string;

  // Pagination.jsx
  prev_page: string;
  next_page: string;
  prev_5: string;
  next_5: string;
  prev_3: string;
  next_3: string;
}

export interface BlDatePickerI18nInterface {
  lang: BlDatePickerLangI18nInterface;
  timePickerLocale: BlTimePickerI18nInterface;
}

export interface BlDatePickerLangI18nInterface extends BlCalendarI18nInterface {
  placeholder: string;
  rangePlaceholder: string[];
}

export interface BlTimePickerI18nInterface {
  placeholder: string;
}

export interface BlCalendarI18nInterface {
  today: string;
  now: string;
  backToToday: string;
  ok: string;
  clear: string;
  month: string;
  year: string;
  timeSelect: string;
  dateSelect: string;
  monthSelect: string;
  yearSelect: string;
  decadeSelect: string;
  yearFormat: string;
  monthFormat?: string;
  dateFormat: string;
  dayFormat: string;
  dateTimeFormat: string;
  monthBeforeYear?: boolean;
  previousMonth: string;
  nextMonth: string;
  previousYear: string;
  nextYear: string;
  previousDecade: string;
  nextDecade: string;
  previousCentury: string;
  nextCentury: string;
}

export interface BlI18nInterface {
  locale: string;
  Pagination: BlPaginationI18nInterface;
  DatePicker: BlDatePickerI18nInterface;
  TimePicker: BlTimePickerI18nInterface;
  Calendar: BlCalendarI18nInterface;
  Table: {
    filterTitle: string;
    filterConfirm: string;
    filterReset: string;
    selectAll: string;
    selectInvert: string;
  };
  Modal: {
    okText: string;
    cancelText: string;
    justOkText: string;
  };
  Popconfirm: {
    okText: string;
    cancelText: string;
  };
  Transfer: {
    titles?: string[];
    searchPlaceholder: string;
    itemUnit: string;
    itemsUnit: string;
  };
  Upload: {
    uploading: string;
    removeFile: string;
    uploadError: string;
    previewFile: string;
  };
  Empty: {
    description: string;
  };
}
