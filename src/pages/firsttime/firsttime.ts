import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import {MenupagePage} from "../menupage/menupage";
import {ViewChild} from "@angular/core/src/metadata/di";
/*import * as YouTubePlayer from 'youtube-player';*/

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
  @ViewChild('videoPlayer') video;
  public soundMuted:boolean=false;
  public player:any;
  public startPlay:boolean =false;
  constructor(public navCtrl: NavController) {}


  ionViewDidLoad() {
    
    /*this.player = YouTubePlayer('video-player2');
    this.player.loadVideoById('sWk-kiOtBeY');
    this.player.playVideo();*/
  }
  playVideo(){
    this.video.nativeElement.play();
      this.startPlay=true;
  }

  soundMute(){
    if(!this.video.nativeElement.muted){

      this.video.nativeElement.muted=true;// video sound turn off
      this.soundMuted=this.video.nativeElement.muted;// chage sound icon to 'off'

    }
    else{
      this.video.nativeElement.muted=false;// video sound turn on
      this.soundMuted=this.video.nativeElement.muted;// chage sound icon to 'on'
      console.log(this.soundMuted);
    }
  }

  openMenupagePage(){
    this.navCtrl.push(MenupagePage);
    this.video.nativeElement.pause();// pause video
  }

}
