export function initDateFormatter(initDate: string) {
  return `CONVERT(datetime, CONVERT(date, '${initDate}')) + '00:00:00'`;
}

export function finalDateFormatter(finalDate: string) {
  return `CONVERT(datetime, CONVERT(date, '${finalDate}')) + '23:59:59'`;
}

export function BETWEENFormatter(
  column: string,
  initDate: string,
  finalDate: string,
) {
  return `(${column} BETWEEN ${initDateFormatter(
    initDate,
  )} AND ${finalDateFormatter(finalDate)})`;
}

export function BETWEENMonthFormatter(
  column: string,
  initDate: string,
  finalDate: string,
  month: number,
) {
  return `(${column} BETWEEN DATEADD(month, -${month}, '${initDate}') AND ${finalDateFormatter(
    finalDate,
  )})`;
}

export function BETWEENDayFormatter(
  column: string,
  initDate: string,
  finalDate: string,
  month: number,
) {
  return `(${column} BETWEEN DATEADD(day, -${month}, '${initDate}') AND ${finalDateFormatter(
    finalDate,
  )})`;
}

export function monthFormatter(column: string) {
  return `RIGHT('0' + CAST(MONTH(${column}) AS VARCHAR(2)), 2) + '/' + CAST(YEAR(${column}) AS VARCHAR(4))`;
}
