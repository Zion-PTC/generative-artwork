import { zionUtil } from '@zionstate_node/zion-util';
import { IEdition } from '../Edition';

const sortDescending = zionUtil.sortDescending;

export class EditionsReport {
  #elementsUsage: { [key: string]: number } = {};
  set elementUsage(elementUsage: string) {
    if (this.#elementsUsage[elementUsage]) this.#elementsUsage[elementUsage]++;
    else this.#elementsUsage[elementUsage] = 1;
    this.#composeReport();
  }
  get createdEditionsAmount(): number | undefined {
    if (this.createdEditions) return this.createdEditions.length;
  }
  get elementsReportEntries() {
    return Object.entries(this.elementsReport);
  }
  get alphapeticalReport() {
    return this.elementsReportEntries.sort();
  }
  get percentageReport() {
    return this.elementsReportEntries.sort((a, b) => {
      let res = sortDescending(a, b, 1);
      // TODO trovare un modo migliore
      if (!res) return -2;
      return res;
    });
  }
  constructor(
    public collection: string,
    public createdEditions: IEdition[] = [],
    public elementsReport: { [key: string]: number } = {}
  ) {}
  #composeReport(): void {
    for (let key in this.#elementsUsage) {
      if (this.createdEditionsAmount)
        this.elementsReport[key] =
          Math.floor(
            (this.#elementsUsage[key] / this.createdEditionsAmount) * 10000
          ) / 100;
    }
  }
}
