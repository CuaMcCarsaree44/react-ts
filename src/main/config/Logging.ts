import fs from "fs";
import colors from 'colors';

export class Log {

  /**
   * getTimeStamp
   *  A function to get current timestamp,
   *  and convert it into readable string.
   *
   * @return string
   */
  private static getTimeStamp = (): string => new Date().toISOString();

  private static getDate(): string {
    const dateObj: any = new Date();
    const date = (dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate());
    const month = (dateObj.getMonth() + 1 < 10 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1);

    return `${process.env.REACT_APP_NAME}-${dateObj.getFullYear()}-${month}-${date}`;
  }

  /**
   * writeLog
   *  A function to write log message to file.
   *
   * @since 20220802 writeLog will not send the error through FS since React JS is working on browser
   * @todo Make your own Crashlytics system
   *
   * @return void
   */
  private static writeLog(str: string, object?: any): void {

    const currentFileName: string = `./logs/${Log.getDate()}.log`;
    const logFormat: string = `${str} ${object}\n`;

    return;

    fs.appendFile(currentFileName, logFormat, (appendError: any) => {
      if(appendError) {

        Log.e("LOG", "Something error when append", appendError);

        fs.writeFile(currentFileName, logFormat, (writeError: any) => {
          Log.e("LOG", "Something error when write", writeError);
        });
      }
    });
  }

  /**
   * i
   *   A function that print logs on the console as
   *   an informative message.
   */
  static i(namespace: string, message: string, object?: any): void {
    let generatedLog = `[${Log.getTimeStamp()}] [INFO] [${namespace}] ${message}`;
    Log.writeLog(generatedLog, object);

    console.log(colors.bgBlue.white(generatedLog), object ?? '');
  }

  /**
   * d
   *   A function that print logs on the console as
   *   an debug message.
   */
  static d(namespace: string, message: string, object?: any): void {
    let generatedLog = `[${Log.getTimeStamp()}] [DEBUG] [${namespace}] ${message}`;
    Log.writeLog(generatedLog, object);
    console.log(colors.yellow(generatedLog), object ?? '');
  }

  /**
   * e
   *   A function that print logs on the console as
   *   an error message.
   *
   *   Also, this function send all error logs through Telegram Logger.
   */
  static e(namespace: string, message: string, object?: any): void {

    let stackTrace = '';

    try{
      stackTrace = object.stack;
    }catch(error: any){
      stackTrace = '';
    }

    let generatedLog = `[${Log.getTimeStamp()}] [ERROR] [${namespace}] ${message}`;
    Log.writeLog(generatedLog, stackTrace);
    console.log(colors.bgRed.white(generatedLog), colors.bgRed.white(stackTrace ?? ''));
  }

  /**
   * w
   *   A function that print logs on the console as
   *   an warning message.
   */
  static w(namespace: string, message: string, object?: any): void {

    let stackTrace = '';

    try{
      stackTrace = object.stack;
    }catch(error: any){
      stackTrace = '';
    }

    let generatedLog = `[${Log.getTimeStamp()}] [WARNING] [${namespace}] ${message}`;
    Log.writeLog(generatedLog, stackTrace);


    console.log(colors.bgYellow.black(generatedLog), colors.bgYellow.black(stackTrace ?? ''));
  }
}
