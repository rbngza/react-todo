import React, { useState, useEffect } from 'react';
import { Container, Navbar, NavLink, Form } from 'react-bootstrap';
import Task from './components/task';
import { PlusLg } from 'react-bootstrap-icons';

function App() {
  let [tasks, setTasks] = useState([]);

  let [newTask, setNewTask] = useState('');

  const GET_TASK = gql`
    query getTasks {
      tasks {
        id
        description
        done
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TASK, {
    variables: { trackId },
  });

  const createTodo = () => {
    const headers = new Headers({
      Accept: '*/*',
    });
    fetch(process.env.REACT_APP_API_ENDPOINT + '/tasks', {
      method: 'POST',
      headers: headers,
      body: new URLSearchParams({
        description: newTask,
        done: false,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response;
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
