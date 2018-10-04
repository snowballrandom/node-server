/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('Unable to create file.');
        }
    });
    
    console.log(log);
    next();
});

//app.use((req, res, next)=>{
//  res.render('maintance.hbs',{
//      title: 'Maintance',
//      maintanceMessage: 'Sorry we are in maintance mode, be back soon!'
//  });
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('home.hbs', 
    {
        title: 'Home',
        welcomeMessage: 'Welcome to the homepage'
        
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', 
    {
        title: 'About Page'
        
    });
});

app.get('/bad', (req, res)=>{
    res.send({error: 'Bad Response'});
});

app.listen(3000, ()=>{
    console.log('Running');
});