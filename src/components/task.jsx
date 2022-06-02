import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {FileEarmarkXFill} from "react-bootstrap-icons";
import { useMutation } from '@apollo/client';
import { UPDATE_TASK, DELETE_TASK, GET_TASKS } from "../const/queries";

function Task(props) {
    let [updatedDescription, setDescription] = useState(props.task.description);
    let [updatedStatus, setStatus] = useState(props.task.done);

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
    update: (cache, { data }) => {
        // Fetch the tasks from the cache
        const existingTasks = cache.readQuery({
          query: GET_TASKS,
        });
  
        const tasks = existingTasks.tasks.filter(task => task.id != data.deleteTask.deletedTaskId);
  
        // Add the new task to the cache
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks,
          },
        });
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