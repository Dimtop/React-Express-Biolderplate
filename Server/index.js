//LIBRARIES
const express = require('express');
const app = express();
const cors = require("cors");
const path = require('path');
const dotenv = require('dotenv');
const mariadb = require("mariadb");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
var connection = null;
const pool = mariadb.createPool({
    host: 'fotosxoliki.work', 
    user:'p111898teo_foto', 
    password: 'nC@9G3d_?i',
    connectionLimit: 50,
    database:"p111898teo_inventory",
    connectTimeout:1000000
});







//MIDDLEWARES
const loginMiddleware = require('./middlewares/loginMiddleware');
const fetchUsersMiddleware = require('./middlewares/fetchUsersMiddleware');
const fetchPositionsMiddleware = require('./middlewares/fetchPositionsMiddleware');
const fetchCategoriesMiddleware = require("./middlewares/fetchCategoriesMiddleware");
const fetchSubcategoriesMiddleware  = require("./middlewares/fetchSubcateogoriesMiddleware");
const newProductMiddleware = require('./middlewares/newProductMiddleware');
const fetchProductsMiddleware = require('./middlewares/fetchProductsMiddleware');
const fetchRolesMiddleware = require('./middlewares/fetchRolesMiddleware');
const parsePositionsMiddleware = require("./middlewares/parsePositionsMiddleware");
const updateReserveMiddleware = require("./middlewares/updateReserveMiddleware");
const updateProductMiddleware = require('./middlewares/updateProductMiddleware');
const updateUserMiddleware = require('./middlewares/updateUserMiddleware');
const newUserMiddleware = require('./middlewares/newUserMiddleware');

dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());
console.log(path.join(__dirname, "../Client/public"));
app.use(express.static(path.join(__dirname, "../Client/dist")));
app.use(express.static(path.join(__dirname, "../Client/public")));
app.use(express.static(path.join(__dirname, "../Client/public/js")));
app.use(express.static(path.join(__dirname, "../Client/public/media")));
app.use(express.static(path.join(__dirname, "../Client/public/styles")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());


//GET
app.get('/products', (req, res) => {


    res.sendFile(path.join(__dirname, "../Client/dist","index.html"));
  

});
app.get('/users', (req, res) => {


  res.sendFile(path.join(__dirname, "../Client/dist","index.html"));


});
app.get('/users/new', (req, res) => {


    res.sendFile(path.join(__dirname, "../Client/dist","index.html"));
  

});
app.get('/products', (req, res) => {


  res.sendFile(path.join(__dirname, "../Client/dist","index.html"));


});
app.get('/products/new', (req, res) => {


  res.sendFile(path.join(__dirname, "../Client/dist","index.html"));


});
app.get('/dashboard', (req, res) => {

 
    res.sendFile(path.join(__dirname, "../Client/dist","index.html"));
  

});
app.get('/login', (req, res) => {


    res.sendFile(path.join(__dirname, "../Client/dist","index.html"));
  

});

app.get('/api/test', async (req, res) => {


    var rows = await conn.query("SELECT * FROM Users WHERE id=1");
    console.log(rows);
 
   res.send({test:rows});
  
  });

app.get('/api/users',async (req,res)=>{


  var connection = await pool.getConnection();

  
  var rows = await connection.query("SELECT * FROM Users");
  connection.end();

    res.send({users:rows});
  
 

});

app.get("/api/positions",async (req,res)=>{


  var connection = await pool.getConnection();

    var rows = await connection.query("SELECT * FROM Positions");

    connection.end();

      res.send({positions:rows});
    



});

app.get("/api/categories",async (req,res)=> {

  var connection = await pool.getConnection();
 
  var rows = await connection.query("SELECT * FROM Categories");

  connection.end()
  res.send({categories:rows});

});

app.get("/api/subcategories",async (req,res)=>{

  var connection = await pool.getConnection();
 
  var rows = await connection.query("SELECT * FROM Subcategories");
  connection.end();

  res.send({subcategories:rows});

});

app.get('/api/products',async(req,res)=>{

  var connection = await pool.getConnection();
  
  var rows = await connection.query("SELECT * FROM Products");

  connection.end();

      res.send({products:rows});
   



});

app.get('/api/products/reserve',async(req,res)=>{

  var connection = await pool.getConnection();
  
  var rows = await connection.query("SELECT reserve FROM Products WHERE id='" + req.query.id + "';");

  connection.end();

      res.send({reserve:rows});
   



});

app.get('/api/roles',async (req,res)=>{

  var connection = await pool.getConnection();
  

  var rows = await connection.query("SELECT * FROM Roles");

  connection.end();

  res.send({roles:rows});




});

//POST 
app.post('/api/login', async(req,res)=>{

  var connection = await pool.getConnection();
 
  var rows =  await connection.query("SELECT * FROM Users");

  var usernameFound = false;
  var passwordFound = false;

  console.log(req.body.nickname);

  for(var i=0;i<rows.length;i++){

      usernameFound = false
      passwordFound = false;

     
      if(rows[i].nickname == req.body.nickname){

          usernameFound = true;

          if(rows[i].password == req.body.password){

              passwordFound = true;
              
              console.log("FOUND: ");

              console.log( rows[i]);

              res.cookie('name', rows[i].name, { httpOnly: false });
			  res.cookie('username', rows[i].nickname, { httpOnly: false });
              res.cookie('id', rows[i].id, { httpOnly: false });
              res.cookie('role', rows[i].role, { httpOnly: false });
              res.send({
                  user:  rows[i],
                  errorMessage: ""
              });

              return;

        
          }
      }
  }
  connection.end();


  res.send({
      user: "none",
      errorMessage: usernameFound?"Λάθος κωδικός":"Λάθος στοιχεία σύνδεσης"
  });
  return;
});

app.post('/api/products', async (req,res)=>{

  var connection = await pool.getConnection();
  
  var photoLinks = "";
 
  for(var i=0;i<Object.values(req.files).length;i++){
      var photo = Object.values(req.files)[i];
      photo.mv(path.join('images',Object.values(req.files)[i].name));
      photoLinks += process.env.PREFIX + path.join('images',Object.values(req.files)[i].name);
  }
  

  var rows = await connection.query("INSERT INTO Products VALUES (null,"+
                                                              "'"+req.body.name+ "'" +","+
                                                              "'"+req.body.description+"'" +","+
                                                              "'"+req.body.code+"'" +","+
                                                              "'"+req.body.reserve +"'" + ","+
                                                              "'"+req.body.positions.replace(",","|") +"'" + ","+
                                                              "'"+req.body.categories.replace(",","|") +"'" + ","+
                                                              "'"+req.body.subCategories.replace(",","|") +"'" + ","+
                                                              "'"+req.body.users.replace(",","|")+"'" + "," +
                                                              "'"+photoLinks +"'" +
                                                              ");"
                                                      
                                                              );

                                                              connection.end();
	res.send({success:rows});
                                                         
});

app.post("/api/positions/parsed", async (req,res)=>{
 
  var connection = await pool.getConnection();
  console.log(req.body);
  
  var query = req.body.positionsToFetch.map(e=>"id="+ e + " OR ");
  var rows = await connection.query("SELECT * FROM Positions WHERE " + query.join("").substring(0,query.join("").length-3));

  connection.end();

  res.send({positions:rows});

});

app.post("/api/products/reserve", async (req,res)=>{
 // var conn = await pool.getConnection();

  console.log(req.body);
  var connection = await pool.getConnection();

  var rows = await connection.query("UPDATE Products SET reserve="+req.body.total + " WHERE id=" + req.body.id);

  connection.end();

  res.send({product:rows});

});

app.post("/api/products/update", async(req,res)=>{
//  var conn = await pool.getConnection();

var connection = await pool.getConnection();

  console.log(req.body);

  for(var i=0;i<req.body.products.length;i++){






      var rows = connection.query("UPDATE Products SET name='"+req.body.products[i].name + "',"+
                                                      " code='"+req.body.products[i].code + "',"+
                                                      " positions='"+req.body.products[i].positions + "',"+
                                                      " category='"+req.body.products[i].category + "',"+
                                                      " subcategory='"+req.body.products[i].subcategory +  "',"+
                                                      " users='"+req.body.products[i].users  

                                                      
                                                      + "' WHERE id='" + req.body.products[i].id +"';") ;
  }



  connection.end();
 
  res.send({product:rows});

});

app.post("/api/users/update",async (req,res)=>{
  //var conn = await pool.getConnection();

  var connection = await pool.getConnection();

  console.log(req.body);

  for(var i=0;i<req.body.users.length;i++){






      var rows = await connection.query("UPDATE Users SET name='"+req.body.users[i].name + "',"+
                                                      " nickname='"+req.body.users[i].nickname + "',"+
                                                      " password='"+req.body.users[i].password + "',"+
                                                      " role='"+req.body.users[i].role

                                                      
                                                      + "' WHERE id='" + req.body.users[i].id +"';") ;
  }


  connection.end();

  res.send({product:rows});

});

app.post("/api/users", async (req,res)=>{

  var connection = await pool.getConnection();
 
  var rows = await connection.query("INSERT INTO Users VALUES (null,"+
  "'"+req.body.name+ "'" +","+
  "'"+req.body.nickname+"'" +","+
  "'"+req.body.password+"'" +","+
  "'"+req.body.role+"'" +
  ");"

  );

  connection.end();
  res.send({users:rows});


});


app.get("/test",async (req,res)=>{
     var customers = Customer.find();
     console.log(customers);
;});
app.listen(5000, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});