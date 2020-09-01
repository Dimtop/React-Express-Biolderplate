
const mariadb = require("mariadb");


const pool = mariadb.createPool({
    host: 'fotosxoliki.com', 
    user:'fotosxoliki_p111898teo', 
    password: 'nC@9G3d_?i',
    connectionLimit: 5,
    database:"fotosxoliki_inventory",
    connectTimeout:1000000
});


module.exports =  async function(req,res){

    var conn = await pool.getConnection();
  
    var photoLinks = "";
   
    for(var i=0;i<Object.values(req.files).length;i++){
        var photo = Object.values(req.files)[i];
        photo.mv(__dirname+'test'+i+'.png');
        photoLinks += __dirname+'test'+i+'.png|'
    }

    var rows = await conn.query("INSERT INTO Products VALUES (null,"+
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

                                                                conn.release();
                                                     

};