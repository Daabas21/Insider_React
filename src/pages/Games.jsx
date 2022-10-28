import { Grid } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Consumer } from './Login'

const Games = () => {

  const navigate = useNavigate()

  const [games, setGames] = useState()
  // const [currentUser, setCurrentUser] = useState()

  
  useEffect(() => {
    
    fetch('http://localhost:5000/api/games', {
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => setGames(data))


    // fetch("http://localhost:5000/user",{credentials: "include"})
    //    .then(res => res.json())
    //    .then(data => setCurrentUser(data))
  }, [])

  // const handleJoin = async (gameId) => {
  //   const join = await fetch('http://localhost:5000/api/users/' + currentUser, {
  //     method: "PATCH",
  //     body: JSON.stringify({games_id : gameId}),
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include"
  //   })

  //   navigate("/games/" + gameId)
  // }

  // console.log(currentUser);

  return (
    <Grid
      container direction="column"
      justifyContent={"center"}
      alignItems=" center"
    >
      <h3>All Games</h3>
      <div>
        {games ? games.map((game) =>
          <h2 key={game.id} onClick={() => navigate("/games/"+ game.id)}>{game.id}  {game.game}</h2>
          ) : null}
          </div >
          </Grid>
  )
}

export default Games