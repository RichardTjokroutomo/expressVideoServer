# expressVideoServer

This is a simple server for uploading, streaming, and downloading videos. (only supports mp4 files)
This is a take-home project from Ziggy.

## file upload

- Here is a sample code in JavaScript for user to upload a video file
- use HTTP GET method. If successful, a 201 response will be sent. Otherwise, the server will send 400 error.
- If you deploy this project somewhere, then the path is ROOT URL/upload

>const axios = require('axios');
> const fs = require('fs');
> 
> const videoFile = fs.createReadStream('/DIR_PATH/video.mp4');
> 
> const formData = new FormData();
> formData.append('video', videoFile);
> 
> axios.post('http://localhost:3000/upload', formData, {
>   headers: {
>     'Content-Type': 'multipart/form-data'
>  }
> })
> .then(response => {
>   console.log(response.data);
> })
> .catch(error => {
>   console.error(error);
> });

## video download
- To download video, use the path ROOT_URL/download/:filename 
- use HTTP method GET. if successful, a 200 response will be sent back. Otherwise, 404 error response will be sent.
- the HTTP parameter is the name of the file. Note that you should include the .mp4 extension when making the request

## video streaming
- To stream, use ROOT_URL/stream/:filename
- use HTTP method GET. if successful, a 200 response will be sent back. 
- the HTTP parameter is the name of the file. Note that you should include the .mp4 extension when making the request
