import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import {MomentModule} from 'angular2-moment';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { SiginComponent } from '../pages/sigin/sigin';
import { RegistrationPage } from '../pages/registration/registration';
import { RecoverpassPage } from '../pages/recoverpass/recoverpass';
import {FirsttimePage} from "../pages/firsttime/firsttime";
import {MenupagePage} from "../pages/menupage/menupage";
import {NewentryPage} from "../pages/newentry/newentry";
import {MyfeedPage} from "../pages/myfeed/myfeed";
import {MessagesPage} from "../pages/messages/messages";
import {ViewdataPage} from "../pages/viewdata/viewdata";
import {ProfilePage} from "../pages/profile/profile";
import {CanvasComponent} from "../pages/newentry/canvas";
import {PopoverComponent} from "../pages/newentry/popup-menu";
import {EmitterService} from "../services/EmitterService";
import {LocalStorageService} from "../services/LocalStorageService";
import {returnPointService} from "../services/returnPointService";
import { Storage } from '@ionic/storage';
import { SQLite } from 'ionic-native';
import {SQLiteService} from "../services/SQLiteService";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    SiginComponent,
    RegistrationPage,
    RecoverpassPage,
    FirsttimePage,
    MenupagePage,
    NewentryPage,
    MyfeedPage,
    MessagesPage,
    ViewdataPage,
    ProfilePage,
    CanvasComponent,
    PopoverComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    MomentModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    SiginComponent,
    RegistrationPage,
    RecoverpassPage,
    FirsttimePage,
    MenupagePage,
    NewentryPage,
    MyfeedPage,
    MessagesPage,
    ViewdataPage,
    ProfilePage,
    CanvasComponent,
    PopoverComponent
  ],
  providers: [EmitterService,LocalStorageService,returnPointService,Storage,SQLite,SQLiteService]
})
export class AppModule {}
