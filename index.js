const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql2");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.set("view engine" , " ejs");
app.set("views" , path.join(__dirname , "/views"));
app.use(express.static(path.join(__dirname, "/public")));

// create connection with mysql..
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'lib_Manag',
    password :'mithi@1234'
});

// show all books
app.get("/books" , (req,res) =>{
    let q =`SELECT * FROM books`;
    try{
        connection.query(q,(err , books)=>{
            if(err) throw err;
            res.render("showAll.ejs",{books});
        });
    }catch(err){
        console.log(err);
        res.send("some error occured in DB");
    }

});

// Add new book
app.get("/books/new" , (req,res)=>{
    res.render("new.ejs");
});
app.post("/books" , (req,res)=>{
    let {B_id , B_name , B_author , B_publishingDate} =  req.body;
    let q2 = `INSERT INTO books (B_id , B_name , B_author , B_publishingDate) VALUES (?,?,?,?)`;
    try{
        connection.query(q2,[B_id , B_name , B_author , B_publishingDate],(err , result)=>{
            if(err) throw err;
            res.redirect("/books");
        });
    }catch(err){
        console.log(err);
        res.send("some error occured in DB");
    }

});


//update book
app.get("/books/:id/edit" ,(req , res)=>{
    let{id} =  req.params;
    let q3 = `SELECT * FROM books WHERE B_id= ? `
    try{
        connection.query(q3,[id] , (err , result)=>{
            if(err) throw err;
            res.render("edit.ejs" ,{book : result[0]});
        });
    }catch(err){
        console.log(err);
        res.send("some error occured in DB");
    }

});
app.patch("/books/:id", (req, res)=>{
    let {id} = req.params;
    let{B_name : newName ,B_author : newAuthor } =  req.body;
    let q4 = `SELECT * FROM  books WHERE B_id = ? `;
    try{
        connection.query(q4,[id] , (err , result)=>{
            if(err) throw err;
            let CurrentAuthor = result[0].B_author;
            if(newAuthor != CurrentAuthor){  
                res.send("Invalid Author name");
            }else{
                let q5 = `UPDATE books SET B_name = ? WHERE B_id = ?`;
                connection.query(q5,[newName , id] , (err , result) =>{
                    res.redirect("/books");
                });
            }
        });
    }catch(err){
        console.log(err);
        res.send("some error occured in DB");
    }
});


// Delete book
app.delete("/books/:B_id" , (req,res)=>{
    let{B_id} = req.params;
    let q6 = `DELETE FROM books WHERE B_id = ? `;
    try{
        connection.query(q6,[B_id],(err,result) =>{
            if(err) throw err;
            res.redirect("/books");
        })
    }catch(err){
        console.log(err);
        res.send("some err ocurred in DB");
    }
})


app.listen("8080" , () =>{
    console.log("app is lisetning to port 8080");
})