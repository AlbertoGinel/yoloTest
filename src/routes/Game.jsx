import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import moment from "moment";
import { FirebaseContext } from "../providers/FirebaseProvider";

const Game = () => {
  const [game, setGame] = useState();

  const { getGameById } = useContext(FirebaseContext);

  let { gameId } = useParams();

  useEffect(() => {
    setGame(getGameById(gameId));
  }, [gameId, getGameById]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {!game ? (
        <p className="text-3xl font-bold font-montserrat absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          Loading...
        </p>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 pt-6">
            {game.game_name}
          </h1>

          <h1 className="text-xl text-center text-gray-900 mb-3">
            <span>Category:</span>{" "}
            <span className="font-bold">{game.game_category}</span>
          </h1>

          <h1 className="text-xl text-center text-gray-900 mb-3">
            <span>Create:</span>{" "}
            <span className="font-bold">
              {moment.unix(game.unix_date / 1000).format("DD/MM/YYYY")}
            </span>
          </h1>

          {Object.keys(game.config_options).length === 0 ? (
            <h1 className="text-xl font-bold text-center text-gray-900 mb-8 pt-6">
              <span>No Game options</span>
            </h1>
          ) : (
            <>
              <h1 className="text-xl font-bold text-gray-900">
                Configuration Options:
              </h1>

              {Object.keys(game.config_options).map((optionKey, index) => (
                <div key={index} className="flex flex-col p-2">
                  <div className="bg-gray-200 px-2 rounded-t-md">
                    <span>Option name:</span>{" "}
                    <span className="font-bold">
                      {game.config_options[optionKey].name}
                    </span>
                  </div>
                  <div className="bg-gray-300 px-2">
                    <span>Default option:</span>{" "}
                    <span className="font-bold">
                      {game.config_options[optionKey].currentValue}
                    </span>
                  </div>
                  <div className="bg-gray-200 px-2">options:</div>
                  <div className="bg-gray-300 px-2 rounded-b-md flex flex-row">
                    {game.config_options[optionKey].values.map((value, key) => (
                      <div
                        key={key}
                        className="bg-gray-300 p-1 even:bg-gray-300 odd:bg-gray-200 my-2"
                      >
                        {value}
                      </div>
                    ))}{" "}
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Game;
