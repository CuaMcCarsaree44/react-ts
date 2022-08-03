import {TelegramKeyNotPresetException} from "../common/exception/glo/TelegramKeyNotPresetException";
import axios from 'axios';
import {Log} from "../config/Logging";
import dotenv from 'dotenv';
dotenv.config();

export class TelegramServices {

  /**
   * @developmentOnly
   * @static
   * @var number
   * Telegram API can only hold up to 4000 characters.
   * So I'm gonna limit the characters to 2000 characters for now.
   */
  static TELEGRAM_CHAT_CHARACTERS_LIMIT: number = 2000;
  private telegramBaseUrl = "https://api.telegram.org/bot";

  private uri = (): string => {

    const key: string | undefined = process.env.REACT_APP_TELEGRAM_API_KEY;

    if(key === undefined){
      throw new TelegramKeyNotPresetException();
    }

    return this.telegramBaseUrl + key;
  }

  public async sendMessage(message: string, log?: boolean): Promise<void> {

    if(message.length > TelegramServices.TELEGRAM_CHAT_CHARACTERS_LIMIT){
      message =
        `${message.substring(0, TelegramServices.TELEGRAM_CHAT_CHARACTERS_LIMIT - 3)} `
        + ` . . . . . Message length exceeded ${TelegramServices.TELEGRAM_CHAT_CHARACTERS_LIMIT} characters.`;
    }

    const uri: string = `${this.uri()}/sendMessage`;
    const request: any = {
      chat_id: process.env.REACT_APP_TELEGRAM_CHAT_ID,
      text: `[${process.env.REACT_APP_ENV}]\n\n` + message
    };

    axios.post(uri, request)
      .catch(error => {
        Log.e("Telegram - Send Message", error.message, error);
      });
  }
}