
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
    var rows = await conn.query("SELECT * FROM Users");

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
    conn.release();

    res.send({
        user: "none",
        errorMessage: usernameFound?"Λάθος κωδικός":"Λάθος στοιχεία σύνδεσης"
    });
    return;

};