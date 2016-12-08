/**
 * Created by Roman on 29.11.2016.
 */
import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class SQLiteService{
  public db:SQLite=new SQLite();
  public dbName:string='data.db';
  public dbLocation:string='default';

  openDatabase(){
   return this.db.openDatabase({
      name: this.dbName,
      location: this.dbLocation // the location field is required
    })
  }

  createMainDB(){
    this.openDatabase().then(() => {
      this.db.executeSql('CREATE TABLE IF NOT EXISTS historyData ( id INTEGER PRIMARY KEY AUTOINCREMENT, level INTEGER, name VARCHAR(32), point TEXT, face TEXT,  time DATE )', {}).then((data) => {
        console.log("TABLE historyData CREATED: " + JSON.stringify(data));
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

  createAuthDB(){
    this.openDatabase().then(() => {
      this.db.executeSql('CREATE TABLE IF NOT EXISTS appAuth ( firstName TEXT, lastName TEXT, email TEXT, gender TEXT,  age INTEGER, password TEXT )', {}).then((data) => {
        console.log("TABLE appAuth CREATED: "+ JSON.stringify(data));


      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

  insertIntoAuthDB(regData){
    console.log(regData);
    this.openDatabase().then(() => {
      this.db.executeSql('INSERT OR REPLACE INTO appAuth ( firstName, lastName, email, gender, age, password  ) VALUES ( ?,?,?,?,?,?)', ['0ne','two','three','four','five', 'six']).then((data) => {
        console.log("there are: "+ data);
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

  insertIntoMainDB(textObj){
    this.openDatabase().then(() => {
      this.db.executeSql('INSERT INTO historyData (level, name, point, face,  time ) VALUES ( ?, ?, ?, ?, datetime("now", "localtime") )', [textObj.level, textObj.name, textObj.point, textObj.face]).then((data) => {
        console.log("there are: "+ data);
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

  getFromAuthDB(){

    this.openDatabase().then(() => {
      this.db.executeSql('SELECT * FROM appAuth',[]).then((data) => {
        console.log("getFromAuthDB: "+data.rows.length);
        if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            console.log(JSON.stringify(data.rows.item(i)));
          }
        }
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });

  }

  getFromMainDB(){

    this.openDatabase().then(() => {
      this.db.executeSql('SELECT * FROM historyData',[]).then((data) => {
        console.log("getFromAuthDB: "+data.rows.length);
        if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            console.log(JSON.stringify(data.rows.item(i)));
          }
        }
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });

  }


  getForPieChart(period){
   return this.db.executeSql('SELECT COUNT(*) AS count, name FROM historyData WHERE time BETWEEN datetime("now", "localtime", ?) AND datetime("now", "localtime") GROUP BY name',[period]);
  }

  getForPieChartWeekly(period){
    return this.db.executeSql('SELECT COUNT(*) AS count, name FROM historyData WHERE DATE(time) >= DATE("now", "weekday 0", ?) GROUP BY name',[period]);
  }

  getForPieChartRange(from,to){
    return this.db.executeSql('SELECT COUNT(*) AS count, name FROM historyData WHERE time BETWEEN ? AND ? GROUP BY name',[from,to]);
  }

  getForLineChart(period){
    return this.db.executeSql('SELECT * FROM historyData WHERE time BETWEEN datetime("now", "localtime", ?) AND datetime("now", "localtime")',[period]);
  }

  getForLineChartRange(from,to){
    return this.db.executeSql('SELECT level, COUNT(*) AS count, cast ( strftime ("%Y-%m-%d", time) as TEXT) as rangetime FROM historyData WHERE time BETWEEN ? AND ? GROUP BY rangetime, level',[from,to ]);
  }

  getForLineChartDay(period){
    return this.db.executeSql('SELECT level, COUNT(*) AS count, cast ( strftime ("%H", time) as integer) as hoursofday FROM historyData WHERE time BETWEEN datetime("now", "localtime", ?) AND datetime("now", "localtime") GROUP BY hoursofday, level',[period]);
  }

  getForLineChartWeek(period){
    return this.db.executeSql('SELECT level, COUNT(*) AS count, case cast ( strftime ("%w", time) as integer ) when 0 then "Sunday"  when 1 then "Monday"  when 2 then "Tuesday" when 3 then "Wednesday" when 4 then "Thursday"  when 5 then "Friday" else "Saturday" end as dayofweek FROM historyData WHERE DATE(time) >= DATE("now", "weekday 0", ?) GROUP BY dayofweek, level',[period]);
  }

  getForLineChartMonth(period){
    return this.db.executeSql('SELECT level, COUNT(*) AS count, cast ( strftime ("%d", time) as integer) as daysofmonth FROM historyData WHERE time BETWEEN datetime("now", "localtime", ?) AND datetime("now", "localtime") GROUP BY daysofmonth, level',[period]);
  }

  getForLineChartYear(period){
    return this.db.executeSql('SELECT level, COUNT(*) AS count, case strftime("%m", time) when "01" then "January" when "02" then "Febuary" when "03" then "March" when "04" then "April" when "05" then "May" when "06" then "June" when "07" then "Jul" when "08" then "August" when "09" then "September" when "10" then "October" when "11" then "November" when "12" then "December" else "" end as monthofyear FROM historyData WHERE time BETWEEN datetime("now", "localtime", ?) AND datetime("now", "localtime") GROUP BY monthofyear, level',[period]);
  }




  dropTable(){
    this.openDatabase().then(() => {
      this.db.executeSql('DROP TABLE IF EXISTS appAuth ',null).then((data) => {
        console.log("dropTable: "+JSON.stringify(data));
        if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            console.log(JSON.stringify(data.rows.item(i)));
          }
        }
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    })
  }

  showAllTables2(){
    this.openDatabase().then(() => {
      this.db.executeSql('SELECT name FROM sqlite_master WHERE type="table"',null).then((data) => {
        console.log("showAllTables2: "+JSON.stringify(data));
        if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            console.log(JSON.stringify(data.rows.item(i)));
          }
        }
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    })
  }

  showAllTables3(){
    this.openDatabase().then(() => {
      this.db.executeSql('SELECT name FROM sqlite_temp_master WHERE type="table"',null).then((data) => {
        console.log("showAllTables3: "+JSON.stringify(data));
        if(data.rows.length > 0) {
          for(var i = 0; i < data.rows.length; i++) {
            console.log(JSON.stringify(data.rows.item(i)));
          }
        }
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    })
  }





}
