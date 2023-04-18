const express = require("express");
const multer = require("multer");
const fileSys = require("fs");

// file upload 
// ===========================================================================================================
const multerParams = {
    destination: "videos/"   // file is stored in videos directory
};
const videoFile = multer.diskStorage(multerParams);

// creating the server
// ===========================================================================================================
const app = express();

const PORT = process.env.PORT || 3000;

// begin listening
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}.........`);
});

// uploading route (THE FIELD NAME IS video)
app.post("/upload", videoFile.single("video"), (req, resp)=>{
    if(!req.file){
        resp.status(400).send("no video file received! try again!");
    }
    resp.status(201).send("video received!");
});

// download route
app.get("/download/:filename", (req, resp)=>{
    const filePath = `videos/${req.params.filename}`;
    try{
        resp.status(200).download(filePath);  // file successfully downloaded!
    }
    catch(e){
        resp.status(404).send("video not found");
    }
});

// streaming route (NOTE: I can't figure out how to do this, 
// so for this part, I did it with the help of chatGPT. 
// I hope my transparency can avoid any misunderstandings)
app.get("/stream/:filename", (req, resp)=>{

    // server retrieves the video
    const filePath = `videos/${req.params.filename}`;

    // get all the file details
    const properties = fileSys.statSync(filePath);
    const fileSize = properties.size;

    // in the original chatGPT response, the client can specify the timestamp of the video.
    // since it is not a part of the requirement, I will skip that part.

    // HTTP response header
    const httpHeader = {
        'Content-Length': fileSize,
        'Content-Type': 'video.mp4'
    };

    // send the data back
    resp.writeHead(200, httpHeader); // send back HTTP headers
    fileSys.createReadStream(filePath).pipe(resp); // stream it to resp
});

