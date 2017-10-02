var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/csv/'});
var conversion = require("phantom-html-to-pdf")();
var fs = require('fs');
var connection= require('../utils/db');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/register', upload.any(), function(req, res,next) {
	
	var body = req.body;
	
      convert2PDF(body,res);   
	
	 

	//console.log(body);

	/*  rest of the work  */
	});

 function convert2PDF(body,res){
 	var html = `<!DOCTYPE html>
			<html>
			<head>
			<style>
			table {
			    font-family: arial, sans-serif;
			    border-collapse: collapse;
			    width: 100%;
			}

			td, th {
			    border: 1px solid #dddddd;
			    text-align: left;
			    padding: 8px;
			}

			tr:nth-child(odd) {
			    background-color: #dddddd;
			}
			</style>
			</head>
			<body>

			<table>
			<tr>
			<th>Name</th>
			<th>Email</th>
			<th>Date</th>
			<th>Sex</th>
			<th>Hobbies</th>
			<th>Country</th>
			</tr>
			<tr>
			<td>${body.name}</td>
			<td>${body.email}</td>
			<td>${body.date}</td>
			<td>${body.sex}</td>
			<td>${body.hobbies}</td>
		  <td>${body.country}</td>
		    </tr>
		    </table></body>	</html>
			`;

          convertHTMLtoPDF(html,body.name)
    .then(function(fileName) {
      var user = {

		name:body.name,
		email:body.email,
		date:body.date,
		sex:body.sex,
		hobbies:body.hobbies,
		country:body.country,
		filename:fileName
	};

connection.query(`INSERT INTO users SET ?`,user,function(error,results) {
        if (error) {
            console.log(error.message);
        } else {
            
		 res.send(` <!DOCTYPE html> <html> <head></head>  <body><a href='pdf/${fileName}' >Download Pdf</a>   </body></html>`);
        }
	});

  
     })

  }

	 function convertHTMLtoPDF(html,fileName) {
	 fileName=fileName+".pdf";
		 return new Promise(function(resolve, reject) {
			 conversion({
				 html: html
			 }, function(err, pdf) {
				 var output = fs.createWriteStream("public/pdf/"+fileName);
				
				pdf.stream.pipe(output);

				 output.on("close", function() {
					 console.log("closee8********************888")
					 resolve(fileName);

				 });

				 output.on("error", function(err) {
					 reject(err);
				 });

			 });


		 });


	 }
	
module.exports = router;
