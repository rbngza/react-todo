import React, { useState } from 'react';
import { Container, Navbar, NavLink, Form } from 'react-bootstrap';
import Task from './components/task';
import { PlusLg } from 'react-bootstrap-icons';
import { useQuery, gql, useMutation } from '@apollo/client';
import QueryResult from './components/query-result';

function App() {
  let [newTask, setNewTask] = useState('');

  const GET_TASKS = gql`
    query getTasks {
      tasks {
        id
        description
        done
      }
    }
  `;

  const CREATE_TASK = gql`
    mutation createTask($description: String, $done: Boolean) {
      createTask(description: $description, done: $done) {
        task {
          id
          description
          done
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TASKS);

  const [createTodo] = useMutation(CREATE_TASK, {
    variables: { description: newTask, done: false },
    // to observe what the mutation response returns
    onCompleted: (data) => {
      console.log(data);
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
