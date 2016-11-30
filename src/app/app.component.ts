import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { SiginComponent } from '../pages/sigin/sigin';
import {SQLiteService} from "../services/SQLiteService";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public SQLiteService:SQLiteService
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'MyHello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Sign In', component: SiginComponent }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.SQLiteService.createAuthDB();
      this.SQLiteService.createMainDB();
      StatusBar.styleDefault();

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
