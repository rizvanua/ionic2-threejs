import {Component, OnDestroy} from '@angular/core';
import {NavController} from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import {EmitterService} from "../../services/EmitterService";//Initialization of emitter to get data from child component (see CanvasComponent)
import { Subscription }   from 'rxjs/Subscription';
import {PopoverComponent} from "./popup-menu";
import {PassClickService} from "../../services/PassClickService";
import {HttpService} from "../../services/HttpService";
/*
  Generated class for the Newentry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-newentry',
  templateUrl: 'newentry.html'
})
export class NewentryPage implements OnDestroy{
  /*private subscription;*/
  bodyPart:string;
  private subscription: Subscription;

  constructor(public navCtrl: NavController,public popoverCtrl: PopoverController,private emitter:EmitterService, public PassClickService:PassClickService, private HttpService:HttpService) {
    //Here we get data from child component Canvas
    this.subscription=this.emitter.subscribe((msg) => {
      /*console.log(msg);*/
      this.presentPopover(msg);//and pass to child component popup-menu
    });

  }
  clearDataPointers(){
    this.HttpService.postTempData("").subscribe(data=>console.log(data));
    this.PassClickService.next('Click')
  }

  ionViewDidLoad() {
    console.log('Hello NewentryPage Page');
  }
  /*Initiation of Popover window (see PopoverComponent)*/
  presentPopover(msg) {
    let popover = this.popoverCtrl.create(PopoverComponent,{bodyPart:msg},{enableBackdropDismiss:true});
    popover.present({

    });
  }
  /*Destroing subscribe of EmitterService to escape leak of memory (!important)*/
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
