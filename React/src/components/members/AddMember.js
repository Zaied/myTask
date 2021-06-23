
import React, { useState, useEffect } from 'react'
import UserContext, { UserConsumer } from '../../context/UserContext';
import { Form, Button, Select } from 'react-bootstrap'
import axios from '../../axios'
import { getToken } from '../../auth/token';

const AddMember = () => {
    const token = getToken();
    let headers = {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + token
    };

    const [userId, setUserId] = useState("")
    const [projectId, setprojectId] = useState("")
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [assignError, setAssignError] = useState('')
    const [users, setUsers] = useState(null);
    const [projects, setProjects] = useState(null);

    const userIdHandler = (e) => {
        setUserId(e.target.value)
    }
    const projectIdHandler = (e) => {
        setprojectId(e.target.value)
    }
    const assignUserToProjectHandler = (e) => {
        e.preventDefault();
        //console.log('addMember page',userId,projectId);
        if (userId && projectId) {
            var data = {
                user_id: userId,
                project_id: projectId,
            }
            axios.post(`/assign/user/${userId}/${projectId}`,
                {
                    headers: headers
                })
                .then(res => {
                    setSubmit(true)
                    setSuccess("Added Success")
                    setError('')
                    setAssignError('')

                }).catch(err => {
                    setSuccess('')
                    setAssignError("Failed To Assign Member!")
                })
        } else {
            setError("Please Fill up the fileds!")
        }
    }

    const getAllUser = () => {
        axios.get('/get/users', {
            headers: headers
        })
            .then(res => {
                setUsers(res.data.data);
            }).catch(error => console.log(error));
    }

    const getAllProject = () => {
        axios.get('/get/projects', {
            headers: headers
        })
            .then(res => {
                setProjects(res.data.data);
            }).catch(error => console.log(error));
    }

    useEffect(() => {
        getAllUser();
        getAllProject();
        
        return()=>{
            console.log('cleanup')
        }
    }, [])



    const assignAnotherUser = () => {
        setSubmit(false)
        setUserId('')
        setprojectId('')
        setError('')
    }
    return (

        <section className="section">
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
            {success}
            {assignError}
            {submit ? <h2 > Assigned sccessful  <button onClick={assignAnotherUser}>Assign another one ?</button></h2> :
                <Form onSubmit={assignUserToProjectHandler}>
                    <select aria-label="Default select example" onChange={userIdHandler} className="form-control">
                        <option>Select User</option>
                        {users ?.map((user) => {
                            return (
                                <option value={user.id} key={user.id}>{user.name}</option>
                            )
                        })}
                    </select>
                    <br/>
                    <select aria-label="Default select example" onChange={projectIdHandler} className="form-control">
                        <option>Select Project</option>
                        {projects ?.map((project) => {
                            return (
                                <option value={project.id} key={project.id}>{project.project_name}</option>
                            )
                        })}
                    </select>
                    <br/>
                    <Button variant="primary" type="submit">
                        Assign to Project
                    </Button>
                    {error}
                </Form>
            }
        </section>
    )
}

export default AddMember