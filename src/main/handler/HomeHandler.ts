import {TelegramServices} from "../services/TelegramServices";

export class HomeHandler {

  /**
   * testSendMessage
   *
   * A function that will send message directly as test
   */
  public testSendMessage = async() => {
    console.log("Clicked")
    await new TelegramServices().sendMessage("Hey, if you get this message, then you're finally can do HTTP request through your React JS Application!");
  }

  /**
   * sendMessageWithString
   *
   * A function that will handle send message with custom string parameter within.
   *
   * @param payload
   */
  public sendMessageWithString = async (payload: string): Promise<void> => {
    new TelegramServices().sendMessage(payload);
  }


}