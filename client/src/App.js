import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {Chat} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import JoinGame from './components/JoinGame';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const api_key = "35sqzghsfjpd";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        // console.log(user);
        setIsAuth(true);
      });
  }
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("username");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    client.disconnectUser();
    setIsAuth(false);
  };
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <h1>Game</h1>
          <JoinGame />
          <button onClick={logout}>Logout</button>
        </Chat>
      ) : (
        <>
          <Login setIsAuth={setIsAuth} />
          <Signup setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
