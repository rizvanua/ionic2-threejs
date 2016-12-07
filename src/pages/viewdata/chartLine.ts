/**
 * Created by Roman on 05.12.2016.
 */
import { Component,OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';

import {SQLiteService} from "../../services/SQLiteService";
import 'chart.js/dist/Chart.bundle.min.js';
import * as _ from 'underscore';
import *as moment from 'moment';
/*
 Generated class for the Viewdata page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'chart-line',
  templateUrl: 'chartLine.html'
})
export class lineChartPage implements OnInit {
  public _:any=_;
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];
  public DayDataObj:any={};
  public WeekDataObj:any={};
  public MonthDataObj:any={};
  public YearDataObj:any={};

  public WeekLableArr:Array<any>=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public YearLableArr:Array<any>=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    label: false,
    animation: false,
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  constructor(public navCtrl: NavController, public SQLiteService:SQLiteService) {}
  ngOnInit(){
    let daysArr=this._.range(24);
    for(let i=0; i<daysArr.length; i++){
      Object.defineProperty(this.DayDataObj, daysArr[i],{value:0, configurable: true, writable: true, enumerable: true });
    }

    for(let i=0; i<this.WeekLableArr.length; i++){
      Object.defineProperty(this.WeekDataObj, this.WeekLableArr[i],{value:0, configurable: true, writable: true, enumerable: true });
    }

    let monthDays=moment().daysInMonth()+1;
    let montArr=this._.range(1,monthDays);
    for(let i=0; i<montArr.length; i++){

      Object.defineProperty(this.MonthDataObj, montArr[i],{value:0, configurable: true, writable: true, enumerable: true });
    }

    for(let i=0; i<this.YearLableArr.length; i++){
      Object.defineProperty(this.YearDataObj, this.YearLableArr[i],{value:0, configurable: true, writable: true, enumerable: true });
    }

  }


  ionViewDidLoad() {
    this.getDayly();
    console.log(this.DayDataObj);
    console.log(this.WeekDataObj);
    console.log(this.MonthDataObj);
    console.log(this.YearDataObj);
  }

  getDataBase(arr,period,format){
    console.log(arr);
    this.SQLiteService.getForLineChart(period).then((data) => {
           if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
         console.log(data.rows.item(i).dayofweek);
          let date=data.rows.item(i).time;
          this._.filter(arr, function(num){
            if (num==moment(date).format(format))

            {console.log(num+': '+date)}

          });

          /*console.log(JSON.stringify(data.rows.item(i)));*/

          /*DataObj.countArr.push(data.rows.item(i).count);
          DataObj.unicName.push(data.rows.item(i).name);*/
        }
      }

    });

  }

  getDayly(){
    let DaylineChartLabels=this._.range(24).map(num => ('0' + num).slice(-2));
    /*this.getDataBase(this.lineChartLabels,'start of day','H');*/
    this.SQLiteService.getForLineChartDay('start of day').then((data) => {
      if(data.rows.length > 0) {

          for(var i = 0; i < data.rows.length; i++) {
            console.log(JSON.stringify(data.rows.item(i).hoursofday));
            this.DayDataObj[data.rows.item(i).hoursofday]=data.rows.item(i).count;

          }
          console.log(JSON.stringify(this.DayDataObj));
        console.log(JSON.stringify(this.DayDataObj));
          let toArr=this._.map(this.DayDataObj, function(num){ return num; });
          this.lineChartData[0].data=toArr;
          this.lineChartLabels=DaylineChartLabels;

      }

    });

  }

  getWeekly(){



      this.SQLiteService.getForLineChartWeek('-7 days').then((data) => {
        if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            console.log(JSON.stringify(data.rows.item(i)));
            console.log(this.WeekDataObj[data.rows.item(i).dayofweek]);
            this.WeekDataObj[data.rows.item(i).dayofweek]=data.rows.item(i).count;

          }
          console.log(this.lineChartData[0].data);
          let toArr=this._.map(this.WeekDataObj, function(num){ return num; });
          this.lineChartData[0].data=toArr;
          console.log(toArr);
          console.log(this.lineChartData[0].data);
          this.lineChartLabels=this.WeekLableArr;

        }

      });
  }

  getMonthly(){
    let monthDays=moment().daysInMonth()+1;
    /*this.getDataBase(this.lineChartLabels,'start of month','D');*/

    this.SQLiteService.getForLineChartMonth('start of month').then((data) => {
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          console.log(JSON.stringify(data.rows.item(i)));
          console.log(this.MonthDataObj[data.rows.item(i).daysofmonth]);
          this.MonthDataObj[data.rows.item(i).daysofmonth]=data.rows.item(i).count;

        }
        console.log(JSON.stringify(this.MonthDataObj));
        console.log(this.lineChartData[0].data);
        let toArr=this._.map(this.MonthDataObj, function(num){ return num; });
        this.lineChartData[0].data=toArr;
        console.log(toArr);
        console.log(this.lineChartData[0].data);
        this.lineChartLabels=this._.range(1,monthDays).map(num => ('0' + num).slice(-2));

      }

    });
  }

  getYearly(){

    this.SQLiteService.getForLineChartYear('start of year').then((data) => {
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          console.log(JSON.stringify(data.rows.item(i)));
          console.log(this.YearDataObj[data.rows.item(i).monthofyear]);
          this.YearDataObj[data.rows.item(i).monthofyear]=data.rows.item(i).count;

        }
        console.log(this.lineChartData[0].data);
        let toArr=this._.map(this.YearDataObj, function(num){ return num; });
        this.lineChartData[0].data=toArr;
        console.log(toArr);
        console.log(this.lineChartData[0].data);
        this.lineChartLabels= this.YearLableArr;
      }

    });
  }

  RangeChart(){

  }

  public randomize():void {
    /*let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;*/
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}


