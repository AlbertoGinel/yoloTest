import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { useParams } from "react-router";
import moment from "moment";

const User = () => {
  const [user, setUser] = useState();
  const [userOut, setUserOut] = useState();
  const [idMenu, setIdMenu] = useState(0);
  const [dynamicSelection, setDynamicSelection] = useState({});

  const { getUserById, games, addGameToUser, DBgames } =
    useContext(FirebaseContext);

  let { userId } = useParams();

  useEffect(() => {
    setUser(getUserById(userId));
  }, [getUserById, userId]);

  useEffect(() => {
    if (!!user && !!games && user["id"].toString() === userId) {
      //let prevUser = { ...user }; is not a copy, is still reference!!
      let prevUser = JSON.parse(JSON.stringify(user));

      Object.keys(games).forEach((gameKey) => {
        if (
          Object.keys(prevUser.games_conf).includes(
            games[gameKey].id.toString()
          )
        ) {
          prevUser.games_conf[gameKey].gameOptions =
            DBgames[gameKey].config_options;

          Object.keys(prevUser.games_conf[gameKey].gameOptions).forEach(
            (elementKey) => {
              prevUser.games_conf[gameKey].gameOptions[elementKey][
                "currentValue"
              ] = games[gameKey].config_options[elementKey]["currentValue"];
            }
          );
        } else {
          prevUser.games_conf = {
            ...prevUser.games_conf,
            [games[gameKey].id]: {
              id: games[gameKey].id,
              game_name: games[gameKey].game_name,
            },
          };
        }
      });

      if (JSON.stringify(prevUser) !== JSON.stringify(user)) {
        setUserOut(prevUser);
      }
    }
  }, [DBgames, games, user, userId]);

  const PlayToday = (gameId, playerId) => {

    let newGame = {};

    if (Object.keys(user.games_conf).includes(gameId)) {
      newGame = {
        ...user.games_conf[gameId],
        lastTimePlayed: Date.now(),
        amountPlayed:
          user.games_conf[gameId]["amountPlayed"] +
          Math.floor(Math.random() * (200 - 50 + 1)) +
          50,
        amountWon:
          user.games_conf[gameId]["amountWon"] +
          Math.floor(Math.random() * (100 - 50 + 1)) +
          50,
      };
      const newConfig =  {...games[gameId].config_options, ...newGame.games_conf};

      for (let option in newConfig) {
        delete newConfig[option]["values"];
      }

/*        newGame = {
        ...newGame,
        games_conf : { newConfig }
      }; */

    } else {

      const newOptions = games[gameId].config_options;

      for (let option in newOptions) {
        delete newOptions[option]["values"];
      }

      newGame = {
        id: parseInt(gameId),
        games_conf: newOptions,
        game_name: games[gameId]["game_name"],
        lastTimePlayed: Date.now(),
        amountPlayed: Math.floor(Math.random() * (200 - 50 + 1)) + 50,
        amountWon: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
      };
    }

    addGameToUser(newGame, playerId);
  };

  const handleClickGame = (idGame) => {
    setDynamicSelection({});
    Object.keys(userOut.games_conf[idGame].games_conf).map((option) => {
      setDynamicSelection((pre) => ({
        ...pre,
        [option]: userOut.games_conf[idGame].games_conf[option]["currentValue"],
      }));
    });

    if (idMenu === idGame) {
      setIdMenu(0);
    } else {
      setIdMenu(idGame);
    }
  };

  const handleDynamicChange = (event, optionKey) => {
    setDynamicSelection((pre) => ({ ...pre, [optionKey]: event.target.value }));
  };

  const savePreference = (optionKey, gameKey) => {
    const newGame = JSON.parse(JSON.stringify(user.games_conf[gameKey]));
    newGame.games_conf[optionKey]["currentValue"] = dynamicSelection[optionKey];
    addGameToUser(newGame, userId);
  };

  //can't access property "currentValue", newGame.games_conf[gameKey] is undefined

  return (
    <div className="bg-gray-100 min-h-screen">
      {!userOut ? (
        <p className="text-3xl font-bold font-montserrat absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          Loading...
        </p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                <span>{userOut.first_name}</span>{" "}
                <span>{userOut.last_name}</span>
              </div>
              <p className="text-gray-700 text-base">
                <span className="font-bold">Country:</span>{" "}
                <span>{userOut.country}</span>
                <br />
                <span className="font-bold">City:</span>{" "}
                <span>{userOut.city}</span>
                <br />
                <span className="font-bold">Address:</span>{" "}
                <span>{userOut.address}</span>
                <br />
                <span className="font-bold">Email:</span>{" "}
                <span>{userOut.email}</span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="flex justify-center">
              <div className="w-full lg:w-11/12">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-gray-600 text-left">
                        <th className="font-semibold text-sm uppercase px-2 py-4 text-center">
                          Game name
                        </th>
                        <th className="font-semibold text-sm uppercase px-2 py-4 text-center">
                          Last time played
                        </th>
                        <th className="font-semibold text-sm uppercase px-2 py-4 text-center">
                          Open
                        </th>
                        <th className="font-semibold text-sm uppercase px-2 py-4 text-center">
                          Simulate session
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {Object.keys(userOut.games_conf).map(
                        (gameKey, index1) => (
                          <React.Fragment key={index1}>
                            <tr
                              className={`${
                                "lastTimePlayed" in userOut.games_conf[gameKey]
                                  ? "bg-gray-300"
                                  : "bg-gray-100"
                              } text-gray-700`}
                            >
                              <td className="px-2 py-4 text-center">
                                {userOut.games_conf[gameKey].game_name}
                              </td>
                              <td className="px-2 py-4 text-center">
                                {"lastTimePlayed" in userOut.games_conf[gameKey]
                                  ? moment
                                      .unix(
                                        userOut.games_conf[gameKey]
                                          .lastTimePlayed / 1000
                                      )
                                      .format("DD/MM/YYYY hh:mm")
                                  : "never"}
                              </td>

                              <td className="px-2 py-4 text-center">
                                {"lastTimePlayed" in
                                  userOut.games_conf[gameKey] && (
                                  <button
                                    onClick={() => handleClickGame(gameKey)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
                                  >
                                    Open
                                  </button>
                                )}
                              </td>
                              <td className="px-2 py-4 text-center">
                                {" "}
                                <button
                                  onClick={() => PlayToday(gameKey, userOut.id)}
                                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-sm"
                                >
                                  Play
                                </button>
                              </td>
                            </tr>

                            <tr>
                              <td className="w-full" colSpan="4">
                                {idMenu === gameKey && (
                                  <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden w-full">
                                    <div className="font-bold mb-2">
                                      <span>
                                        {userOut.games_conf[gameKey].game_name}
                                      </span>
                                    </div>
                                    <div className="text-gray-700 text-base">
                                      <span className="font-bold">
                                        lastTimePlayed:
                                      </span>{" "}
                                      <span>
                                        {moment
                                          .unix(
                                            userOut.games_conf[gameKey]
                                              .lastTimePlayed / 1000
                                          )
                                          .format("DD/MM/YYYY hh:mm")}
                                      </span>
                                      <br />
                                      <span className="font-bold">
                                        amountPlayed:
                                      </span>{" "}
                                      <span>
                                        {
                                          userOut.games_conf[gameKey]
                                            .amountPlayed
                                        }
                                      </span>
                                      <br />
                                      <span className="font-bold">
                                        amountWon:
                                      </span>{" "}
                                      <span>
                                        {userOut.games_conf[gameKey].amountWon}
                                      </span>
                                      <br />
                                      <span className="font-bold">
                                        Preferences:
                                      </span>{" "}
                                      {Object.keys(
                                        userOut.games_conf[gameKey].games_conf
                                      ).map((optionKey, index2) => (
                                        <div key={index2}>
                                          <span className="font-bold">
                                            {
                                              userOut.games_conf[gameKey]
                                                .gameOptions[optionKey].name
                                            }
                                          </span>

                                          <select
                                            className=" block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
                                            value={dynamicSelection[optionKey]}
                                            onChange={(e) =>
                                              handleDynamicChange(e, optionKey)
                                            }
                                          >
                                            {userOut.games_conf[
                                              gameKey
                                            ].gameOptions[optionKey][
                                              "values"
                                            ].map((preference, index3) => (
                                              <option key={index3}>
                                                {preference}
                                              </option>
                                            ))}
                                          </select>

                                          {dynamicSelection[optionKey] !==
                                            userOut.games_conf[gameKey]
                                              .games_conf[optionKey][
                                              "currentValue"
                                            ] && (
                                            <button
                                              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm"
                                              onClick={() =>
                                                savePreference(
                                                  optionKey,
                                                  gameKey
                                                )
                                              }
                                            >
                                              Save
                                            </button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          </React.Fragment>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
