import { Stack, TextField, Button } from "@mui/material"

const GameSendMes = ({ input, setInput, setController, id }) => {

    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = async () => {
        await fetch("http://localhost:5000/api/messages", {
            method: "POST",
            body: JSON.stringify(input),
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })

        setInput(prev => ({ ...prev, message: "" })) // clean textfield after send
        setController(prev => prev + 1)
    }


    return (
        <Stack margin={5}>
            <TextField
                id="standard-message"
                label="message"
                variant="standard"
                value={input.message}
                name="message"
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color="success"
                onClick={handleSave}
            >Send
            </Button>
        </Stack>
    )
}

export default GameSendMes