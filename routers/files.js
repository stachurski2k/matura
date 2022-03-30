const router=require("express").Router();
const formridable=require("formidable");
const fs=require("fs");

//get directory of images storage
let _dirPath=__dirname;
let dirs=_dirPath.split("/");
dirs.pop();
_dirPath=dirs.join("/")+"/data";
const dirPath=_dirPath;

//valid types of files to upload on server
const validFileTypes=["jpeg","png","jpg"];

router.post("/addimg",(req,res)=>{
    const form = new formridable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.end();
            return;
        }
        //check if file extension is valid
        const fileExtension=files.file.originalFilename.split(".").pop();
        if(validFileTypes.indexOf(fileExtension)==-1){
            res.status=400;
            res.end();
            return;
        }   
        //save file
        const orginalPath=files.file.filepath;
        const newPath=dirPath+"/"+fields.filename+"."+fileExtension;
        fs.rename(orginalPath,newPath,(err)=>{
            if(err){
                console.log("Error saving a file!");
                throw err;
            }
        });
    });
    res.end();
});
module.exports=router;