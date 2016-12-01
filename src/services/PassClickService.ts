/**
 * Created by Roman on 30.11.2016.
 */
import {Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Subject} from 'rxjs';


@Injectable()
export class PassClickService  {
  private event= new Subject();
  subscribe (next){
    return this.event.subscribe(next);
  }
  next (event) {
    this.event.next(event);
  }
}
