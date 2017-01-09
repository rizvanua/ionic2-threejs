import {Component} from '@angular/core';
import {RegistrationPage} from "../registration/registration";
import {NavController} from "ionic-angular";
import {SiginComponent} from "../sigin/sigin";
import {ViewChild} from "@angular/core/src/metadata/di";



@Component({
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  @ViewChild('videoPlayer') video;

  public player:any;
  public soundMuted:boolean=false;
  public startPlay:boolean =false;
  constructor(public navCtrl: NavController) {


  }
  ionViewDidLoad() {

    console.log('Hello NewentryPage  Page');
    console.log(this.video);
    this.video.nativeElement.load();


  }
  ngAfterContentInit() {

  }

  playVideo(){
    console.log('clickPlayVideo');
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
      this.soundMuted=this.video.nativeElement.muted; // chage sound icon to 'on'
    }
  }
  openSiginPage() {
       // navigate to the new page if it is not the current page
    this.navCtrl.push(SiginComponent);
    this.video.nativeElement.pause();// pause video
  }
  openRegistrationPage() {
    // navigate to the new page if it is not the current page
    this.navCtrl.push(RegistrationPage);
    this.video.nativeElement.pause();// pause video
  }
}
