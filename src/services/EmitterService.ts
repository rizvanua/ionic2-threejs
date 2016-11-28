/**
 * Created by Roman on 17.11.2016.
 */
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Subject} from 'rxjs';


@Injectable()
export class EmitterService  {
  private event= new Subject();
  subscribe (next){
    return this.event.subscribe(next);
  }
  next (event) {
    this.event.next(event);
  }
}


