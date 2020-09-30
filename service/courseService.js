
const constants = require('../constants');
var Database = require("../database/database");
var nodemailer = require('nodemailer');

module.exports.courseCreate =  async ({coursename,coursedepartment,coursedescription,courseroom,waitinglistcapacity,courseteam},callback) => {
    try {
         await Database.connectionPool.getConnection(async function(err, connection){ 
            connection.changeUser({
                database : Database.databaseName
            }, function(err) {
                if (err) {
                // console.log(err);
                    console.log("Database is not selected");
                    callback(new Error(err),null,null);
                // throw err
                }
                else {
                    if(userrole==0){
                  var coursecreate = "INSERT INTO course (coursename,coursedepartment,coursedescription,courseroom,waitinglistcapacity,courseteam)VALUES('"+coursename+"','"+coursedepartment+"','"+coursedescription+"','"+courseroom+"','"+waitinglistcapacity+"','"+courseteam+"')";
                  connection.query(coursecreate, async function (err, result, fields) {
                      if (err){
                          console.log("Query  is not executed");
                          callback(new Error(err),null,null);
                      }
                      else {
                        var coursecreate=[]
                        Object.keys(result).forEach(async function(key) {
                           var course= result[key];
                           coursecreate.push(course);  
                        });
                          var json_arr={};
                         json_arr["coursecreate"]=coursecreate;
                         callback(null, json_arr,1);    
                      }
                  });
                }else{
                    callback(null,{},2)
                }
                } // end of if database is selected//////////////////////
            });//end of changeUser
            connection.release();//release the connection
        }); // end of getConnection
          
}catch(error){
    console.log('Something went wrong: Service: courseCreate',error);
    //throw new Error(error);
    callback(new Error(error),null,null);
}
}

module.exports.Allcourse =  async ({},callback) => {
    try {
         await Database.connectionPool.getConnection(async function(err, connection){ 
              connection.changeUser({
                  database : Database.databaseName
              }, function(err) {
                  if (err) {
                      console.log("Database is not selected");
                      callback(new Error(err),null,null);
                  }else {//if database is selected
                      var allcourse = "SELECT * FROM course WHERE flag=0";
                      connection.query(allcourse, async function (err, result, fields) { //query
                          if (err){
                          console.log("Query  is not executed");
                          callback(new Error(err),null,null);
                          }else {
                              var Allcourse =[];
                              Object.keys(result).forEach(async function(key) {//query
                                var GetAllcourse = result[key]; 
                                Allcourse.push(GetAllcourse); 
                              });
                              var json_arr = {};
                              json_arr["Allcourse"] = Allcourse;
                              callback(null,json_arr,1);// type=2 means send the vaild user details
                          }
                      });
                  } // end of if database is selected
              });//end of changeUser
              connection.release();//release the connection
          }); // end of getConnection
            
  }catch(error){
      console.log('Something went wrong: Service: Allcourse',error);
      callback(new Error(error),null,null);
  }

}

module.exports.studentCourse =  async ({},callback) => {
    try {
         await Database.connectionPool.getConnection(async function(err, connection){ 
              connection.changeUser({
                  database : Database.databaseName
              }, function(err) {
                  if (err) {
                      console.log("Database is not selected");
                      callback(new Error(err),null,null);
                  }else {//if database is selected
                      var allcourse = "SELECT * FROM course WHERE flag=1";
                      connection.query(allcourse, async function (err, result, fields) { //query
                          if (err){
                          console.log("Query  is not executed");
                          callback(new Error(err),null,null);
                          }else {
                              var Allcourse =[];
                              Object.keys(result).forEach(async function(key) {//query
                                var GetAllcourse = result[key]; 
                                Allcourse.push(GetAllcourse); 
                              });
                              var json_arr = {};
                              json_arr["Allcourse"] = Allcourse;
                              callback(null,json_arr,1);// type=2 means send the vaild user details
                          }
                      });
                  } // end of if database is selected
              });//end of changeUser
              connection.release();//release the connection
          }); // end of getConnection
            
  }catch(error){
      console.log('Something went wrong: Service: studentCourse',error);
      callback(new Error(error),null,null);
  }

}
