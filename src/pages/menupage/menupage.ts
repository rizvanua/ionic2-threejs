import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NewentryPage} from "../newentry/newentry";
import {MyfeedPage} from "../myfeed/myfeed";
import {MessagesPage} from "../messages/messages";
import {ViewdataPage} from "../viewdata/viewdata";
import {ProfilePage} from "../profile/profile";


/*
  Generated class for the Menupage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-menupage',
  templateUrl: 'menupage.html'
})
export class MenupagePage {
  pages: Array<{title: string, component: any, icon: string}>;
  constructor(public navCtrl: NavController) {

    // set our app's pages
    this.pages = [
      { title: 'New entry', component: NewentryPage, icon: 'body'},
      { title: 'My Feed', component: MyfeedPage,  icon: 'logo-rss' },
      { title: 'Messages', component: MessagesPage, icon: 'mail-open' },
      { title: 'View data', component: ViewdataPage, icon: 'pie' },
      { title: 'Profile & Settings', component: ProfilePage, icon: 'settings' }
    ];
  }


  ionViewDidLoad() {
    console.log('Hello MenupagePage Page');
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    // navigate to the new page if it is not the current page
    this.navCtrl.push(page.component);
  }
}
