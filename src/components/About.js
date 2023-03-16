import React from 'react'


const About = () => {

  // const a = useContext(noteContext)    

  // useEffect(()=>{          //useEffect is a hook in React that runs after the first render().
                           
  //   a.update()

  // },[])

  return (
    <div>

       This is about  {/*{a.state.name}   */}
                     {/* We have to use ".state" here becuase earlier we were exporting the whole state but now  in "NoteState.js" */}
                    {/* it is {{state:state, update:update}} and the object we are exporting has a state which has "name" value inside it  */}
    </div>
  )
}

export default About

