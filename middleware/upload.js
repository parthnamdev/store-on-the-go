const path = require("path");
const multer = require("multer");
const Seller = require("../models/sellerModel");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `${"uploads/" + req.user.uuid}`);
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

var upload = (req, res, next) => {
    const uploadFile = multer({
            storage: storage,
            fileFilter: function(req, file, callback) {
                if(
                    file.mimetype === "image/png" ||
                    file.mimetype === "image/jpg" ||
                    file.mimetype === "image/jpeg"
                ){
                    
                    Seller.findOne( {uuid: req.user.uuid},function(err, found){
                        if(!err){
                            if(found && file){
                                return callback(null, true)
                            } else {
                                return callback(null, false)
                            }
                        } else {
                            console.log(err);
                        }
                    } );
                    
                } else {
                    //console.log("only png and jpg");
                    return callback(null, false)
                }
                
            },
            limits: {
                fileSize: 1024 * 1024 * 5
            }
        }).single('image');

    uploadFile(req, res, function (err) {
        if (err instanceof multer.MulterError) {

            res.render('err',{error: "file must be jpg or png image of size less than 5 Mb"});

        } else if (err) {
            console.log(err);
            res.render('err',{error: "unexpected error"});
            
        } else {
            next();
        }
        // Everything went fine. 
        
    })
}


module.exports = upload