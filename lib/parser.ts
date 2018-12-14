import { ArgumentParser } from 'argparse';

let parser = new ArgumentParser({
  addHelp: true,
  description: 'Tail all Mongo queries',
});

parser.addArgument(
  'db',
  {
    help: 'DB to follow, like "users" or "192.0.0.1/users"',
    metavar: '[db address]'
  },
);

parser.addArgument(
  ['--authDB'],
  {
    help: 'DB to use to authenticate user'
  }
);

parser.addArgument(
  ['--username'],
);

parser.addArgument(
  ['--password'],
);

parser.addArgument(
  ['-s', '--slowms'],
  {
    type: 'int',
    defaultValue: 200,
  }
);
parser.addArgument(
  ['-l', '--profilelevel'],
  {
    type: 'int',
    defaultValue: 1,
    choices: '012',
    help: '0 for none, 1 for slow queries, 2 for all',
  }
);

export { parser };
