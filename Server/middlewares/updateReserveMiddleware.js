
const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: 'fotosxoliki.com', 
    user:'fotosxoliki_p111898teo', 
    password: 'nC@9G3d_?i',
    connectionLimit: 5,
    database:"fotosxoliki_inventory",
    connectTimeout:1000000
});


module.exports = async function(req,res){
    var conn = await pool.getConnection();

    console.log(req.body);


    var rows = await conn.query("UPDATE Products SET reserve="+req.body.total + " WHERE id=" + req.body.id);

    conn.release();
  
    res.send({product:rows});
}