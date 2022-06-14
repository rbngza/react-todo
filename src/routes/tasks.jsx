import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TASK, GET_TASKS } from "../const/queries";
import Task from "../components/task";
import { PlusLg } from 'react-bootstrap-icons';
import QueryResult from "../components/query-result";

function Tasks(props) {

    let [newTask, setNewTask] = useState('');

  const { loading, error, data } = useQuery(GET_TASKS);

  const [createTodo] = useMutation(CREATE_TASK, {
    variables: { description: newTask, done: false },
    // to observe what the mutation response returns
    update: (cache, { data }) => {
      // Fetch the tasks from the cache
      const existingTasks = cache.readQuery({
        query: GET_TASKS,
      });

      const tasks = [data.createTask, ...existingTasks.tasks];

      // Add the new task to the cache
      cache.writeQuery({
        query: GET_TASKS,
        data: {
          tasks,
        },
      });
    },
  });
    return (
        <Form className="mb-3">
        <Form.Control
          type="input"
          onChange={(event) => setNewTask(event.target.value)}
          aria-describedby="create todo"
        />
        <PlusLg onClick={createTodo} /> Add todo
        <div key={`default-checkbox`} className="mb-3">
          <QueryResult error={error} loading={loading} data={data}>
            {data?.tasks?.map((task, index) => (
              <Task key={task.id} task={task} />
            ))}
          </QueryResult>
        </div>
      </Form>
    );
}

export default Tasks;