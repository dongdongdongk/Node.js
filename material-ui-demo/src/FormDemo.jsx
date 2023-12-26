import TextField from '@mui/material/TextField';
import { useState } from 'react';
function FormDemo() {
    const [name,setName] = useState();
    const updateName = (e) => {
        setName(e.target.value);
    }
    return(
        <div>
            <h1>Name is : {name}</h1>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" placeholder='name' value={name} onChange={updateName} />
        </div>
    )
}

export default FormDemo;