import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { RecoverpassPage } from '../recoverpass/recoverpass';
import {FirsttimePage} from '../firsttime/firsttime';
import {SQLiteService} from "../../services/SQLiteService";

@Component({
  selector: 'sigin',
  templateUrl: 'sigin.html'
})
export class SiginComponent {
  text: string;

  constructor(public navCtrl: NavController, public SQLiteService:SQLiteService) {
    console.log('Hello Sigin Component');

  }

  ionViewDidLoad() {
    this.SQLiteService.getFromAuthDB();
    /*this.SQLiteService.dropTable();*/
    this.SQLiteService.showAllTables2();
    this.SQLiteService.showAllTables3();

  }

  openRecoverpassPage() {

    // navigate to the new page if it is not the current page
    this.navCtrl.push(RecoverpassPage);

  }
  openRegistrationPage() {

    // navigate to the new page if it is not the current page
    this.navCtrl.push(RegistrationPage);

  }
  openAccesPage(){
    this.navCtrl.push(FirsttimePage);
  }
}
