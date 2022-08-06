import React from "react";
import axios from "axios";
import { Header } from './Header';
import { Footer } from './Footer';
import './App.css';

function App() {
  const [data, setData] = React.useState();
  const url = "http://127.0.0.1:8000/users/";

  const GetData = () => {
    axios.get(url).then((res) => {
      setData(res.data);
    })
      .catch((error) => {
        console.log(error);
      })

  };
  return (
    <div className="App">
      <Header></Header>
      
      <div>ここ</div>
      {!data && <button onClick={GetData}>データを取得</button>}
      {data && <div>{data[0].id}</div>}
      {data && <div>{data[0].email}</div>}

      <Footer></Footer>
    </div>
  );
}

export default App;
