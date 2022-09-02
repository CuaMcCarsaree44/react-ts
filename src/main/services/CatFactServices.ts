import {CatGetFactResponse} from "../model/response/CatGetFactResponse";
import axios from "axios";

export class CatFactServices {

  private uri: string = "https://catfact.ninja/fact";

  /**
   * getNewFact
   *
   * This function will call cat fact API, and return the response
   */
  public getNewFact = async (): Promise<CatGetFactResponse> =>
    await axios.get(this.uri).then((e) => {
      return {
        "fact": e.data.fact,
        "length": e.data.length
      }
    }).catch((error: any) => {
      return {
        "fact": "",
        "length": 0
      }
    });
}