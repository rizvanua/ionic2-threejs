import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ChartPiePage} from "./chartPie";
import {lineChartPage} from "./chartLine";
import {HttpService} from "../../services/HttpService";

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

  constructor(public navCtrl: NavController, private HttpService:HttpService) {
    this.charts = [
      { title: 'Pie Chart', component: ChartPiePage, icon: 'body'},
      { title: 'Line Chart', component: lineChartPage, icon: 'analytics'}
    ];
  }


  ionViewDidLoad() {
    /*Get data from server and push into LocalStorage*/
    window.localStorage.clear();
    this.HttpService.getTempData().subscribe((data:any) => {
      if(!data.mainData[0]) return;
      let textObj=data.mainData[0].temp;
      for (let key in textObj) {
        window.localStorage[key]=textObj[key];
      }
    });

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    // navigate to the new page if it is not the current page
    this.navCtrl.push(page.component);
  }



}
