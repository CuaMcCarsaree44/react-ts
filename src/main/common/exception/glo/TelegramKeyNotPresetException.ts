import ErrorDictionary, {BaseException} from "../BaseException";

export class TelegramKeyNotPresetException extends BaseException {

  constructor() {
    super();

    this.message = ErrorDictionary[`GLO0001`];
  }
}