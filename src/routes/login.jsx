import GoogleLogin from 'react-google-login';
import { GOOGLE_LOGIN } from '../const/queries';
import { useMutation } from '@apollo/client';

function Login(){

	const [serverLogin] = useMutation(GOOGLE_LOGIN, {
    onCompleted: data => {
      localStorage.setItem('token', data.accessToken)
    }
  });

	const onSuccessGoogle = async (response) => {
		serverLogin({
      variables: {
        input: response['accessToken']
      }
    });
	  }

    const onFailureGoogle = async (response) => {
      serverLogin({
        variables: {
          input: response['accessToken']
        }
      });
      }

    return (
      <div style={{ "width" : "20%" }}>
          Login page
		  <GoogleLogin
    clientId='314738666720-8ejnd9s0v22p5qp7ibfa26hceuo8qg9i.apps.googleusercontent.com'
    buttonText="Login with Google"
    onSuccess={onSuccessGoogle}
    onFailure={onFailureGoogle}
    cookiePolicy={'single_host_origin'}
  />
      </div>
    );

};

export default Login;
