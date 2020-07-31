export function log(msg: string) {
  console.info(`Time: ${getDateTime()} ${msg}`);
}

export function error(error: string) {
  console.error(`Time: ${new Date().toDateString()} ${error}`);
}

function getDateTime(): string {
  const date = new Date();

  return `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}