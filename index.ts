import { connect } from './connection';
import { parser } from './parser';
import { printObj } from './output';
import { FIELDS, QUERY } from './constants';
import { Db, ProfilingLevel } from 'mongodb';

// Use module augmentation to update the interface to setProfilingLevel,
// which accepts {slowms}
declare module 'mongodb' {
  interface Db {
    setProfilingLevel(level: ProfilingLevel, options?: { slowms?: number}): void;
  }
}

function tail(db: Db, args: { slowms: number }) {
  let cursor = db.collection('system.profile').find(QUERY, { tailable: true }).project(FIELDS);
  cursor.addCursorFlag('awaitData', true)
  cursor.stream().on('data', function (dataPoint) {
    printObj(dataPoint, args.slowms);
  });
}

function setProfilingLevel(db: Db, args: {slowms?: number, profilelevel: number}) {
  const profilingCommand : ProfilingLevel = ['none', 'slow_only', 'all'][args.profilelevel] as ProfilingLevel;
  if (args.slowms) {
    db.setProfilingLevel(profilingCommand, {slowms: args.slowms} );
  }
  else {
    db.setProfilingLevel(profilingCommand);
  }
}

async function exec(): Promise<void> {
  let args = parser.parseArgs();
  console.log(args);
  const { db } = await connect(args.db);
  setProfilingLevel(db, args);
  tail(db, args);
}

exec();