import React, {useState, useEffect} from 'react'
import { TextareaAutosize, Box, Grid2  } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { io } from "socket.io-client";



const Homepage = () => {

    const [userMsg, setUserMsg] = useState('')
    const [recieveMsg, setRecieveMsg] = useState([])
    const [socket,setSocket] = useState()
  

    useEffect(()=>{

         const newSocket = io.connect("http://localhost:3000")
         setSocket(newSocket)

         newSocket.on("revieveMsg",(data)=>{
            console.log('forom backend, ',data)
            setRecieveMsg(prev=> [...prev,data])})


            return ()=>{
                newSocket.disconnect()
            }

    },[])


    const handleClick = ()=>{
        console.log(userMsg)

      socket.emit('sendMsg', userMsg)
      setRecieveMsg(prev=> [...prev,{userMsg: userMsg}])

        setUserMsg('')

     
    }

  return (<>

        <Grid2 container sx={{height: '38rem',  marginLeft: '5%', marginRight: '5%', position: 'relative', background: '#212121', color: 'white'}} >

           <Grid2 item sx={{height: '90%',border: '1px solid white', display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px  5rem 10px 5rem', overflow: 'scroll', overflowX: 'hidden'}}>
               
           
                   <Box style={{display: 'flex',  flexDirection: 'column', width: '100%'}}>
                       {
                           recieveMsg && recieveMsg.map((e, index)=>(

                               (typeof e !== 'object' ) ?

                               //user1 side
                               
                               <Box style={{minWidth: '12px',margin: '30px 0px 30px 0px',    maxWidth: '50%', border: '1px solid white', borderRadius: '10px', wordBreak: 'break-all'}}>
                                 <Box style={{
                                               background: '#2F2F2F',
                                               padding: '10px', fontSize: '1.25rem', borderRadius: '10px' , 
                                               wordBreak: 'break-all'}} >  {e}
                                               
                                           </Box>
                               </Box>
                            
                            
                               :  
                                   //user side
                               <Box sx={{margin: '30px 0px 30px 0px',   display:'flex', justifyContent: 'end',}}>

                                       <Box sx={{minWidth: '12px', maxWidth: '50%', border: '1px solid white', borderRadius: '10px'}}>

                                           <Box style={{
                                               background: '#2F2F2F',
                                               padding: '10px', fontSize: '1.25rem', borderRadius: '10px' , 
                                               wordBreak: 'break-all'}} >  {e.userMsg}
                                               
                                           </Box>

                                       </Box>

                                   </Box>

                           ))
                       }

                 
                   </Box>

          

           </Grid2>


           <Grid2 item sx={{ height: '8%', color: 'white',width: '50%', bottom: '0%', left: '25%', position: 'absolute'}}>

               <TextareaAutosize  value={userMsg} onChange={(e)=> setUserMsg(e.target.value)}
                       style={{ fontSize: '1.2rem', border: '1px solid white',  width: '100%', padding: '10px 30px 10px 10px', fontFamily: 'sans-serif', background: '#2F2F2F', color: 'white', resize: 'none', borderRadius: '10px' }}
                       placeholder="eneter question here"
               />

         
                   <IconButton onClick={()=> handleClick()} sx={{ left: '101%', position: 'absolute', top: '5%'}} color="inherit" >
                       <SendIcon />
                   </IconButton>
       

           </Grid2>
       
       
       </Grid2>


        <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
    
    
        </>)
}


export default Homepage
                    

 