import {Component} from '@angular/core';
import {RegistrationPage} from "../registration/registration";
import {NavController} from "ionic-angular";
import {SiginComponent} from "../sigin/sigin";
import * as YouTubePlayer from 'youtube-player';


@Component({
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  public player:any;
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    console.log('Hello NewentryPage Page');
    this.player = YouTubePlayer('video-player');
    this.player.loadVideoById('M7lc1UVf-VE');
    this.player.playVideo();

  }
  ngAfterContentInit() {

  }
  openSiginPage() {
    this.player.stopVideo();
    // navigate to the new page if it is not the current page
    this.navCtrl.push(SiginComponent);

  }
  openRegistrationPage() {
    this.player.stopVideo();
    // navigate to the new page if it is not the current page
    this.navCtrl.push(RegistrationPage);

  }
}
