const db = require('./connection');

function adminModel() { 

	this.fetchDetails=(userDetails)=>{ 
		return new Promise((resolve,reject)=>{
			db.collection('user').find({}).toArray((err,result)=>{
				err ? reject(err) : resolve(result);
			})
		})	
	}
}
module.exports=new adminModel()