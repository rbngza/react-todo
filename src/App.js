import React, { useState } from 'react';
import { Container, Navbar, NavLink, Form } from 'react-bootstrap';
import Task from './components/task';
import { PlusLg } from 'react-bootstrap-icons';
import { useQuery, useMutation } from '@apollo/client';
import QueryResult from './components/query-result';
import { CREATE_TASK, GET_TASKS } from './const/queries';

function App() {
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
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <NavLink to="/" className="navbar-brand">
            {' '}
            ToDo in React{' '}
          </NavLink>
        </Container>
      </Navbar>
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
    </div>
  );
}

export default App;
