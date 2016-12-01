import {Component} from '@angular/core';
import {RegistrationPage} from "../registration/registration";
import {NavController} from "ionic-angular";
import {SiginComponent} from "../sigin/sigin";


@Component({
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  public player:any;
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    console.log('Hello NewentryPage Page');

  }
  ngAfterContentInit() {

  }
  openSiginPage() {
       // navigate to the new page if it is not the current page
    this.navCtrl.push(SiginComponent);

  }
  openRegistrationPage() {
    // navigate to the new page if it is not the current page
    this.navCtrl.push(RegistrationPage);

  }
}
