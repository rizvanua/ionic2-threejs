import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {LocalStorageService} from "../../services/LocalStorageService";
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

  constructor(public navCtrl: NavController,public LocalStorageService:LocalStorageService) {}
  

  ionViewDidLoad() {
    console.log('Hello ViewdataPage Page');
	if(window.localStorage.length>0){
	this.data=this.LocalStorageService.get('history');
	console.log(this.data);
	}
  }

}
