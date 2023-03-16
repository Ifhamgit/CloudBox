import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{
    const host = "http://localhost:5000"
    const notesInitial = []

    const[notes, setNotes] = useState(notesInitial)



      //Fetch all notes
      const fetchNotes =async () =>{

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
         
          headers: {
            "Content-Type": "application/json",
            // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzkyYjg3NjAwNGQ0MDZmMDg1N2U4In0sImlhdCI6MTY3ODEyNzMxNn0.uu_Idgxs4-zFIuyms_kCfjJtaufPlwMYM8KAaAFDCvc"
          "auth-token": localStorage.getItem("token")
          },

        })

        const json = await response.json()
        // console.log(json)
        setNotes(json)

        

      }





      //Add a note
      const addNote =async (props,title, description, tag) =>{

        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
         
          headers: {
            "Content-Type": "application/json",
            // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzkyYjg3NjAwNGQ0MDZmMDg1N2U4In0sImlhdCI6MTY3ODEyNzMxNn0.uu_Idgxs4-zFIuyms_kCfjJtaufPlwMYM8KAaAFDCvc"
          "auth-token": localStorage.getItem("token")
          },

          body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        
        })
        const json = await response.json(); // parses JSON response into native JavaScript objects
        const note = json
       
      //  const note = {
      //     "_id": "6406340c232844e47d0ae82r8",
      //     "user": "640392b476054d406f6857t7",
      //     "title": title,
      //     "description": description,
      //     "tag": tag,
      //     "date": "2023-03-06T18:42:20.981Z",
      //     "__v": 0
      //   }
        // setNotes(notes.push(note))  //Push the note in the notes array and update the state.
        setNotes(notes.concat(note))  //concat function returns a new array.
        

          
      }




      //Edit a note
      const editNote = async (id, title, description, tag) =>{


        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
         
          headers: {
            "Content-Type": "application/json",
            // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzkyYjg3NjAwNGQ0MDZmMDg1N2U4In0sImlhdCI6MTY3ODEyNzMxNn0.uu_Idgxs4-zFIuyms_kCfjJtaufPlwMYM8KAaAFDCvc"
           
          "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        
      
        })
        const json =  response.json(); // parses JSON response into native JavaScript objects
      
            //Logic to edit in client
            fetchNotes()
        // for (let index = 0; index < notes.length; index++) {
        //   const element = notes[index];
        //   if(element._id === id){
        //     element.title = title
        //     element.description = description
        //     element.tag = tag
        //   }
          
        // }
        
      }


      

      //Delete a note
      const deleteNote = async (id) =>{
        //TODO: API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", // *GET, POST, PUT, DELETE, etc.
         
          headers: {
            "Content-Type": "application/json",
            
            // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMzkyYjg3NjAwNGQ0MDZmMDg1N2U4In0sImlhdCI6MTY3ODEyNzMxNn0.uu_Idgxs4-zFIuyms_kCfjJtaufPlwMYM8KAaAFDCvc"
           
          "auth-token": localStorage.getItem("token")
          },
        })
        const json =  await response.text(); // parses JSON response into native JavaScript objects
        const newNote = notes.filter((note)=>{return note._id!==id})  //so if "note._id!==id" it will be kept in notes otherwise not.
        setNotes(newNote)
        

        //First we make the delete part for frontend, deletion which only affects the frontend and not database, and then we call the API so 
        // that the deletion happens from the database too.
        //We do this for the making of all functions.
      }







    // const s1 ={

    //     "name": "Ifham",
    //     "country":"India"
    // }

    // const [state, nextState] = useState(s1)

    // const update = ()=>{

    //     setTimeout(() => {

    //         nextState( 
    //             {
    //                 "name": "Bhediya",
    //                  "country":"Japan"
    //             }
    //         )
            
    //     }, 1000);
    // }


    
    return(
                                        //{{state, update}} is same as {{state:state, update:update}} in moden JS syntax
        // <noteContext.Provider value ={{state, update}}>   
        <noteContext.Provider value ={{notes, setNotes, addNote, editNote, deleteNote, fetchNotes}}>   
            {props.children}           
            
        </noteContext.Provider>

    )


    }
  
export default NoteState;