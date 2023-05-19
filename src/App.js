import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Amplify from '@aws-amplify/core';
import { Storage } from 'aws-amplify';


function App() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    Amplify.configure({
      Auth: {
        identityPoolId: "eu-west-3:8fc6c550-1501-4170-ad38-3a74454b55e1",
        region: "eu-west-3",
      },
      Storage: {
        AWSS3: {
          bucket: "react-bucket-lydia",
          region: "eu-west-3",
        },
      },
    });
    loadImage();
  }, []);

  const loadImage = () => {
    Storage.get("data.jpg")
      .then((result) => {
        setImageUrl(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React AWS Storage</h1>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Data"
            style={{ width: "500px", height: "500px" }}
          />
        )} 
      </header>
    </div>
  );
}

export default App;

