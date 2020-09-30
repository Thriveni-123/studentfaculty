
const constants = require('../constants');
var Database = require("../database/database");
var nodemailer = require('nodemailer');

module.exports.ProfileAdd =  async (req,callback) => {
    console.log(req)
    try {
        var name=req.name
        var email=req.email
        var phonenumber=req.phonenumber
        var aboutme=req.aboutme
        var city=req.city
        var country=req.country
        var company=req.company
        var school=req.school
        var hometown=req.hometown
        var language=req.language
        var gender=req.gender
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
                    var image;
                    var timestamp = Number(new Date());
                    var file = req.files.image.name;
                    filename = timestamp+"-"+image;
                    file.mv("./upload"+filename,function(err){
                    var filepath="upload/"+filename;
                  var profileAdd = "INSERT INTO profile (image,name,email,phonenumber,aboutme,city,country,company,school,hometown,language,gender)VALUES('"+filepath+"','"+name+"','"+email+"',"+phonenumber+",'"+aboutme+"','"+city+"','"+country+"','"+company+"','"+school+"','"+hometown+"','"+language+"','"+gender+"')";
                  connection.query(profileAdd, async function (err, result, fields) {
                      if (err){
                          console.log("Query  is not executed");
                          callback(new Error(err),null,null);
                      }
                      else {
                        var profileAdd=[]
                        Object.keys(result).forEach(async function(key) {
                           var profile= result[key];
                           profileAdd.push(profile);  
                        });
                          var json_arr={};
                         json_arr["profileAdd"]=profileAdd;
                         callback(null, json_arr,1);    
                      }
                  });
              });
                } // end of if database is selected
            });//end of changeUser
            connection.release();//release the connection
        }); // end of getConnection   
}catch(error){
    console.log('Something went wrong: Service: ProfileAdd',error);
    //throw new Error(error);
    callback(new Error(error),null,null);
}
}


module.exports.ProfileUpdate=  async (req,callback) => {
    console.log(req)
    try {
        var name=req.name
        var email=req.email
        var phonenumber=req.phonenumber
        var aboutme=req.aboutme
        var city=req.city
        var country=req.country
        var company=req.company
        var school=req.school
        var hometown=req.hometown
        var language=req.language
        var gender=req.gender
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
                    var timestamp = Number(new Date());
                    var file = req.files.file.name;
                    filename = timestamp+"-"+file.name;
                    file.mv("./upload"+filename,function(err){
                    var filepath="upload/"+filename;
                  var profileUpdate = "UPDATE  profile SET(image='"+filepath+"',name='"+name+"',email='"+email+"',phonenumber="+phonenumber+",aboutme='"+aboutme+"',city='"+city+"',country='"+country+"',company='"+company+"',school='"+school+"',hometown='"+hometown+"',language='"+language+"',gender='"+gender+"')";
                  connection.query(profileUpdate, async function (err, result, fields) {
                      if (err){
                          console.log("Query  is not executed");
                          callback(new Error(err),null,null);
                      }
                      else {
                        var profileAdd=[]
                        Object.keys(result).forEach(async function(key) {
                           var profile= result[key];
                           profileAdd.push(profile);  
                        });
                          var json_arr={};
                         callback(null, json_arr,1);    
                      }
                  });
              });
                } // end of if database is selected
            });//end of changeUser
            connection.release();//release the connection
        }); // end of getConnection   
}catch(error){
    console.log('Something went wrong: Service: ProfileUpdate',error);
    //throw new Error(error);
    callback(new Error(error),null,null);
}
}
