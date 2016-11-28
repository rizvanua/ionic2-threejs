/**
 * Created by Roman on 23.11.2016.
 */
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Subject} from 'rxjs';

@Injectable()
export class returnPointService  {
  private _navPoint= new Subject<any>();
  pointItem$ = this._navPoint.asObservable();

  getPoint(pointData) {
    this._navPoint.next(pointData);
  }

}
