import {Component,ViewChild} from '@angular/core';
import {ViewController} from 'ionic-angular';

import {LocalStorageService} from "../../services/LocalStorageService";
import {returnPointService} from "../../services/returnPointService";
import { Storage } from '@ionic/storage';
import {SQLiteService} from "../../services/SQLiteService";
import {Camera} from "ionic-native";

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
  /*Camera*/
  public base64Image: string;



  @ViewChild('inputFile') inputFile: any;
  constructor(public viewCtrl: ViewController, public LocalStorageService:LocalStorageService, private _returnPointService: returnPointService,storage: Storage, public SQLiteService:SQLiteService, /*private emitter:EmitterService*/) {
    this.bodyPart=viewCtrl.data.bodyPart;

  }
  public OpenFile(){
    Camera.getPicture({
      destinationType:0,
      sourceType:2,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });

    /*FileChooser.open()
      .then(uri => { console.log(uri)})
      .catch(e => {console.log(e)});*/
  /*this.inputFile.nativeElement.click();
  console.log(this.inputFile.nativeElement.value);*/
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
    Camera.getPicture({
      destinationType: 1,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  /*public getGallery(){
    Camera.getPicture({
      destinationType:0,
      sourceType:0,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }*/

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
    this.LocalStorageService.save(textObj,bp.name);
    /*Need Remove this when implement SQLiteService*/
    this.LocalStorageService.saveIntoLocalStorage(textObj,'history');
    /**/
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
