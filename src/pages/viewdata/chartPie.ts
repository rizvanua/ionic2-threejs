/**
 * Created by Roman on 05.12.2016.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import 'chart.js/dist/Chart.bundle.min.js';
import {NgForm} from "@angular/forms";
import {ViewChild} from "@angular/core/src/metadata/di";
import {HttpService} from "../../services/HttpService";
import * as moment from 'moment';
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

  constructor(public navCtrl: NavController,private httpService:HttpService) {}


  ionViewDidLoad() {
        this.getDataPie('day');



  }
  //rowData for Test
  public getDataBaseTest(start,end){
    let localRawData:any=[];
    this.httpService.getTestData(start,end).subscribe((data:any) => {
      if(data.mainData.length>0){
        data.mainData.forEach((item,i)=>{
          localRawData.push(JSON.stringify(data.mainData[i]));
        });
      }
      this.rawData=localRawData;

    });

  };
  //
  public dataBaseFunction(start,end){
    this.httpService.getDataPie(start,end).subscribe(
      (data:any)=>{
        let mainData=data.mainData;
        this.pieChartLabels=mainData.map((e)=>{
          return e._id.name;
        });
        this.pieChartData=mainData.map((e)=>{
          return e.count;
        });
      }
    );
  }

  public getDataPie(period){
    let start = moment().startOf(period).toDate().toISOString();
    let end = moment().endOf(period).toDate().toISOString();

    this.getDataBaseTest(start,end);//test
    this.dataBaseFunction(start,end);
  }

  public getDataPieRange(form:NgForm){
    event.preventDefault();
    this.isClassVisible = false;
    let start=`${form.value.lineChartFromDate} 00:00:00`;
    let end=`${form.value.lineChartToDate} 23:59:59`;
    this.getDataBaseTest(start,end);//test
    this.dataBaseFunction(start,end);

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

