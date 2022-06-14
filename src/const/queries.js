import { gql } from '@apollo/client';

const GOOGLE_LOGIN = gql`
  mutation authGoogle($input: String!) {
    authGoogle(token: $input) {
      token
    }
  }
`;

const UPDATE_TASK = gql`
  mutation updateTask(
    $updateTaskId: ID!
    $description: String
    $done: Boolean
  ) {
    updateTask(
      id: $updateTaskId
      description: $description
      done: $done
    )
  }
`;

const DELETE_TASK = gql`
  mutation deleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      deletedTaskId
    }
  }
`;

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

export {
  CREATE_TASK,
  GET_TASKS,
  DELETE_TASK,
  UPDATE_TASK,
  GOOGLE_LOGIN,
};
