/**
 * Created by Roman on 05.12.2016.
 */
import { Component,OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';

import {HttpService} from "../../services/HttpService";
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

  public onShowHideRawData:boolean=false;
  public rawData:any=[];
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
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,// start scale from zero and prohibit a negative number
          stepSize: 1 // only integer
        }
      }]
    }
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

  constructor(public navCtrl: NavController, public HttpService:HttpService) {}
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
    this.getDaily();
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


  InnerCycleFunction(ObjName,data){
    if(data.mainData.length > 0) {
      for (let i = 0; i < data.mainData.length; i++) {
        if (data.mainData[i]._id.level == 1) {
          ObjName.level1[data.mainData[i]._id.time] = data.mainData[i].count;
        }
        else if (data.mainData[i]._id.level == 2) {
          ObjName.level2[data.mainData[i]._id.time] = data.mainData[i].count;
        }
        else if (data.mainData[i]._id.level == 3) {
          ObjName.level3[data.mainData[i]._id.time] = data.mainData[i].count;
        }
        else {
          ObjName.level4[data.mainData[i]._id.time] = data.mainData[i].count;
        }
      }
    }

  }
/*fetch data for Day*/
  getDaily(){
    let start = moment().startOf('day').toDate().toISOString();
    let end = moment().endOf('day').toDate().toISOString();
    this.getDataBaseTest(start,end);
    let DaylineChartLabels=this._.range(24).map(num => ('0' + num).slice(-2));
    this.HttpService.getDataLineDay(start, end).subscribe((data:any)=>{
      this.InnerCycleFunction(this.DayDataObj,data);
      for (let arr=0; arr<4; arr++){
        this.lineChartData[arr].data=this._.map(this.DayDataObj[`level${arr+1}`], function(num){ return num; });
      }
      this.lineChartLabels=DaylineChartLabels;
    });


  }
/*fetch data for Week*/
  getWeekly(){
    let start = moment().startOf('week').toDate().toISOString();
    let end = moment().endOf('week').toDate().toISOString();
    this.getDataBaseTest(start,end);
    this.HttpService.getDataLineWeek(start, end).subscribe((data) => {
        this.InnerCycleFunction(this.WeekDataObj,data);
        for (let arr=0; arr<4; arr++){
          this.lineChartData[arr].data=this._.map(this.WeekDataObj[`level${arr+1}`], function(num){ return num; });
        }
        this.lineChartLabels=this.WeekLableArr;
      });
  }
  /*fetch data for Month*/
  getMonthly(){
    let start = moment().startOf('month').toDate().toISOString();
    let end = moment().endOf('month').toDate().toISOString();
    this.getDataBaseTest(start,end);
    let monthDays=moment().daysInMonth()+1;
    this.HttpService.getDataLineMonth(start, end).subscribe((data) => {
      this.InnerCycleFunction(this.MonthDataObj,data);
      for (let arr=0; arr<4; arr++){
        this.lineChartData[arr].data=this._.map(this.MonthDataObj[`level${arr+1}`], function(num){ return num; });
      }

      this.lineChartLabels=this._.range(1,monthDays).map(num => ('0' + num).slice(-2));
    });
  }

  /*fetch data for Year*/
  getYearly(){
    let start = moment().startOf('year').toDate().toISOString();
    let end = moment().endOf('year').toDate().toISOString();
    this.getDataBaseTest(start,end);
    this.HttpService.getDataLineYear(start, end).subscribe((data) => {
      this.InnerCycleFunction(this.YearDataObj,data);
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

      let diffDatesArray=[];
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
          this.getDataBaseTest(from,to);
          this.HttpService.getDataLineRange(from,to).subscribe((data) => {
            this.InnerCycleFunction(this.RangeDataObj,data);
            for (let arr=0; arr<4; arr++){
              this.lineChartData[arr].data=this._.map(this.RangeDataObj[`level${arr+1}`], function(num){ return num; });
            }
            this.lineChartLabels= diffDatesArray;

          });
        }
      }
    }
  }
  //rowData for Test
  public getDataBaseTest(start,end){
    let localRawData:any=[];
    this.HttpService.getTestData(start,end).subscribe((data:any) => {
      if(data.mainData.length>0){
        data.mainData.forEach((item,i)=>{
          localRawData.push(JSON.stringify(data.mainData[i]));
        });
      }
      this.rawData=localRawData;

    });

  };
  //


  public closeWindow(){
    this.isClassVisible = false;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }



}
