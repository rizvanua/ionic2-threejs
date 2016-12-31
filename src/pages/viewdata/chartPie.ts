/**
 * Created by Roman on 05.12.2016.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SQLiteService} from "../../services/SQLiteService";
import 'chart.js/dist/Chart.bundle.min.js';
import {NgForm} from "@angular/forms";
import {ViewChild} from "@angular/core/src/metadata/di";
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
  @ViewChild('pieChart') pieChart;
  public isClassVisible:boolean= false;
  public data:any;
  public onShowHideRawData:boolean=false;
  public rawData:any=[];
  public getDatasetMeta:any;
  public pieChartLabels:string[]= [];
  public pieChartData:number[]= [];
  public pieChartType:string='pie';
  public pieOptions:any={
    responsive: true,
    maintainAspectRatio: false, //maintainAspectRatio has unpredictable in this version of chart.js, so we put it in fasle
    events:[],//prohibit all events
    tooltips:{
      enabled:false,//prohibit all tooltips are raised with events
      displayColors:false,
      callbacks: {
        label: function (tooltipItem, data) {
          let index=tooltipItem.index;
          data.datasets[0].data[index];
          return `${data.datasets[0].data[index]}`;
        }
      }
    },
    animation:{
      onComplete: function() {//function to show all tooltips at once a chart is loaded
          let ctx = this.chart.ctx;
        console.log(ctx);

        ctx.font = '18px Arial';

        ctx.textAlign = "top";

        ctx.fillStyle = "#000000";



        this.data.datasets.forEach((dataset, datasetIndex)=> {

          let meta = this.getDatasetMeta(datasetIndex),

            total = 0, //total values to compute fraction

            labelxy = [],

            offset = Math.PI / 2, //start sector from top

            radius,

            centerx,

            centery,

            lastend = 0; //prev arc's end line: starting with 0

          for (let val of dataset.data) { total += val; }



          meta.data.forEach((element, index)=> {

            radius = 0.9 * element._model.outerRadius - element._model.innerRadius;

            centerx = element._model.x;

            centery = element._model.y;

            let thispart = dataset.data[index],

              arcsector = Math.PI * (2 * thispart / total);

            if (element.hasValue() && dataset.data[index] > 0) {

              labelxy.push(lastend + arcsector / 2 + Math.PI + offset);

            }

            else {
              labelxy.push(-1);
            }

            lastend += arcsector;

          });



          let lradius = radius * 3 / 4;

          for (let idx in labelxy) {

            if (labelxy[idx] === -1) continue;

            let langle = labelxy[idx],

              dx = centerx + lradius * Math.cos(langle),

              dy = centery + lradius * Math.sin(langle),

              val:any = dataset.data[idx];

            ctx.fillText(val, dx, dy);
          }
        });

      }

    }
  };

  constructor(public navCtrl: NavController, public SQLiteService:SQLiteService) {}


  ionViewDidLoad() {
    this.getDataBase('start of day');
    this.getDataBaseTest('start of day');
    /*Test Only data. Remove from poduction version*/
    this.pieChartLabels= ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    this.pieChartData= [300, 500, 100];
    /**/

  }
  /*rowData for Test*/

  public getDataBaseTest(period){

    let localRawData:any=[];
    this.SQLiteService.getForPieChartRowData(period).then((data) => {
      if(data.rows.length>0){
        for(var i = 0; i < data.rows.length; i++) {
          localRawData.push(JSON.stringify(data.rows.item(i)));
        }
      }
      this.rawData=localRawData;

    });

  };

  getDataBaseWeeklyTest(period){
    let localRawData:any=[];
    this.SQLiteService.getForPieChartWeeklyRowData(period).then((data) => {
      if(data.rows.length>0){
        for(var i = 0; i < data.rows.length; i++) {
          localRawData.push(JSON.stringify(data.rows.item(i)));
        }
        this.rawData=localRawData;
      }

    });
  }
  RangeChartTest(form:NgForm){
    event.preventDefault();
    let localRawData:any=[];
    this.isClassVisible = false;
    let from=`${form.value.lineChartFromDate} 00:00:00`;
    let to=`${form.value.lineChartToDate} 23:59:59`;
    this.SQLiteService.getChartRangeRowData(from,to).then((data) => {

      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {

          localRawData.push(JSON.stringify(data.rows.item(i)));

        }
        this.rawData=localRawData;
      }

    });

  }
  /**/

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

  RangeChart(form:NgForm){
    event.preventDefault();
    this.isClassVisible = false;
    let from=`${form.value.lineChartFromDate} 00:00:00`;
    let to=`${form.value.lineChartToDate} 23:59:59`;
    this.SQLiteService.getForPieChartRange(from,to).then((data) => {
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

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public closeWindow(){
    this.isClassVisible = false;
  }

}

