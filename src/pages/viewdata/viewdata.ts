import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {LocalStorageService} from "../../services/LocalStorageService";
import {SQLiteService} from "../../services/SQLiteService";
/*
  Generated class for the Viewdata page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-viewdata',
  templateUrl: 'viewdata.html'
})
export class ViewdataPage {
public data:any;

  constructor(public navCtrl: NavController,public LocalStorageService:LocalStorageService, public SQLiteService:SQLiteService) {}


  ionViewDidLoad() {
    console.log('Hello ViewdataPage Page');
    /*here we use SQLite*/
    this.SQLiteService.getFromMainDB();
    /**/

    /*here we use local host*/
	if(window.localStorage.length>0){
	this.data=this.LocalStorageService.get('history');
	console.log(this.data);
	}
	/**/
  }

}
