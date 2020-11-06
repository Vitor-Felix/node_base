const express = require('express');
const path = require('path')
const bodyParser = require("body-parser");

const routes = require('./routes');

/**
 * Organize these configurations somewhere later
 */
//Connect to DB 
const mongoose = require("mongoose"); 
const mongoURI = 'mongodb+srv://mongo_user:mongo_pass@cluster0.myq9j.mongodb.net/<dbname>?retryWrites=true&w=majority'; 
const conn = mongoose.createConnection(mongoURI); 
conn.once("open", () => { console.log("Connection Successful"); });
//https://medium.com/swlh/uploading-images-to-mongodb-with-multer-ed345f2922ba
// Create storage engine 
const storage = new GridFsStorage({ 
  url: mongoURI, 
  file: (req, file) => { 
    return new Promise((resolve, reject) => { 
      crypto.randomBytes(16, (err, buf) => { 
        if (err) { return reject(err); }

        const filename = file.originalname; 
        const fileInfo = { filename: filename, bucketName: "uploads" }; 
        resolve(fileInfo); 
      }); 
    }); 
  } 
}); 

const upload = multer({ storage });
/**
 * Organize these configurations somewhere later
 */

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.static(path.join(__dirname, 'public')))
    this.server.set('views', path.join(__dirname, 'views'))
    this.server.set('view engine', 'ejs')
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;