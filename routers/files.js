const router=require("express").Router();
const formridable=require("formidable");
const fs=require("fs");
const dirPath=__dirname+"/data";
router.post("/addimg",(req,res)=>{
    const form = new formridable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.end();
            return;
        }
        console.log(files);
        const orginalPath=files.file.filepath;
        const newPath=dirPath+"/"+fields.filename;
        console.log(newPath);
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