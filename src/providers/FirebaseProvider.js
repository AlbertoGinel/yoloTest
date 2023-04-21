import React, { createContext, useEffect, useState } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

import { initializeApp } from "firebase/app";

export const FirebaseContext = createContext({});

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const FirebaseProvider = (props) => {
  const [DBusers, setDBUsers] = useState();
  const [DBgames, setDBGames] = useState();

  const [users, setUsers] = useState();
  const [games, setGames] = useState();

  const children = props.children;

  useEffect(() => {
    DBgetUsers();
    DBgetGames();

    console.log("useEffect danger!!");
  }, []);

  const DBgetUsers = async () => {
    try {
      const docRef = doc(db, "usersCollection", "1");
      const document = await getDoc(docRef);
      setDBUsers(document.data().users);
      setUsers(document.data().users);
    } catch (error) {
      console.log(error);
    }
  };

  const DBgetGames = async () => {
    try {
      const docRef = doc(db, "gamesCollection", "1");
      const document = await getDoc(docRef);
      setDBGames(document.data().gamesList);
      setGames(document.data().gamesList);
    } catch (error) {
      console.log(error);
    }
  };

  const filterUsers = (arr, filters) =>
    arr.filter((obj) =>
      Object.keys(filters).every((key) =>
        obj[key].toLowerCase().includes(filters[key].toLowerCase())
      )
    );

  const filterGames = (arr, filters) => {
    const selectedKeys = Object.keys(arr).filter(
      (obj) =>
        arr[obj]["game_name"]
          .toLowerCase()
          .includes(filters["game_name"].toLowerCase()) &&
        arr[obj]["game_category"]
          .toLowerCase()
          .includes(filters["game_category"].toLowerCase()) &&
        arr[obj]["unix_date"] > filters["unix_date"]
    );

    const filteredGames = selectedKeys.reduce((acc, key) => {
      acc[Number(key)] = arr[Number(key)];
      return acc;
    }, {});

    return filteredGames;
  };

  const getUsers = (
    filters = {
      email: "",
      address: "",
      first_name: "",
      last_name: "",
      city: "",
      country: "",
    }
  ) => {
    setUsers(filterUsers(DBusers, filters));
    return users;
  };

  const getGames = (
    filters = { game_name: "", game_category: "", unix_date: "" }
  ) => {
    setGames(filterGames(DBgames, filters));
    return games;
  };

  const createGame = async (newGame) => {
    DBgetGames();
    try {
      const nextID = parseInt(Object.keys(DBgames).at(-1)) + 1;
      const newGames = {
        ...DBgames,
        [nextID]: { ...newGame, config_options: {}, id: nextID },
      };
      const collectionRef = doc(db, "gamesCollection", "1");
      await updateDoc(collectionRef, { gamesList: newGames });
    } catch (error) {
      console.log(error);
    }
    DBgetGames();
  };

  const createUser = async (newUser) => {
    DBgetUsers();
    try {
      const newUsers = [
        ...DBusers,
        { ...newUser, games_conf: {}, id: parseInt(DBusers.at(-1).id) + 1 },
      ];
      const collectionRef = doc(db, "usersCollection", "1");
      await updateDoc(collectionRef, { users: newUsers });
    } catch (error) {
      console.log(error);
    }
    DBgetUsers();
  };

  const getUserById = (id) => {
    if (DBusers) {
      const user = DBusers.find((u) => u.id === parseInt(id));
      return user;
    } else {
      return null;
    }
  };

  const addGameToUser = async (newGame, playerId) => {

    DBgetUsers();
    try {
      const newUsers = JSON.parse(JSON.stringify(DBusers));
      const index = newUsers.findIndex((user) => user.id === parseInt(playerId))
      newUsers[index]["games_conf"][newGame.id] = newGame;
      const collectionRef = doc(db, "usersCollection", "1");
      await updateDoc(collectionRef, { users: newUsers });
    } catch (error) {
      console.log(error);
    }
    DBgetUsers();
  };

  const getGameById = (id) => {
    if(DBgames){
      return DBgames[id];
    }
  };

  const ctxResources = {
    games,
    users,
    getGames,
    getUsers,
    createGame,
    createUser,
    getUserById,
    DBgames,
    addGameToUser,
    getGameById
  };

  return (
    <FirebaseContext.Provider value={ctxResources}>
      {children}
    </FirebaseContext.Provider>
  );
};

/*

Todo:: si juegas despues de se actualicen las preferencias no te las dan

*/
