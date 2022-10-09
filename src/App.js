import GoogleLogin from 'react-google-login';

import './App.css';

function App() {
  const handleSuccess = () => {
    console.log("first");
  };

  const handleFailure = () => {
    console.log("first");
  };

  const config = {
    clientId: '471225452171-2ss2d4v4r91paf76r1t2osv8urvpu8vs.apps.googleusercontent.com',
    clientSecretKey: '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'
  };

  return (
    <div className="App">
      hi

      <GoogleLogin
        // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        clientId={config.clientId}
        buttonText="Login"
        onSuccess={() => handleSuccess()}
        onFailure={() => handleFailure()}
        cookiePolicy={'single_host_origin'}
      />

      {/* <GoogleLogin
        clientId={config.clientId}
        buttonText="Login"
        onSuccess={() => handleSuccess()}
        onFailure={() => handleFailure()}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      /> */}
    </div>
  );
}

export default App;
