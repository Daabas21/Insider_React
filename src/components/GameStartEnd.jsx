import { Grid, Button } from "@mui/material"

const GameStartEnd = ({ id, setController }) => {

    const handleStart = async () => {
        await fetch('http://localhost:5000/api/games/' + id, {
          method: "PATCH",
          body:JSON.stringify({active : true}),
          headers: { "Content-Type" : "application/json"},
          credentials: "include"
        })
        setController(prev => prev + 1)
      }
    
      const handleEnd = async () => {
        await fetch('http://localhost:5000/api/games/' + id, {
          method: "PATCH",
          body:JSON.stringify({active : false}),
          headers: { "Content-Type" : "application/json"},
          credentials: "include"
        })
        setController(prev => prev + 1)
      }

  return (
    <Grid marginTop={3}>
        <Button 
          variant="contained"
          onClick={handleStart}
          >StartGame</Button>
        <Button 
          variant='contained'
          onClick={handleEnd}
          >EndGame</Button>
      </Grid>
  )
}

export default GameStartEnd