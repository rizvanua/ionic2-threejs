import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {MenupagePage} from "../menupage/menupage";
import * as YouTubePlayer from 'youtube-player';

/*
  Generated class for the Firsttime page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-firsttime',
  templateUrl: 'firsttime.html'
})
export class FirsttimePage {
public player:any
  constructor(public navCtrl: NavController) {}


  ionViewDidLoad() {
    console.log('Hello FirsttimePage Page');
    this.player = YouTubePlayer('video-player2');
    this.player.loadVideoById('sWk-kiOtBeY');
    this.player.playVideo();
  }
  openMenupagePage(){
    this.player.stopVideo();
    this.navCtrl.push(MenupagePage);
  }

}
