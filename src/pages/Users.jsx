import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect( () => {
        fetch('http://localhost:5000/api/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    },[])

    // console.log(users)

  return (
    <div>
        {users.map((user, index) => 
            <Stack justifyContent={"center"} direction={"row"} letterSpacing={2} key={index}>
                <h4>{user.username} is :</h4>
                <h6>{user.role}</h6>
            </Stack>
        )}
    </div>
  )
}

export default Users