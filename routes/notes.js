import express from 'express';
import bodyParser from 'body-parser';
import { createNoteSchema } from '../../../Desktop/task3/helpers/valid.js'
import {  type , date ,dateNow } from '../../../Desktop/task3/data/data.js'

const router = express.Router();


let notes = [
	{ id:'1', name:'name1' , dateCreat: dateNow , content: 'hello my friend', type:type[0], archived: false },
	{ id:'2',name:'name2' ,dateCreat: dateNow, content: 'i have dinner 29.11.2021 and 30.11.2021 and 29.12.2021', type:type[2] , archived: true},
	{ id:'3',name:'name3' ,dateCreat: dateNow, content: 'my', type:type[0], archived: true },
	{ id:'4',name:'name4', dateCreat: dateNow, content: 'hello', type:type[1] ,  archived: false },
	{ id:'5',name:'name5' ,dateCreat: dateNow ,content: 'end', type:type[0] , archived: false },
	{ id:'6', name:'name6',dateCreat: dateNow ,content: 'hello', type:type[2] , archived: false },
	{ id:'7', name:'name7',dateCreat: dateNow,content: 'friend', type:type[1] , archived: false }
]

router.get('/',(req,res) =>{
	try {
		notes.forEach(element => {
			element.type=element.type.name;
		});
		res.send(notes);
		notes.forEach(element => {
			element.type = type.find(type => type.name.toLowerCase() == element.type.toLowerCase());
		});
	} catch(e){
		res.status(500).send('hmm,something wrong');
	}
});

router.get('/stats',(req,res) =>{

	type.forEach(type => {
		type.activeSum=0;
		type.archiveSum=0;
	})
	notes.forEach(note => {
		if(!note.archived) note.type.activeSum++;
		if(note.archived)note.type.archiveSum++;
	})
	res.json({type})

});
router.post('/',(req,res) =>{
	const body =req.body;
	try{
		createNoteSchema.validate(body)
		.then(function (valid) {
			if(valid){
			const note = req.body;
			let id = 1;
			let lenghNotes = notes.length;
			
			if(lenghNotes === 0) id=1;

			else {
			let lastNote = notes[lenghNotes-1];
			id = parseInt(lastNote.id)+1;
			}

			const noteType= type.find(type => type.name.toLowerCase() == note.type.toLowerCase());
			if(!noteType)	return res.status(400).json({message:`no such type ${noteType}, mb idea,task,ransom??`});
			
			notes.push({id: `${id}`, dateCreat: dateNow , ...note,type: noteType ,archived : false});
			return res.status(200).json({message:`Notes with the name ${note.name} added to the db!`, notes});
		}
		return res.status(400).json({message:`some problems`});
	})
}catch(e){
	return	res.status(500).send('hmm,something wrong');
}
});



router.get('/:id',(req,res) =>{

	const {id}  = req.params;
	if(id!='stats'){
		const foundNote = notes.find(note => note.id === id);
		if(foundNote){
			foundNote.type = foundNote.type.name;

			res.send(foundNote);
			foundNote.type = type.find(type => type.name.toLowerCase() == foundNote.type.toLowerCase());
		}
		else if (!foundNote) res.send(`No such notes with id- ${id}`);
	}
});

router.delete('/:id',(req,res) =>{
	const {id}  = req.params;
	let notesLenght = notes.length;
	notes = notes.filter(note => note.id != id)
	if(notesLenght === notes.length){
		console.log('not found');
		return res.status(400).json({message:`user with ${id} not found`,notes });
	}
	return res.status(200).json( {message:`user with ${id} deleted from db`,notes });
});

router.patch('/:id',(req,res) =>{
	const {id}  = req.params;
	const  {name,content,archived}  = req.body;
	const noteUpdated = notes.find(note => note.id === id);
	console.log(noteUpdated);	
	if(!noteUpdated) return res.status(400).json({message:`user with ${id} not found`,notes });

	if(name){
		if(name.length<4) res.status(400).json({message:`name must be more than 4 letter`,notes});
		noteUpdated.name = name;
	}
	if(content){
		if(content.length==0) res.status(400).json({message:`content must be more than 1 letter`,notes});
		noteUpdated.content = content;
	}
	if(archived) {
		if(typeof(archived) == 'boolean') noteUpdated.archived = archived;
		else return res.status(400).json({message:`archived must be true or false`,notes});
	}
	return res.status(200).json({message:`user with ${id} has been updated`,notes });
})



export default  router;