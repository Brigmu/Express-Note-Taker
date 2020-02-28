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
    // res.sendFile(path.join(__dirname, "public/assets/css/styles.css"));
    // res.sendFile(path.join(__dirname, "public/assets/js/index.js"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("/api/notes", function(req, res) {
    
})

app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
})