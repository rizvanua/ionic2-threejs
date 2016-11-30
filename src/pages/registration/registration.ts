import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {NgForm} from "@angular/forms";
import {SQLiteService} from "../../services/SQLiteService";

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

  constructor(public navCtrl: NavController,storage: Storage, public SQLiteService:SQLiteService) {
    /*storage.set('name', 'Alex');
    storage.get('name').then((val) => {
      this.Name=val;
      console.log('Your name is', val);
    });
    console.log(Storage);*/

  }

  ionViewDidLoad() {
    console.log('Hello RegistrationPage Page');
  }

  onSubmitReg(form:NgForm){

    let regData={
      age:form.value.age,
      firstName:form.value.firstName,
      lastName:form.value.lastName,
      email:form.value.email,
      gender:form.value.gender,
      password:form.value.password
    };

    this.SQLiteService.insertIntoAuthDB(regData);

  }

}
