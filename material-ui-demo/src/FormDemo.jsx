import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { useState } from 'react';
function FormDemo() {
    const [name,setName] = useState();
    const [volume, setVolume] = useState(50);
    const updateName = (e) => {
        setName(e.target.value);
    }
    const volumeChange = (e,newVal) => {
        setVolume(newVal);
    }
    return(
        
        <Box sx={{border:'1px solid red',p:6, width: 300, height: 300, margin:"0 auto"}}>
            <h1>Name is : {name}</h1>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" placeholder='name' value={name} onChange={updateName} />
            <h2>Volume : {volume}</h2>
            <Slider aria-label="Volume" value={volume} onChange={volumeChange} />
        </Box>
    )
}

export default FormDemo;