const QUERY = {
  "ns": { "$nin": ["system.profile", "admin"] },
  "command.profile": { "$exists": false },
  "command.collStats": { "$exists": false },
  "command.collstats": { "$exists": false },
  "command.createIndexes": { "$exists": false },
  "command.listIndexes": { "$exists": false },
  "command.cursor": { "$exists": false },
  "command.create": { "$exists": false },
  "command.dbstats": { "$exists": false },
  "command.scale": { "$exists": false },
  "command.explain": { "$exists": false },
  "command.count": { "$ne": "system.profile" },
  "op": { "$ne": "getmore" },
};

const FIELDS = {
  'ts': 1,
  'op': 1,
  'ns': 1,
  'query': 1,
  'updateobj': 1,
  'command': 1,
  'ninserted': 1,
  'ndeleted': 1,
  'nMatched': 1,
  'nreturned': 1,
  'millis': 1,
  'docsExamined': 1,
  'keysExamined': 1,
};

export {FIELDS, QUERY};