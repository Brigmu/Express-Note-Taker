const express = require('express');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if(err){
            throw err;
        }
        const content = JSON.parse(data);
        return res.json(content);
    });
});

app.post("/api/notes", function(req, res){
    let newNote = req.body;
    
    res.json({response: 'ok'});
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if(err){
            throw err;
        };
        const content = JSON.parse(data);
        newNote.id = content.length + 1;
        content.push(newNote);
        fs.writeFile("db/db.json", JSON.stringify(content, null, `\t`), "utf-8", (err) =>{
            if(err) {
                throw err;
            }
            
        });
    });   

})

app.delete("/api/notes/:id", function(req, res){
    const id = req.params.id;

    res.json({response: 'ok'});
    fs.readFile("db/db.json", "utf-8", (err, data) => {
        if(err){
            throw err;
        };
        const content = JSON.parse(data);
        content.splice((id -1), 1);
        for(let i = 0; i < content.length;i++){
            content[i].id = i + 1;
        }
        fs.writeFile("db/db.json", JSON.stringify(content, null, `\t`), "utf-8", (err) =>{
            if(err) {
                throw err;
            }
            
        });
    }); 
})

app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
});