import {Component,ViewChild} from '@angular/core';
import {ViewController} from 'ionic-angular';

import {LocalStorageService} from "../../services/LocalStorageService";
import {returnPointService} from "../../services/returnPointService";
import { Storage } from '@ionic/storage';
import {HttpService} from "../../services/HttpService";
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
  @ViewChild('inputCamera') inputCamera: any;
  constructor(public viewCtrl: ViewController, public LocalStorageService:LocalStorageService, private _returnPointService: returnPointService,storage: Storage, private HttpService:HttpService) {
    this.bodyPart=viewCtrl.data.bodyPart;

  }
  public OpenFile(){
    this.inputFile.nativeElement.click();
  }

  public Test(){
  if(this.inputFile.nativeElement.value.length>0){
  this.fileName=this.inputFile.nativeElement.value;
	this.gotFile=true;
  }

  }

  public getCamera(){
    this.inputCamera.nativeElement.click();
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
      "time": new Date(),
      'userName':'Test'
    };
    console.log(new Date());
    this._returnPointService.getPoint(textObj);
    /**/
    this.LocalStorageService.save(textObj,bp.name);
    this.LocalStorageService.save(textObj,'lastActive');    
    /*Need Remove this when implement SQLiteService*/
    this.LocalStorageService.saveIntoLocalStorage(textObj,'history');
    /**/    
    this.close();
    /**/

  }


  close() {
   this.HttpService.postTempData(window.localStorage).subscribe(data=>console.log(data));
   this.viewCtrl.dismiss();
   }


}
