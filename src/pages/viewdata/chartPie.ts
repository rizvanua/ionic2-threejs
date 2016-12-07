/**
 * Created by Roman on 05.12.2016.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SQLiteService} from "../../services/SQLiteService";
import 'chart.js/dist/Chart.bundle.min.js';
/*
 Generated class for the Viewdata page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'chart-pie',
  templateUrl: 'chartPie.html'
})
export class ChartPiePage {
  public data:any;
  public pieChartLabels:string[]= [];
  public pieChartData:number[]= [];
  public pieChartType:string='pie';

  constructor(public navCtrl: NavController, public SQLiteService:SQLiteService) {}


  ionViewDidLoad() {
    this.getDataBase('start of day');


  }

  getDataBase(period){
    this.SQLiteService.getForPieChart(period).then((data) => {
      let DataObj={
        countArr:[],
        unicName:[]
      };

      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          console.log(JSON.stringify(data.rows.item(i)));

          DataObj.countArr.push(data.rows.item(i).count);
          DataObj.unicName.push(data.rows.item(i).name);
        }
      }
      this.pieChartLabels=DataObj.unicName;
      this.pieChartData=DataObj.countArr;
    });

  }

  getDataBaseWeekly(period){
    this.SQLiteService.getForPieChartWeekly(period).then((data) => {
      let DataObj={
        countArr:[],
        unicName:[]
      };

      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          console.log(JSON.stringify(data.rows.item(i)));

          DataObj.countArr.push(data.rows.item(i).count);
          DataObj.unicName.push(data.rows.item(i).name);
        }
      }
      this.pieChartLabels=DataObj.unicName;
      this.pieChartData=DataObj.countArr;
    });

  }

  RangeChart(){

  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}

