const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json());

const mongodb_url = 'mongodb+srv://arash:us123@atlascluster.6pvnfnu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongodb_url)
	.then(()=>console.log('connected to mongodb..'))
	.catch(e=>console.error(e))

const People = mongoose.model('people',new mongoose.Schema({
	name : String
})) 

app.get('/',async(req,res)=>{
	res.send('This is a test API')
})


app.get('/api/peoples',async(req,res)=>{
	try{
		const peoples = await People.find()
		res.send(peoples)
	}
	catch(ex){
		console.error('--------Eroor------------: \n',ex)
		res.send(ex.message)
	}
	
})

app.post('/api/peoples',async(req,res)=>{
	const people = new People({name:req.body.name})
	const result = await people.save()
	res.send(result)
})



app.listen(3000,()=>{console.log('listening on port 3000...')})