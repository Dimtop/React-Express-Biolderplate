
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

    for(var i=0;i<req.body.products.length;i++){






        var rows = await conn.query("UPDATE Products SET name='"+req.body.products[i].name + "',"+
                                                        " code='"+req.body.products[i].code + "',"+
                                                        " positions='"+req.body.products[i].positions + "',"+
                                                        " category='"+req.body.products[i].category + "',"+
                                                        " subcategory='"+req.body.products[i].subcategory +  "',"+
                                                        " users='"+req.body.products[i].users  

                                                        
                                                        + "' WHERE id='" + req.body.products[i].id +"';") ;
    }



    conn.release();
   
    res.send({product:rows});
}