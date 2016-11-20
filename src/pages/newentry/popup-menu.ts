import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import * as moment from 'moment';
/*
 Generated class for the Newentry page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: `popup-menu.html`
})
export class PopoverComponent  {

  public bodyPart:any;
  public date: any;
  constructor(public viewCtrl: ViewController ) {
    this.bodyPart=viewCtrl.data.bodyPart;

  }

/*Get data about user choice*/
  private getLevel(num,bp){
    console.log(num);
    console.log(bp);
    this.date=moment();
    console.log(this.date._d);
    localStorage.setItem('level',num);
    localStorage.setItem('bodyPart',bp);
    localStorage.setItem('date',this.date._d)
  }


  /*close() {
   this.viewCtrl.dismiss();
   }*/
}
