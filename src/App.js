import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Switch } from "react-router";
import axios from "axios";
function App() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    fetchRooms();
  }, []);
  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createRoom = async (newRoom) => {
    // to do : call BE to create a room
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      setRooms([...rooms, response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const createMsg = async (msgs, room) => {
    try {
      console.log(room);
      await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/msg/${room.id}`,
        msgs
      );
      room.messages.push(msgs);
      setRooms([...rooms]);
    } catch (error) {
      console.log(error);
    }
  };
  const updateRoom = async (room) => {
    try {
      await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${room.id}`,
        room
      );
      setRooms(rooms.map((ro) => (ro.id === room.id ? (ro = room) : ro)));
    } catch (error) {
      console.log(error);
    }
  };
  const deleteRoom = async (id) => {
    // to do : call BE to delete a room
    try {
      await axios.delete(
        `http://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );
      setRooms(rooms.filter((room) => room.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} createMsg={createMsg} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList
                rooms={rooms}
                createRoom={createRoom}
                deleteRoom={deleteRoom}
                updateRoom={updateRoom}
              />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
