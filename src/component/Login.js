import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
import { clientId } from '../constant/constant';
import { addPost } from '../api';

const App = () => {

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
    const accessToken = await gapi.auth.getToken().access_token;
    await addPost(accessToken);
  };

  return (
    <div className="App">
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
