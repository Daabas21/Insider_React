import { Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import GameMasterField from "./GameMasterField";
import GameSendMes from "./GameSendMes";
import GameStartEnd from "./GameStartEnd";


const Game = () => {

  let { id } = useParams();

  const [game, setGame] = useState()
  const [input, setInput] = useState({ message: "", private: false, game_id: parseInt(id) })
  const [inputPriv, setInputPriv] = useState({ message: "", private: true , game_id: parseInt(id) })
  const [controller, setController] = useState(0);
  const [currentUser, setCurrentUser] = useState();

  setInterval( () => {
    setController(prev => prev + 1)
  }, 2000)

  useEffect(() => {
    fetch("http://localhost:5000/api/games/" + (id), { credentials: "include" })
      .then(res => res.json())
      .then(data => setGame(data))

    fetch("http://localhost:5000/user", { credentials: "include" })
      .then(res => res.json())
      .then(data => setCurrentUser(data))
  }, [id, controller])

  

  // console.log(currentUser)

  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
      <GameMasterField setInputPriv={setInputPriv} inputPriv={inputPriv} setController={setController} currentUser={currentUser} />
      <Stack>
        <GameStartEnd id={id} setController={setController} />
        <h2>Game name : {game ? game.game : null}</h2>
        {currentUser ?
              <h2 key={currentUser.id}>Your role are : {currentUser.role}</h2> : null}
        <Stack direction="row" spacing={2} justifyContent="center">
          <h2>players are :</h2>
          {game ? game.users.map(user => <div key={user.id}><h2> {user.username},</h2></div>) : null}
        </Stack>
        <h2>messages are :</h2>
        <Grid>
          {game ? game.messages.map(mes => <div key={mes.id}><p> {mes.message} </p></div>) : null}
        </Grid>
      </Stack>
      <GameSendMes input={input} setInput={setInput} setController={setController} id={id} />
    </Stack>
  )
}

export default Game