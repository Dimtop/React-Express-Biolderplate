
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

    for(var i=0;i<req.body.users.length;i++){






        var rows = await conn.query("UPDATE Users SET name='"+req.body.users[i].name + "',"+
                                                        " nickname='"+req.body.users[i].nickname + "',"+
                                                        " password='"+req.body.users[i].password + "',"+
                                                        " role='"+req.body.users[i].role

                                                        
                                                        + "' WHERE id='" + req.body.users[i].id +"';") ;
    }


    conn.release();

    res.send({product:rows});
}