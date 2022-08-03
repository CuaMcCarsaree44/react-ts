export abstract class BaseException extends Error {
  public constructor() {
    super();
    console.log(this.message);
  }

}

const DICTIONARY =  {
  "GLO0001": "Telegram Key is not Preset in .env file. Please check your environment variable file."
};

export default DICTIONARY;