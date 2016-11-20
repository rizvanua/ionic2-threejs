import { Component,Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Myfeed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myfeed',
  templateUrl: 'myfeed.html'
})
export class MyfeedPage {
  @Input() name:any;
  feeds: Array<{title: string, text: string, icon?: string, image?: string}>;

  constructor(public navCtrl: NavController) {

    this.feeds = [
      { title: 'New message from James', text: 'Hi, I have a new program for you...', icon: 'mail-open'},
      { title: 'Your daily report', text: '',  icon: 'logo-rss' },
      { title: 'A new study treatment of ...', text:'', icon: 'mail-open' },
      { title: 'Dave comment on your report', text: 'Good job! keep on doing the good work...', image: 'assets/picture/marty-avatar.png' }
    ];
  }

  ionViewDidLoad() {
    console.log('Hello MyfeedPage Page');
  }
  Icon(p){
    if(p!=undefined){
      return p;
    }
    else {
      return ''
    }
  }

}
