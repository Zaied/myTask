import React, { useState, useEffect } from 'react'
import UserContext, { UserConsumer } from '../../context/UserContext';
import { Form, Button, Select } from 'react-bootstrap'
import axios from '../../axios'
import { getToken } from '../../auth/token';

const CreateProject = () => {
    const token = getToken();
    let headers = {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization": 'Bearer ' + token
    };

    const [workspaceId, setWorkspaceId] = useState("")
    const [projectTitle, setProjectTitle] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState('')
    const [workspaces, setWorkspaces] = useState(null);

    const titleHandler = (e) => {
        setProjectTitle(e.target.value)
    }

    const workspaceIdHandler = (e) => {
        setWorkspaceId(e.target.value)
    }

    const bodyHandler = (e) => {
        setProjectDescription(e.target.value)
    }

    const createNewProjectHandler = (e) => {
        e.preventDefault();

        if (workspaceId && projectTitle && projectDescription) {
            var data = {
                workspace_id: workspaceId,
                project_name: projectTitle,
                project_description: projectDescription
            }
            axios.post("/project/create", data,
                {
                    headers: headers
                })
                .then(res => {
                    setSubmit(true)
                }).catch(err => console.log("Error occured"))
        } else {
            setError("Please Fill up the fileds!")
        }
    }

    const getAllWorkspace = () => {
        axios.get('/workspaces', {
            headers: headers
        })
            .then(res => {
                setWorkspaces(res.data.data);
            }).catch(error => console.log(error));
    }


    useEffect(() => {
        getAllWorkspace();
        
        return()=>{
            console.log('cleanup')
        }
    }, [])

    const createNewProject = () => {
        setSubmit(false)
        setWorkspaceId('')
        setProjectTitle('')
        setProjectDescription('')
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
            {submit ? <h2 > Project Created sccessful  <button onClick={createNewProject}>Create another one ?</button></h2> :
                <Form onSubmit={createNewProjectHandler}>
                    <Form.Group controlId="title">
                        <Form.Label>Project Title</Form.Label>
                        <Form.Control type="text" name="title" value={projectTitle} onChange={titleHandler} placeholder="Enter Title" />
                    </Form.Group>
                    <select aria-label="Default select example" onChange={workspaceIdHandler}>
                        <option>Select Workspace</option>
                        {workspaces ?.map((workspace) => {
                            return (
                                <option value={workspace.id} key={workspace.id}>{workspace.workspace_title}</option>
                            )
                        })}
                    </select>
                    <Form.Group controlId="body">
                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" rows={3} value={projectDescription} onChange={bodyHandler} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Project
                    </Button>
                    {error}
                </Form>
            }
        </section>
    )
}


export default CreateProject