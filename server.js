const http=require('http');
const fs=require('fs');
const path=require('path');





http.createServer((req,res)=>{
    console.log(req.url)
    if(req.url === "/favicon.ico"){
        console.log("fuck that file")
        return;
    }
    let fileName=path.join(__dirname,req.url === "/" ? "index.html" : req.url)

    let extname=path.extname(fileName);
    let contentType;

    switch(extname){

        case ".js":
        contentType="application/js"
        break;


        case ".css":
        contentType="text/css"
        break;

        case ".html":
        contentType="text/html"
        break;

        default:
        console.log("Error:Unknown content-type")
        break;
    }
    fs.readFile(fileName,(err,content)=>{
    
        if(err)throw err;
        res.writeHead(200,{"Content-Type":contentType})
        res.end(content)
    })
}).listen(3000,()=>console.log(`Logged onto port 3000`))
