/**
 * Created by Roman on 05.12.2016.
 */
import { Component,OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';

import {SQLiteService} from "../../services/SQLiteService";
import 'chart.js/dist/Chart.bundle.min.js';
import * as _ from 'underscore';
import * as moment from 'moment';
import { default as DateRange } from 'moment-range';
import {NgForm} from "@angular/forms";
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

  public isClassVisible:boolean= false;
  public _:any=_;
  public lineChartData:Array<any> = [
    {data: [], label: 'Level 1'},
    {data: [], label: 'Level 2'},
    {data: [], label: 'Level 3'},
    {data: [], label: 'Level 4'}
  ];
  public DayDataObj:any={
    level1:{},
    level2:{},
    level3:{},
    level4:{}
  };
  public WeekDataObj:any={
    level1:{},
    level2:{},
    level3:{},
    level4:{}
  };
  public MonthDataObj:any={
    level1:{},
    level2:{},
    level3:{},
    level4:{}
  };
  public YearDataObj:any={
    level1:{},
    level2:{},
    level3:{},
    level4:{}
  };
  public RangeDataObj:any={
    level1:{},
    level2:{},
    level3:{},
    level4:{}
  };

  public WeekLableArr:Array<any>=['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  public YearLableArr:Array<any>=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    animation: false,
    responsive: true,
    maintainAspectRatio: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(public navCtrl: NavController, public SQLiteService:SQLiteService) {}
  ngOnInit(){
    let daysArr=this._.range(24);
    let monthDays=moment().daysInMonth()+1;
    let montArr=this._.range(1,monthDays);

    for(let arr = 0; arr<4; arr++) {
      /*Object for Daily*/
      this.ObjectsInitiate(this.DayDataObj, daysArr, arr);
      /*Object for Weekly*/
      this.ObjectsInitiate(this.WeekDataObj, this.WeekLableArr, arr);
      /*Object for Monthly*/
      this.ObjectsInitiate(this.MonthDataObj, montArr, arr);
      /*Object for Yearly*/
      this.ObjectsInitiate(this.YearDataObj, this.YearLableArr, arr);
    }

  }


  ionViewDidLoad() {
    this.getDayly();
  }
/*It's like function constructor of main Objects*/
  ObjectsInitiate(ObjName, ArrName, arr){
    for (let i = 0; i < ArrName.length; i++) {
      Object.defineProperty(ObjName[`level${arr+1}`], ArrName[i], {
        value: 0,
        configurable: true,
        writable: true,
        enumerable: true
      });
    }
  }


  InnerCycleFunction(ObjName,ItemName,data){
    if(data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {

        if (data.rows.item(i).level == 1) {
          ObjName.level1[data.rows.item(i)[ItemName]] = data.rows.item(i).count;
        }
        else if (data.rows.item(i).level == 2) {
          ObjName.level2[data.rows.item(i)[ItemName]] = data.rows.item(i).count;
        }
        else if (data.rows.item(i).level == 3) {
          ObjName.level3[data.rows.item(i)[ItemName]] = data.rows.item(i).count;
        }
        else {
          ObjName.level4[data.rows.item(i)[ItemName]] = data.rows.item(i).count;
        }
      }
    }

  }
/*fetch data for Day*/
  getDayly(){
    console.log('Day');
    let DaylineChartLabels=this._.range(24).map(num => ('0' + num).slice(-2));
    this.SQLiteService.getForLineChartDay('start of day').then((data) => {
      this.InnerCycleFunction(this.DayDataObj,'hoursofday',data);
      for (let arr=0; arr<4; arr++){
        this.lineChartData[arr].data=this._.map(this.DayDataObj[`level${arr+1}`], function(num){ return num; });
      }

      this.lineChartLabels=DaylineChartLabels;

    });

  }
/*fetch data for Week*/
  getWeekly(){
    console.log('Week');
      this.SQLiteService.getForLineChartWeek('-7 days').then((data) => {
        this.InnerCycleFunction(this.WeekDataObj,'dayofweek',data);
        for (let arr=0; arr<4; arr++){
          this.lineChartData[arr].data=this._.map(this.WeekDataObj[`level${arr+1}`], function(num){ return num; });
        }
        this.lineChartLabels=this.WeekLableArr;
      });
  }
  /*fetch data for Month*/
  getMonthly(){
    let monthDays=moment().daysInMonth()+1;
    this.SQLiteService.getForLineChartMonth('start of month').then((data) => {
      this.InnerCycleFunction(this.MonthDataObj,'daysofmonth',data);
      for (let arr=0; arr<4; arr++){
        this.lineChartData[arr].data=this._.map(this.MonthDataObj[`level${arr+1}`], function(num){ return num; });
      }
      this.lineChartLabels=this._.range(1,monthDays).map(num => ('0' + num).slice(-2));
    });
  }

  /*fetch data for Year*/
  getYearly(){
    this.SQLiteService.getForLineChartYear('start of year').then((data) => {
      this.InnerCycleFunction(this.YearDataObj,'monthofyear',data);
      for (let arr=0; arr<4; arr++){
        this.lineChartData[arr].data=this._.map(this.YearDataObj[`level${arr+1}`], function(num){ return num; });
      }
      this.lineChartLabels= this.YearLableArr;

    });
  }

  public RangeChart(form:NgForm){
    event.preventDefault();
    let from=`${form.value.lineChartFromDate} 00:00:00`;
    let to=`${form.value.lineChartToDate} 23:59:59`;
    let daysBetween=new DateRange(form.value.lineChartFromDate, form.value.lineChartToDate);
    let diff = daysBetween.diff('days');
    if(diff<1){
      alert('Period must be more then 1 day')
    }
    else if(diff>90){
      alert('Period of time must be not more than 90 days')
    }
    else{
      this.isClassVisible = false;
      let PrepareArray = daysBetween.toArray('days');

      var diffDatesArray=[];
      for(let y=0; y<PrepareArray.length; y++){

        diffDatesArray.push(moment(PrepareArray[y]._d).format("YYYY-MM-DD"));
        for(let lev=0; lev<4; lev++) {
          Object.defineProperty(this.RangeDataObj[`level${lev+1}`], moment(PrepareArray[y]._d).format("YYYY-MM-DD"), {
            value: 0,
            configurable: true,
            writable: true,
            enumerable: true
          });
        }
        if(y==PrepareArray.length-1){
          this.SQLiteService.getForLineChartRange(from,to).then((data) => {
            this.InnerCycleFunction(this.RangeDataObj,'rangetime',data);
            for (let arr=0; arr<4; arr++){
              this.lineChartData[arr].data=this._.map(this.RangeDataObj[`level${arr+1}`], function(num){ return num; });
            }
            this.lineChartLabels= diffDatesArray;

          });
        }
      }
    }
  }

  public closeWindow(){
    this.isClassVisible = false;
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


