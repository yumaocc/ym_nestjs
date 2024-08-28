export class Pagination<T> {
  pageSize: number;
  current: number;
  total: number;
  records: T[];
  constructor(
    pageSize: number,
    current: number,
    total: number,
    records: T[] = [],
  ) {
    this.pageSize = pageSize;
    this.current = current;
    this.total = total;
    this.records = records;
  }
}
