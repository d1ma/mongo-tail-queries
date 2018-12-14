

interface SystemProfileEntry {
  op: string,
  command?: {
    query?: any,
    count?: string,
  },
  query?: {
    find?: string,
    filter?: any,
    projection?: any,
    documents?: [any],
  },
  ns?: string,
  updateobj?: any,
  ts: Date,
  documents?: [any],
  nreturned?: number,
  nMatched?: number,
  ninserted?: number,
  ndeleted?: number,
  millis?: number,
  docsExamined?: number
}

export function printObj(o: SystemProfileEntry, slowMillis: number) : void {
  let query = o.query || {};
  let command = o.command;
  let timestampClause = `${o.ts.toISOString()} `;
  let opClause = `[${o.op.toUpperCase()}] `;
  let namespace = (o.ns) ? `${o.ns} ` : '';
  let filterClause = query.filter
    ? `${JSON.stringify(query.filter)} `
    : command && command.query ? `${JSON.stringify(command.query)} `
    : o.op === 'update' ? `${JSON.stringify(query)} ` : '{}';
  let updateClause =  o.updateobj ? `${JSON.stringify(o.updateobj)} ` : '';
  let resultClause = ': ';

  if (command && command.count && o.op === 'command') {
    opClause = '[COUNT] ';
  }

  if (o.nMatched != undefined) {
    resultClause += `${o.nMatched} updated. `
  }

  if (o.ninserted != undefined) {
    resultClause += `${o.ninserted} inserted. `
  }

  if (o.ndeleted != undefined) {
    resultClause += `${o.ndeleted} deleted. `
  }

  if (o.nreturned != undefined) {
    resultClause += `${o.nreturned} returned. `
  }

  if (o.docsExamined != undefined) {
    resultClause += `${o.docsExamined} examined. `
  }

  if (o.millis != undefined) {
    resultClause += `${o.millis} millis. `;
  }

  if (o.millis !== undefined && !isNaN(o.millis) && o.millis > slowMillis) {
    resultClause += "SLOW!"
  }

  process.stdout.write(`${timestampClause}${opClause}${namespace}${filterClause}${updateClause}${resultClause}\n`);
}