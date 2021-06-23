import React, { createContext, useState, useEffect } from 'react'
import UserContext, { UserConsumer } from '../../context/UserContext';
import Moment from 'react-moment'
import { Table } from 'react-bootstrap'
import axios from '../../axios'
import { getToken } from '../../auth/token';

const Project = () => {
    const [projects, setProjects] = useState(null);
    const token = getToken();
    let headers = {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + token
    };
    const getAllProject = () => {
        axios.get('/get/projects', {
            headers: headers
        })
            .then(res => {
                setProjects(res.data.data);
            }).catch(error => console.log(error));
    }
    useEffect(() => {
        getAllProject();

        return()=>{
            console.log('cleanup')
        }
    }, [])
    const projectList = projects ?.map((project) => {
        return (
            <tr key={project.id}>
                <td>{project.project_name}</td>
                <td>{project.workspace_id}</td>
                <td>  <Moment fromNow>{project.created_at}</Moment></td>
            </tr>
        )
    });

    return (
        <div style={{ marginTop: "110px" }}>
            <UserConsumer>
                {(context) => {
                    return (
                        <div>
                            <h4>Currrent User Name: {context ?.user.userName}</h4>
                            <h4>Currrent User Email: {context ?.user.userEmail}</h4>
                        </div>
                    )
                }}
            </UserConsumer>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Project title</th>
                        <th>Workspace id</th>
                        <th>Created at</th>
                    </tr>
                </thead>
                <tbody>
                    {projectList}
                </tbody>
            </Table>
        </div>
    )
}


export default Project