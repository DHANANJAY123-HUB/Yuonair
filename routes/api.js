const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path'); 
const apiModel = require('../models/apiModel');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads/')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        if(
        file.mimetype == "video/mp3" ||
        file.mimetype == "video/mp4" 
    ){
        callback(null,true)
    }else{
        console.log('only  mp3 & mp4 file supported')
        callback(null,false)
    }

   },
   limits:{
    filesize:1024 * 1024 * 2
   }
});

router.post('/upload_video',upload.single('file'),(req, res,err) => {
    apiModel.upload_video(req.body,req.file).then((result)=>{
        console.log(req.file)

        //var img = req.files;
        if(result.length==0){
            res.json({
                result: 'false',
                msg:'record not found..',
            })
        }else{
            req._id = result[0]._id

            if(result[0]._id == req._id ){
                res.json({
                     result:'true',
                    msg:'video file uploaded successfully..',
                    body:req.file
                })
            }else{

            }
        }
    }).catch((err)=>{
        console.log(err)
        res.json({message:err.message})
    });
});

router.post('/signup',(req,res,next)=>{
	apiModel.registerUser(req.body).then((result2)=>{
       
        if(result2){
            response = 'true',
            msg ='user registered successfully..'
        }else{
            response = 'false',
        	msg = 'email_id already registered please enter new email_id..'
        }   
        //var data = JSON.stringify(result2)
        
            res.json({
                result:response,
        	    msg:msg,
                data:result2
            }); 
    }).catch((err)=>{
		res.json({message:err.message})
	})
});

router.post('/login',
	body('email').isEmail({}).withMessage('email should be required..'),(req,res,next)=>{
	const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
           // errors: errors.array()
           msg: 'parameter required email & password..'
        });
    }	
    apiModel.userLogin(req.body).then((result)=>{
          
        if(result.length==0){
			res.json({
                result: 'false',
				msg:'email_id or password invalid..',
			})
		}else{
            
            req.email = result[0].email,
			req.password = result[0].password

			if(result[0].email == req.email && result[0].password==req.password){
				res.json({
                    result: 'true',
                     msg:'user successfully login..',
                     data:result[0]
                });
			}else{
                res.json({
                    result:'false',
                    msg:'user blocked by admin...'
                })

			}
		}

	}).catch((err)=>{
		res.json({message:err.message})
	})
});

router.post('/google_login',
    body('email').isEmail({}).withMessage('email should be required..'),(req,res,next)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
           // errors: errors.array()
           msg: 'parameter required google_id & email..'
        });
    }

    apiModel.googleLogin(req.body).then((result)=>{
         
       if(result){
            res.json({
                result: 'false',
                msg:'google_id already registered please enter new google_id..',
                data:result
            })
        }else{
            res.json({
              result: 'true',
              msg:'user successfully registered..',
              data:result
            })
        }
    }).catch((err)=>{
        res.json({message:err.message})
    })
});

router.post('/facebook_login',
    body('email').isEmail({}).withMessage('email should be required..'),(req,res,next)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
           // errors: errors.array()
           msg: 'parameter required facebook_id & email..'
        });
    }

    apiModel.facebookLogin(req.body).then((result)=>{
         
       if(result){
            res.json({
                result: 'false',
                msg:'facebook_id already registered please enter new facebook_id..',
                data:result
            })
        }else{
            res.json({
                result: 'true',
                msg:'user successfully registered..',
                data:result
            })
        }
    }).catch((err)=>{
        res.json({message:err.message})
    })
});

router.post('/twitter_login',
    body('email').isEmail({}).withMessage('email should be required..'),(req,res,next)=>{

    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({
            result: 'false',
           // errors: errors.array()
           msg: 'parameter required twitter_id & email..'
        });
    }

    apiModel.twitterLogin(req.body).then((result)=>{
         
       if(result){
             res.json({
                result: 'false',
                msg:'twitter_id already registered please enter new twitter_id..',
                data:result
            })
        }else{
            res.json({
                result: 'true',
                msg:'user successfully registered..',
                data:result
            })
        }
    }).catch((err)=>{
        res.json({message:err.message})
    })
});


router.get('/list', (req,res,next)=>{
    apiModel.fetchAllDetails(req.params,req.body).then((result)=>{
   
        if(result.length==0){
            res.json({
                result: 'false',
                msg:'record not found..',
            })
        }else{

            res.json({
                result:'true',
                msg:'record get successfully..',
                data:result
            }); 
        }       
    }).catch((err)=>{ 
       res.json({message:err.message});
    })

});

router.put('/edit_profile/:id',(req,res,next)=>{
    apiModel.edit_profile(req.params,req.body).then((result)=>{
       var new_id = parseInt(req.params.id);
       
       if(result.length==0){
            res.json({
                result: 'false',
                msg:'record not found..',
            })
        }else{
            req._id = result[0]._id
        
            if(result[0]._id == req._id){
                res.json({
                    result:'true',
                    msg:'data successfully updated..'
                })
            }else{

            }
        }     
    }).catch((err)=>{
        res.json({message:err.message})
    })
});

router.get('/view_profile/:id',(req,res,next)=>{
    apiModel.view_profile(req.params,req.body).then((result)=>{
       var new_id = parseInt(req.params.id);
       
       if(result.length==0){
            res.json({
                result: 'false',
                msg:'record not found..',
            })
        }else{
            req._id = result[0]._id
        
            if(result[0]._id == req._id){
                res.json({
                    result:'true',
                    msg:'data get successfully..',
                    data:result[0]
                })
            }else{

            }
        }     
    }).catch((err)=>{
        res.json({message:err.message})
    })
});

router.delete('/delete_profile/:id',(req,res,next)=>{
    apiModel.delete_profile(req.params).then((result)=>{
        var new_id = parseInt(req.params.id);
        
        if(result.length==0){
            res.json({
                result: 'false',
                msg:'record not found..',
            })
        }else{
            req._id = result[0]._id
            
            if(result[0]._id == req._id ){
                res.json({
                    result:'true',
                    msg:'record deleted successfully..',
                })
            }else{
                    
            }    
        }
    }).catch((err)=>{
        res.json({message:err.message})
    })

});



module.exports = router;