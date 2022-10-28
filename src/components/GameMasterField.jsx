import { Button, Stack, TextField } from '@mui/material'
import React from 'react'

const GameMasterField = ({setInputPriv, inputPriv, setController, currentUser}) => {

    const handleChange = (e) => {
        setInputPriv(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = async () => {
        await fetch("http://localhost:5000/api/messages", {
            method: "POST",
            body: JSON.stringify(inputPriv),
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })

        setInputPriv(prev => ({ ...prev, message: "" })) // clean textfield after send
        setController(prev => prev + 1)
    }

    return (
        <Stack margin={5}>
            {currentUser ?
                currentUser.role === "master" ?
                    <Stack>
                        <TextField
                            id="standard-message"
                            label="message"
                            variant="standard"
                            value={inputPriv.message}
                            name="message"
                            onChange={handleChange}
                        />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSave}
                        >Send
                        </Button>
                    </Stack> : null
                : <h4>section for the master</h4>
            }
        </Stack>
    )
}

export default GameMasterField