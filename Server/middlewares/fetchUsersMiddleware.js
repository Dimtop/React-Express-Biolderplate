
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
    var rows = await conn.query("SELECT * FROM Users");
    conn.release();
  
    res.send({users:rows});
}