import React, { createContext, useState, useEffect } from 'react'
import UserContext, { UserConsumer } from '../../context/UserContext';
import { Table } from 'react-bootstrap'
import axios from '../../axios'


const Users = () => {
    const [users,setUsers] = useState(null)
    const getUsers = () => {
        axios.get('https://api.github.com/users')
            .then(res => {
                setUsers(res.data);
            }).catch(error => console.log(error));
    }
    useEffect(() => {
        getUsers();
        return()=>{
            console.log('cleanup')
        }
    }, [])

    const usersList = users?.map((user) => {
        return (
            <tr key={user.id}>
            <td>{user.login}</td>
            <td><img style={{height:"50px",width:"50px"}} src={user.avatar_url}/></td>
            </tr>
        )
    });

    return (
        <div style={{ marginTop: "110px" }}>
        <h2>GitHub Profile List</h2>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>User LoggedInName</th>
                        <th>Photo</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList}
                </tbody>
            </Table>
        </div>
    )
}


export default Users