/* eslint-disable import/prefer-default-export */
import * as dayjs from 'dayjs';
import * as dayOfYear from 'dayjs/plugin/dayOfYear';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import * as localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/af';
import 'dayjs/locale/am';
import 'dayjs/locale/ar-dz';
import 'dayjs/locale/ar-iq';
import 'dayjs/locale/ar-kw';
import 'dayjs/locale/ar-ly';
import 'dayjs/locale/ar-ma';
import 'dayjs/locale/ar-sa';
import 'dayjs/locale/ar-tn';
import 'dayjs/locale/ar';
import 'dayjs/locale/az';
import 'dayjs/locale/be';
import 'dayjs/locale/bg';
import 'dayjs/locale/bi';
import 'dayjs/locale/bm';
import 'dayjs/locale/bn';
import 'dayjs/locale/bo';
import 'dayjs/locale/br';
import 'dayjs/locale/bs';
import 'dayjs/locale/ca';
import 'dayjs/locale/cs';
import 'dayjs/locale/cv';
import 'dayjs/locale/cy';
import 'dayjs/locale/da';
import 'dayjs/locale/de-at';
import 'dayjs/locale/de-ch';
import 'dayjs/locale/de';
import 'dayjs/locale/dv';
import 'dayjs/locale/el';
import 'dayjs/locale/en-au';
import 'dayjs/locale/en-ca';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/en-ie';
import 'dayjs/locale/en-il';
import 'dayjs/locale/en-in';
import 'dayjs/locale/en-nz';
import 'dayjs/locale/en-sg';
import 'dayjs/locale/en-tt';
import 'dayjs/locale/en';
import 'dayjs/locale/eo';
import 'dayjs/locale/es-do';
import 'dayjs/locale/es-mx';
import 'dayjs/locale/et';
import 'dayjs/locale/eu';
import 'dayjs/locale/fa';
import 'dayjs/locale/fi';
import 'dayjs/locale/fo';
import 'dayjs/locale/fr-ca';
import 'dayjs/locale/fr-ch';
import 'dayjs/locale/fr';
import 'dayjs/locale/fy';
import 'dayjs/locale/ga';
import 'dayjs/locale/gd';
import 'dayjs/locale/gl';
import 'dayjs/locale/gom-latn';
import 'dayjs/locale/gu';
import 'dayjs/locale/he';
import 'dayjs/locale/hi';
import 'dayjs/locale/hr';
import 'dayjs/locale/ht';
import 'dayjs/locale/hu';
import 'dayjs/locale/hy-am';
import 'dayjs/locale/id';
import 'dayjs/locale/is';
import 'dayjs/locale/it-ch';
import 'dayjs/locale/it';
import 'dayjs/locale/ja';
import 'dayjs/locale/jv';
import 'dayjs/locale/ka';
import 'dayjs/locale/kk';
import 'dayjs/locale/km';
import 'dayjs/locale/kn';
import 'dayjs/locale/ko';
import 'dayjs/locale/ku';
import 'dayjs/locale/ky';
import 'dayjs/locale/lb';
import 'dayjs/locale/lo';
import 'dayjs/locale/lt';
import 'dayjs/locale/lv';
import 'dayjs/locale/me';
import 'dayjs/locale/mi';
import 'dayjs/locale/mk';
import 'dayjs/locale/ml';
import 'dayjs/locale/mn';
import 'dayjs/locale/mr';
import 'dayjs/locale/ms-my';
import 'dayjs/locale/ms';
import 'dayjs/locale/mt';
import 'dayjs/locale/my';
import 'dayjs/locale/nb';
import 'dayjs/locale/ne';
import 'dayjs/locale/nl-be';
import 'dayjs/locale/nl';
import 'dayjs/locale/nn';
import 'dayjs/locale/oc-lnc';
import 'dayjs/locale/pa-in';
import 'dayjs/locale/pl';
import 'dayjs/locale/pt-br';
import 'dayjs/locale/pt';
import 'dayjs/locale/rn';
import 'dayjs/locale/ro';
import 'dayjs/locale/ru';
import 'dayjs/locale/rw';
import 'dayjs/locale/sd';
import 'dayjs/locale/se';
import 'dayjs/locale/si';
import 'dayjs/locale/sk';
import 'dayjs/locale/sl';
import 'dayjs/locale/sq';
import 'dayjs/locale/sr-cyrl';
import 'dayjs/locale/sr';
import 'dayjs/locale/ss';
import 'dayjs/locale/sv-fi';
import 'dayjs/locale/sv';
import 'dayjs/locale/sw';
import 'dayjs/locale/ta';
import 'dayjs/locale/te';
import 'dayjs/locale/tet';
import 'dayjs/locale/tg';
import 'dayjs/locale/th';
import 'dayjs/locale/tk';
import 'dayjs/locale/tl-ph';
import 'dayjs/locale/tlh';
import 'dayjs/locale/tr';
import 'dayjs/locale/tzl';
import 'dayjs/locale/tzm-latn';
import 'dayjs/locale/tzm';
import 'dayjs/locale/ug-cn';
import 'dayjs/locale/uk';
import 'dayjs/locale/ur';
import 'dayjs/locale/uz-latn';
import 'dayjs/locale/uz';
import 'dayjs/locale/vi';
import 'dayjs/locale/x-pseudo';
import 'dayjs/locale/yo';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-hk';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/zh';
import 'dayjs/locale/es-pr';
import 'dayjs/locale/es-us';
import 'dayjs/locale/es';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Table, TableRow } from 'p5';

declare module 'p5' {
  interface TableRow {
    getDateTime(
      column: number | string,
      format?: dayjs.OptionType,
      locale?: string,
      strict?: boolean,
    ): dayjs.Dayjs;
    setDateTime(
      column: number | string,
      date: dayjs.Dayjs,
      format?: dayjs.OptionType,
      locale?: string,
      strict?: boolean,
    ): void;
  }
  interface Table {
    inferTypes(): void;
    getDateTime(
      row: number,
      column: number | string,
      format?: dayjs.OptionType,
      locale?: string,
      strict?: boolean,
    ): dayjs.Dayjs;
    setDateTime(
      row: number,
      column: number | string,
      date: dayjs.Dayjs,
      format?: dayjs.OptionType,
      locale?: string,
      strict?: boolean,
    ): void;
    parseDates(
      column: number | string,
      format?: dayjs.OptionType,
      locale?: string,
      strict?: boolean,
    ): void;
  }
}

// Enable dayjs plugins
dayjs.extend(dayOfYear);
dayjs.extend(localeData);
dayjs.localeData();
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);

/**
 * Parse a date and convert it to a datetime object.
 *
 * @param {number} row                row ID
 * @param {number | string} column    column ID
 * @param {dayjs.OptionType} [format] the date format
 * @param {string} [locale]           the date's locale
 * @param {boolean} [strict]          flag to enforce strict parsing
 * @returns                           a datetime object
 */
Table.prototype.getDateTime = function _getDateTime(
  row: number,
  column: number | string,
  format?: dayjs.OptionType,
  locale?: string,
  strict?: boolean,
): dayjs.Dayjs {
  let date: string | dayjs.Dayjs = this.get(row, column);
  date = dayjs(date, format, locale, strict);
  return date;
};

/**
 * Parse a date and convert it to a datetime object.
 *
 * @param {number | string} column    column ID
 * @param {dayjs.OptionType} [format] the date format
 * @param {string} [locale]           the date's locale
 * @param {boolean} [strict]          flag to enforce strict parsing
 * @returns                           a datetime object
 */
TableRow.prototype.getDateTime = function _getDateTime(
  column: number | string,
  format?: dayjs.OptionType,
  locale?: string,
  strict?: boolean,
): dayjs.Dayjs {
  let date: string | dayjs.Dayjs = this.get(column);
  date = dayjs(date, format, locale, strict);
  return date;
};

/**
 * Set a p5.Table element to a dayjs.Dayjs object.
 *
 * @param {number} row                row ID
 * @param {number | string} column    column ID
 * @param {dayjs.Dayjs} date          the date to set
 * @param {dayjs.OptionType} [format] the date format
 * @param {string} [locale]           the date's locale
 * @param {boolean} [strict]          flag to enforce strict parsing
 */
Table.prototype.setDateTime = function _setDateTime(
  row: number,
  column: number | string,
  date: dayjs.Dayjs,
  format?: dayjs.OptionType,
  locale?: string,
  strict?: boolean,
): void {
  this.set(row, column, dayjs(date, format, locale, strict));
};

/**
 * Set a p5.TableRow element to a dayjs.Dayjs object.
 *
 * @param {number | string} column    column ID
 * @param {dayjs.Dayjs} date          the date to set
 * @param {dayjs.OptionType} [format] the date format
 * @param {string} [locale]           the date's locale
 * @param {boolean} [strict]          flag to enforce strict parsing
 */
TableRow.prototype.setDateTime = function _setDateTime(
  column: number | string,
  date: dayjs.Dayjs,
  format?: dayjs.OptionType,
  locale?: string,
  strict?: boolean,
): void {
  this.set(column, dayjs(date, format, locale, strict));
};

/**
 * Parse the values in a given column and convert them to datetime objects.
 *
 * @param {number | string} column    column ID
 * @param {dayjs.OptionType} [format] the date format
 * @param {string} [locale]           the date's locale
 * @param {boolean} [strict]          flag to enforce strict parsing
 */
Table.prototype.parseDates = function _parseDates(
  column: number | string,
  format?: dayjs.OptionType,
  locale?: string,
  strict?: boolean,
): void {
  this.rows.forEach((row: TableRow) => {
    const date: dayjs.Dayjs = row.getDateTime(column, format, locale, strict);
    row.setDateTime(column, date);
  });
};

/**
 * Converts the table elements to numbers if possible.
 *
 * @param {Table} table   the table to convert
 * @param {string} column the column to convert
 */
const asNum = (table: Table, column: string): void => {
  table.rows.forEach((row: TableRow) => {
    const num: number = row.getNum(column);
    row.setNum(column, num);
  });
};

/**
 * Infers the type of table elements.
 */
Table.prototype.inferTypes = function _inferTypes(): void {
  this.columns.forEach((column: string) => {
    try {
      asNum(this, column);
    } catch (error) {
      // pass silently
    }
  });
};
