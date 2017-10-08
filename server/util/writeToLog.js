import fs from 'fs';
import chalk from 'chalk';

export default function writeToLog(log, priority) {
  const dateLog = new Date();
  const date = chalk.black.bgCyan(`###  ${dateLog}`);
  console.log(`${date}   /   ${log}`);
  let logToWrite = `${dateLog}   /   ${log}\n`;
  if (priority) {
    if (priority > 0) {
      logToWrite = `<font style="color:blue;">${logToWrite}</font>`;
    } else if (priority < 0) {
      logToWrite = `<font style="color:gray;">${logToWrite}</font>`;
    }
  }
  fs.appendFile('watchinglog.txt', logToWrite, (err) => {
    if (err) {
      console.log('ERROR: Failed to write to watchinglog.txt.');
    }
  });
}
