const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note")

//Route:-1 Get all the notes using: GET "/api/notes/fetchallnotes". login is required, which means we have to send the JWT.
router.get('/fetchallnotes', fetchuser,  async (req,res)=>{

    try {
        const notes = await Note.find({user:req.user.id})  //we're searching for all notes created by the user with an ID that matches req.user.id
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
}
    

})


//Route:-2 Add a new note using: POST "/api/notes/addnote". login is required, which means we have to send the JWT.
router.post('/addnote', fetchuser,[

    body('title', 'Title must be of atleast 3 words ').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 words').isLength({min:5}),

], async (req,res)=>{


    try {
        const {title, description, tag} = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() }); 
    }
    
        const note = new Note ({          // This will return a promise
            title, description, tag, user: req.user.id 
        })
        const savedNote = await note.save()
    
        res.json(savedNote)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
}

   
})


//Route:-3 Update an existing Note using: PUT "/api/notes/updatenote". login is required, which means we have to send the JWT.
router.put('/updatenote/:id', fetchuser,  async (req,res)=>{   //We can use POST but we genrally use "PUT" req for updation
    try {
        const {title, description, tag} = req.body
        //Create a newNote object
        const newNote = {}
        if(title){newNote.title = title}    //if title is coming as a req which means user wants to update the title than newNote.title = title
        if(description){newNote.description = description}    
        if(tag){newNote.tag = tag}
        
        //find the note to be updated and update it
    
        // const note = Note.findByIdAndUpdate()     // we could have used this function directly but first we have to ensure
                                                    // that the owner of the note is only the one who is updating so we use it later.
    
        let note = await Note.findById(req.params.id)  //this "id" is one which we passed in router "'/updatenote/:id'"
        if(!note){return res.status(404).send("Note not found")}
    
        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
        //note.user.toString() will give us the id of the user of the note
    
    
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})     //$set is a MongoDB update operator that sets the properties
                                                                                        // of a document to the specified values.
        
                                                                                        //The {new:true} option is used to return the updated 
                                                                                        //document after the update operation is complete. By default,
                                                                                        //findByIdAndUpdate() returns the original document before it was
                                                                                        //updated.
        res.json(note) 
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
}
   
})




//Route:-4 Delete an existing Note using: DELETE "/api/notes/deletenote". login is required, which means we have to send the JWT.
router.delete('/deletenote/:_id', fetchuser,  async (req,res)=>{   //We can use POST but we genrally use "PUT" req for updation

    try {

    //find the note to be deleted and delete it
    let note = await Note.findById(req.params._id)  //this "id" is one which we passed in router "'/updatenote/:id'"
    if(!note){return res.status(404).send("Note not found")}

    // Allow to delete only if the user own the note.
    if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
    //note.user.toString() will give us the id of the user of the note


    note = await Note.findByIdAndDelete(req.params._id) 
    res.json({"Success": "The note has been deleted", note:note}) 

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
}

    
   
})



module.exports = router
