/**
 * Created by Roman on 05.01.2017.
 */
import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import * as moment from 'moment';
import {dbConnect} from '../app/dbconnect';
@Injectable()

export class HttpService{
  private params:URLSearchParams = new URLSearchParams();
  private baseUrl:string= dbConnect;
  private timeDiff:any=moment().utcOffset().valueOf()/60;

  constructor (private http: Http){}
  private handleError(error:any){
    alert("Server Error");
    return Observable.throw(error.json());  }



  postData(data:any){
    const body=JSON.stringify(data);
    const headers=new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(`${this.baseUrl}/postMainData`,body,{headers:headers})
      .map((data:Response)=>data.json())
  }

   getDataPie(start,end){
     this.params.set('start', start);
     this.params.set('end',end);
     return this.http.get(`${this.baseUrl}/getMainDataPie`,{ search: this.params })
       .map((response:Response)=> response.json())
       .catch(this.handleError);
   }

   getDataLineDay(start,end){
     console.log(this.baseUrl);
     this.params.set('diff', this.timeDiff);
     this.params.set('start', start);
     this.params.set('end',end);
     console.log(this.timeDiff);
     return this.http.get(`${this.baseUrl}/getMainDataLineDay`,{ search: this.params })
       .map((response:Response)=> response.json())
       .catch(this.handleError);
   }

  getDataLineWeek(start,end){
    this.params.set('start', start);
    this.params.set('end',end);
    return this.http.get(`${this.baseUrl}/getMainDataLineWeek`,{ search: this.params })
      .map((response:Response)=> response.json())
      .catch(this.handleError);
  }

  getDataLineMonth(start,end){
    this.params.set('start', start);
    this.params.set('end',end);
    return this.http.get(`${this.baseUrl}/getMainDataLineMonth`,{ search: this.params })
      .map((response:Response)=> response.json())
      .catch(this.handleError);
  }

  getDataLineYear(start,end){
    this.params.set('start', start);
    this.params.set('end',end);
    return this.http.get(`${this.baseUrl}/getMainDataLineYear`,{ search: this.params })
      .map((response:Response)=> response.json())
      .catch(this.handleError);
  }

  getDataLineRange(start,end){
    this.params.set('start', start);
    this.params.set('end',end);
    return this.http.get(`${this.baseUrl}/getMainDataLineRange`,{ search: this.params })
      .map((response:Response)=> response.json())
      .catch(this.handleError);
  }
  /*Just for test, not for real life*/
  getTestData(start,end){
    this.params.set('start', start);
    this.params.set('end',end);
    return this.http.get(`${this.baseUrl}/getTestData`,{ search: this.params })
      .map((response:Response)=> response.json())
      .catch(this.handleError);
  }


}
