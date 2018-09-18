let prompt = require('password-prompt');

export async function promptPassword(): Promise<string> {
  return await prompt('Password: ', {method: 'hide'});
};
