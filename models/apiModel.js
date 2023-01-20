const db = require('./connection');
const ObjectId = require('mongoose').Types.ObjectId;

function apiModel() { 

	this.registerUser=(userDetails)=>{
		console.log(userDetails)
		return new Promise((resolve,reject)=>{
			db.collection('user').find().toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
					var flag=0
                    if(result.length==0){
						_id=1
                    }else{   
					    var max_id=result[0]._id
					    for(let row of result){
					    	if(row._id>max_id)
						 	max_id=row._id
						
						 if(row.email==userDetails.email)
						 	flag=1							 	
						 	
						}
						_id=max_id+1  	
					}
					
					userDetails.form_status='0'
					userDetails.role="user"
					userDetails.current_date= new Date()
					if(flag)
					{
						resolve(0)
					}
					else
					{
						db.collection('user').insertOne(userDetails,(err1,result1)=>{
						   //err1 ? reject(err1) : resolve(result1);
						   if(err1){
						   	reject(err1)
						   }
						   else
						   {
						   	db.collection('user').find({'email':userDetails.email}).toArray((err2,result2)=>{
						   		err2?reject(err2):resolve(result2)
						   	})
						   }
					 	})	
					}
					//resolve(result)
				}	
			})
			
		})	
	}

	this.upload_video=(userDetails,file)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(userDetails._id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				} else{
					db.collection('user').updateOne({'_id':ObjectId(userDetails._id)},{$set:{'video':file}},(err1,result1)=>{
				        err1 ? reject(err1) : resolve(result1);
			        })
				}
				resolve(result)
			})
		})
	}

	this.userLogin=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'email':userDetails.email,'password':userDetails.password}).toArray((err,result)=>{
				//err ? reject(err) :resolve(result)
				if(err){
					reject(err)
				}else{
					db.collection('user').updateOne({'email':userDetails.email},{$set:{'fcm':userDetails.fcm}},(err1,result1)=>{
						err1 ? reject(err1) : resolve(result1)
					})
				}
				resolve(result)
			})
		})
	}

	this.googleLogin=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'google_id':userDetails.google_id}).toArray((err,result)=>{
				//err?reject(err):resolve(result)
				
				if(result.length==0){
					userDetails.form_status='1'
					userDetails.role="user"
					userDetails.current_date= new Date()
					db.collection('user').insertOne(userDetails,(err1,result1)=>{
						err1 ? reject(err1) : resolve(result1);
				    })
				}else{
					db.collection('user').updateOne({'google_id':userDetails.google_id},{$set:{'fcm':userDetails.fcm}},(err2,result2)=>{
						err2 ? reject(err2) : resolve(result2)
				  })	
				}
		      resolve(result)
			})
		}) 
	}

	this.facebookLogin=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'facebook_id':userDetails.facebook_id}).toArray((err,result)=>{
				//err?reject(err):resolve(result)
				
				if(result.length==0){
					userDetails.form_status='1'
					userDetails.role="user"
					userDetails.current_date= new Date()
					db.collection('user').insertOne(userDetails,(err1,result1)=>{
						err1 ? reject(err1) : resolve(result1);
				    })
				}else{
					db.collection('user').updateOne({'facebook_id':userDetails.facebook_id},{$set:{'fcm':userDetails.fcm}},(err2,result2)=>{
						err2 ? reject(err2) : resolve(result2)
				  })	
				}
		     resolve(result)
			})
		}) 
	}

	this.twitterLogin=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'twitter_id':userDetails.twitter_id}).toArray((err,result)=>{
				//err?reject(err):resolve(result)
				
				if(result.length==0){
					userDetails.form_status='1'
					userDetails.role="user"
					userDetails.current_date= new Date()
					db.collection('user').insertOne(userDetails,(err1,result1)=>{
						err1 ? reject(err1) : resolve(result1);
				    })
				}else{
					db.collection('user').updateOne({'twitter_id':userDetails.twitter_id},{$set:{'fcm':userDetails.fcm}},(err2,result2)=>{
						err2 ? reject(err2) : resolve(result2)
				    })	
				}
		     resolve(result)
			})
		}) 
	}

	this.fetchAllDetails=(userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({}).toArray((err,result)=>{
			  err?reject(err):resolve(result)	
		    })
		})				
	}

	this.edit_profile=(new_id,userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
				if(err){
				   reject(err)
				}else{
            
                   db.collection('user').updateOne({'_id':ObjectId(new_id)},{$set:userDetails/*{'gender':userDetails.gender}*/},(err1,result1)=>{
				        err1 ? reject(err1) : resolve(result1);
                    })
		        }
		     resolve(result)
            })
		})				
	}

	this.view_profile=(new_id,userDetails)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
			   err?reject(err):resolve(result)	
            })
		})				
	}

	 this.delete_profile=(new_id)=>{
		return new Promise((resolve,reject)=>{
			db.collection('user').find({'_id':ObjectId(new_id)}).toArray((err,result)=>{
				if(err){
					reject(err)
				}else{
			        db.collection('user').deleteOne({'_id':ObjectId(new_id)},(err1,result1)=>{
				        err1 ? reject(err1) : resolve(result1);
				    })
				}
		      resolve(result)    
		    })
		})
   }
}

module.exports=new apiModel()
