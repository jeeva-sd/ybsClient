import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { setLoginCredentials } from '../action/login';
import { clientId } from '../constant/constant';
import '../assets/css/login.scss';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/blogger"
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const handleSuccess = async (e) => {
    const { email, name, imageUrl } = e.profileObj;
    const accessToken = await gapi.auth.getToken().access_token;

    dispatch(setLoginCredentials({ name, email, imageUrl, accessToken }));
    navigate('/youtube');
  };

  return (
    <div className="login-app">
      <GoogleLogin
        clientId={clientId}
        onSuccess={(e) => handleSuccess(e)}
        onFailure={(e) => console.log(e)}
      // isSignedIn={true}
      />
    </div>
  );
};

export default App;
