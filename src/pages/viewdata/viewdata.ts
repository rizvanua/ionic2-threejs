import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ChartPiePage} from "./chartPie";
import {lineChartPage} from "./chartLine";

/*
  Generated class for the Viewdata page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-viewdata',
  templateUrl: 'viewdata.html'
})
export class ViewdataPage {
  charts: Array<{title: string, component: any, icon: string}>;

  constructor(public navCtrl: NavController) {
    this.charts = [
      { title: 'Pie Chart', component: ChartPiePage, icon: 'body'},
      { title: 'Line Chart', component: lineChartPage, icon: 'analytics'}
    ];
  }


  ionViewDidLoad() {
    console.log('Hello ViewdataPage Page');

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    // navigate to the new page if it is not the current page
    this.navCtrl.push(page.component);
  }



}
