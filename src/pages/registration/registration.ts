import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Registration page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  public Name:any;

  constructor(public navCtrl: NavController,storage: Storage) {
    storage.set('name', 'Max');
    storage.get('name').then((val) => {
      this.Name=val;
      console.log('Your name is', val);
    })

  }

  ionViewDidLoad() {
    console.log('Hello RegistrationPage Page');
  }

}
