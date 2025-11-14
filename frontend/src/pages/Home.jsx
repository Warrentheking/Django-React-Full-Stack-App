import {useState,useEffect} from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"


export default function Home() {
    const [notes, setNotes] = useState([]);
    const [content,setContent] = useState("")
    const [title,setTitle] = useState("")

    useEffect (() =>{
      getNotes();
    },[])

    const getNotes = () => {
       api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data)  => {setNotes(data); console.log(data)})
            .catch((err)=> alert(err)); 
      }


      const deleteNote= (id) =>{
        api
        .delete(`/api/notes/delete/${id}/`)
        .then((res)=>{
          if (res.status === 204) alert("Note Deleted!!")
          else alert(" ❌ Deletion Failed!!!")
           getNotes()

        })
        .catch((error)=>alert(error))
      }

      const createNote =(e)=>{
        e.preventDefault()
        api.post("/api/notes/",{content,title}).then((res)=>{
            if(res.status === 201)alert("✅Note Created Successfully")
            else alert(" ❌ Creation Failed!!!")
           getNotes();   

        }).catch((err)=>alert(err))
      }


  return (
    <>
    <div>
        <h2>NOTES</h2>
        {notes.map((note) =>(
          <Note note={note} onDelete={deleteNote} key={note.id}/>))}
    </div>
    <h2>Create Note</h2>
    <form onSubmit={createNote}>
      <label htmlFor="title">Title : </label>
      <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />
<br />
      <label htmlFor="content">Content : </label>
      <textarea  id="content" name="content" required onChange={(e) => setContent(e.target.value)} value={content} />

<br />
     <input type="submit" value="submit" />
    </form>
    
    
    </>
  );
}
