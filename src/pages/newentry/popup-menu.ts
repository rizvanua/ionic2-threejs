import {Component,ViewChild} from '@angular/core';
import {ViewController} from 'ionic-angular';

import {LocalStorageService} from "../../services/LocalStorageService";
import {returnPointService} from "../../services/returnPointService";
import { Storage } from '@ionic/storage';
import {SQLiteService} from "../../services/SQLiteService";

/*
 Generated class for the Newentry page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: `popup-menu.html`,
  providers:[LocalStorageService]
})
export class PopoverComponent  {

  public bodyPart:any;
  public date: any;
  public levelNum:any;
  public gotFile=false;
  public fileName:string;
  public switchLevel=true;
  @ViewChild('inputFile') inputFile: any;
  constructor(public viewCtrl: ViewController, public LocalStorageService:LocalStorageService, private _returnPointService: returnPointService,storage: Storage, public SQLiteService:SQLiteService /*private emitter:EmitterService*/) {
    this.bodyPart=viewCtrl.data.bodyPart;

  }
  public OpenFile(){
  this.inputFile.nativeElement.click();
  console.log(this.inputFile.nativeElement.value);
  }

  public Test(){
  console.log(this.inputFile.nativeElement.value.length);
  if(this.inputFile.nativeElement.value.length>0){
  this.fileName=this.inputFile.nativeElement.value;
	this.gotFile=true;
  }
  console.log(this.inputFile.nativeElement.value);
  }

  public getCamera(){

  }

   ionViewDidLoad() {

  }

  /*Show/hide level menu*/

  public ShowLevel(){
  this.switchLevel=!this.switchLevel;
  return this.switchLevel;
  }

/*Get data about user choice*/
  public getLevel(num,bp){

	this.levelNum=num;
    let textObj={
      'level':num,
      "name": bp.name,
      'point':bp.point,
      'face':bp.face,
      "time": new Date()
    };
    this._returnPointService.getPoint(textObj);
    /**/
    this.LocalStorageService.save(textObj,'lastActive');
    this.LocalStorageService.saveIntoLocalStorage(textObj,bp.name);

    this.SQLiteService.insertIntoMainDB(textObj);

    this.close();
    /**/
    /*console.log(this.date._d);
    localStorage.setItem('level',num);
    localStorage.setItem('bodyPart',bp);
    localStorage.setItem('date',this.date._d)*/
  }


  close() {
   this.viewCtrl.dismiss();
   }


}
