
const mariadb = require("mariadb");


const pool = mariadb.createPool({
    host: 'fotosxoliki.com', 
    user:'fotosxoliki_p111898teo', 
    password: 'nC@9G3d_?i',
    connectionLimit: 1000,
    database:"fotosxoliki_inventory",
    connectTimeout:1000000
});


module.exports =  async function(req,res){


  
    var conn = await pool.getConnection();
    console.log(req.body);


    var rows = await conn.query("INSERT INTO Users VALUES (null,"+
                                                                "'"+req.body.name+ "'" +","+
                                                                "'"+req.body.nickname+"'" +","+
                                                                "'"+req.body.password+"'" +","+
                                                                "'"+req.body.role+"'" +
                                                                ");"
                                                        
                                                                );

                                                                res.send({users:rows});
                                                                conn.release();
                                                             

    

};