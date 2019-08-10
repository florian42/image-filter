import express from 'express';
import bodyParser from 'body-parser';
import {deleteLocalFiles, filterImageFromURL} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage/", (req, res) => {
      let image_url: string = req.query.image_url;
      if (!image_url) {
          return res.status(400)
              .send(`image_url is required`);
      }
      filterImageFromURL(image_url).then(function (path) {
          res.sendFile(path);
          res.status(200);
          res.on('finish', () => {
              deleteLocalFiles([path])
          })
      })
  });


    // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
