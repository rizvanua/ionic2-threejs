/**
 * Created by Roman on 20.11.2016.
 */
import { Injectable } from '@angular/core';
import {Promise} from 'es6-promise';

@Injectable()
export class LocalStorageService {
  save(data,key){
    window.localStorage[key] = JSON.stringify(data);
  }
  get(key){
      return JSON.parse(window.localStorage[key]);
  }
  saveIntoLocalStorage(textObj,key){

    let promise = new Promise((resolve, reject)=> {
      let getData:Array<any> = [];
      if(window.localStorage[key]){
        resolve(JSON.parse(window.localStorage[key]));
      }
      else{
        resolve(getData);
      }
    });

    promise.then(result=> {
      if(Array.isArray(result)){
        result.push(textObj);
        return result;
      }
      /**/
    }).then(result=> {
      window.localStorage[key] = JSON.stringify(result);
    });

  }
}
