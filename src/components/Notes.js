import React, { useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import { useContext } from "react"
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(noteContext)
    const navigate = useNavigate()
    const {notes, fetchNotes, editNote} = context   //Destructuring
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""})
  
    useEffect(()=>{
      if(localStorage.getItem("token")){
        
        fetchNotes()
      }
      else{
          navigate("/login")
      }
    },[])

    const updateNote =(currentNote)=>{
        ref.current.click()      // Used to open the modal with javascript, using the "ref" and hook "useRef" to do the thing.Basically we are giving 
                                  // the functionality of the launch modal button to the edit button, the edit button now triggers the modal.
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
        
    }
  

    const AddingNote =(e)=>{  //Used this her to edit notes
     
      e.preventDefault()   //Added this so that the page does not load when we click submit.
      // addNote(note.title, note.description, note.tag)
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click()
      props.showAlert("Updated successfully", "success");
     

    }

    const ref = useRef(null)
    const refClose = useRef(null)

    const onchange = (e)=>{
      //The significane of "...note" here is that a new object is created with setnote which hass all the properties of note just the updation is
      //[e.target.name]:e.target.value .
      setNote({...note, [e.target.name]:e.target.value})   
    //The [e.target.name]: e.target.value syntax creates a new property on the object with the key equal to the value of e.target.name and
    //the value equal to e.target.value. This allows you to update a specific property of the note object based on the name attribute of the
    //input element that triggered the event.
  }

  return (
    <div>
      <AddNote showAlert= {props.showAlert}/>
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref ={ref}  data-bs-target="#exampleModal">
      Launch demo modal
      </button>
 
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <form>
          <div className="mb-3">
            <label htmlFor="title"  className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp"
             value={note.etitle} onChange={onchange} minLength={3} required/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" name='edescription' 
            value={note.edescription} onChange={onchange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange}  minLength={3} required/>
          </div> 
         
        </form>

      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle<3 || note.edescription<5 } type="button" className="btn btn-primary" onClick={AddingNote}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row">
          <div className=" row my-3 mx-auto col-10 col-md-6 col-lg-10 ">
            <h2>View your notes here</h2>
            <div className="container mx-3" style={{color:"white"}}>
            {notes.length === 0 && "No notes to display"}  
            {/* if the left side of && is true then the right side will be returned */}
            </div>
            {notes.map((note)=>{
                return <NoteItem showAlert= {props.showAlert} key ={note._id} updateNote = {updateNote} note = {note}/>
            })}
          
     </div>
          </div>
    </div>
  )
}

export default Notes