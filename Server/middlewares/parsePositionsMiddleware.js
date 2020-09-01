
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

    var query = req.body.positionsToFetch.map(e=>"id="+ e + " OR ");
    var rows = await conn.query("SELECT * FROM Positions WHERE " + query.join("").substring(0,query.join("").length-3));

    conn.release();

    res.send({positions:rows});
}