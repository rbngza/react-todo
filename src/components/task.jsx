import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {FileEarmarkXFill} from "react-bootstrap-icons";

function Task(props) {

    let [updatedDescription, setDescription] = useState(props.task.description);
    let [updatedStatus, setStatus] = useState(props.task.done);

    const handleStatusChange = () => {
        setStatus(!updatedStatus);
      };

    const updateTask = (e) => {
        const url = process.env.REACT_APP_API_ENDPOINT + "/tasks/" + props.task.id;
        const headers = new Headers({
            "Accept": "*/*",
          });
        fetch(url, {
            method:'PUT',
            headers: headers,
            body: new URLSearchParams({
              'description': updatedDescription,
              'done': updatedStatus
            })
        }).then(response => {
            if(!response.ok){
                return response.json();
            }
            }).catch((error) => {
            alert(error.message)
        });
    };

    const deleteTask = (e) => {
        const url = process.env.REACT_APP_API_ENDPOINT + "/tasks/" + props.task.id;
        const headers = new Headers({
            "Accept": "*/*",
          });
        fetch(url, {
            method:'DELETE',
            headers: headers,
        }).then(response => {
            if(!response.ok){
                return response.json();
            }
            }).then(alert(process.env.REACT_APP_API_ENDPOINT + props.task.id)).catch((error) => {
            alert(error.message)
        });
    };

    return (
        <Fragment>
            <FileEarmarkXFill onClick={deleteTask} className="float-left"/>
            <Form.Check className="float-right" defaultChecked={updatedStatus} onChange={handleStatusChange} type="checkbox" id={props.task.id}/>
            <Form.Control value={updatedDescription} type="input" onChange={event => setDescription(event.target.value)} aria-describedby="create todo"/>
            <Button onClick={updateTask}>Update Task</Button>
        </Fragment>
    );
}

export default Task;