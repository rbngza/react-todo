import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {FileEarmarkXFill} from "react-bootstrap-icons";
import { gql, useMutation } from '@apollo/client';

function Task(props) {
    let [updatedDescription, setDescription] = useState(props.task.description);
    let [updatedStatus, setStatus] = useState(props.task.done);

    const UPDATE_TASK = gql`
    mutation updateTask($updateTaskId: ID!, $description: String, $done: Boolean) {
        updateTask(id: $updateTaskId, description: $description, done: $done)
      }
    `;

    const DELETE_TASK = gql`
    mutation deleteTask($deleteTaskId: ID!) {
        deleteTask(id: $deleteTaskId) {
          deletedTaskId
        }
      }
    `;

    const handleStatusChange = () => {
        setStatus(!updatedStatus);
      };

    const [updateTask] = useMutation(UPDATE_TASK, {
        variables: { updateTaskId: props.task.id, description: updatedDescription, done: updatedStatus },
        // to observe what the mutation response returns
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
            console.log(JSON.stringify(error, null, 2));        }
      });

    const [deleteTask] = useMutation(DELETE_TASK, {
        variables: { deleteTaskId: props.task.id },
        // to observe what the mutation response returns
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
            console.log(JSON.stringify(error, null, 2));
        }
      });

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