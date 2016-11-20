import {Component, OnDestroy} from '@angular/core';
import {NavController} from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import {EmitterService} from "../../services/EmitterService";//Initialization of emitter to get data from child component (see CanvasComponent)
import { Subscription }   from 'rxjs/Subscription';
import {PopoverComponent} from "./popup-menu";
/*
  Generated class for the Newentry page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-newentry',
  templateUrl: 'newentry.html',
  providers: [EmitterService]
})
export class NewentryPage implements OnDestroy{
  /*private subscription;*/
  bodyPart:string;
  private subscription: Subscription;

  constructor(public navCtrl: NavController,public popoverCtrl: PopoverController,private emitter:EmitterService) {
    //Here we get data from child component
    this.subscription=this.emitter.subscribe(msg => {
      this.presentPopover(msg);
    });

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
