import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Messages page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  public messages: Array<{name: string, nick: string, img: string, day: string, text:string}>;

  constructor(public navCtrl: NavController) {
    this.messages=[
      {name: 'Marty McFly', nick: '@Marty', img: 'assets/picture/marty-avatar.png', day: '2d',text:'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine...' },
      {name: 'Sarah Connor', nick: '@SConnor', img: 'assets/picture/sarah-avatar.png.jpeg', day: '2d',text:'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.'},
      {name: 'Dr. Ian Malcolm', nick: '@DrMalcolm', img: 'assets/picture/ian-avatar.png', day: '2d',text:'Your scientists were so preoccupied with whether or not they could, that they did not stop to think if they should.'}
    ]
  }

  ionViewDidLoad() {
    console.log('Hello MessagesPage Page');
  }

}
