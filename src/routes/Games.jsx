import React, { useContext, useState } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Games = () => {
  const { games, getGames, createGame } = useContext(FirebaseContext);

  const [gamesFilter, setGamesFilter] = useState({
    game_name: "",
    game_category: "",
    unix_date: "",
  });

  const [NewGame, setNewGame] = useState({
    game_name: "",
    game_category: "",
  });

  const navigate = useNavigate();

  const handleChangeForm = (event) => {
    setGamesFilter((curr) => ({
      ...curr,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeDate = (event) => {
    setGamesFilter((curr) => ({
      ...curr,
      unix_date: moment(String(event.target.value), "YYYY-MM-DD").unix() * 1000,
    }));
  };

  const handleChangeFormCreate = (event) => {
    setNewGame((curr) => ({
      ...curr,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSearchGames = () => {
    getGames(gamesFilter);
  };

  const handleClickUser = (id) => {
    navigate("/game/" + id);
  };

  const handleClickUsersPage = () => {
    navigate("/users/");
  };

  const handleClickCreate = () => {
    const gameWithDate = { ...NewGame, unix_date: Date.now() };
    createGame(gameWithDate);
    setNewGame({
      game_name: "",
      game_category: "",
    });
  };

  //
  const handleClearFilters = () => {
    setGamesFilter({
      game_name: "",
      game_category: "",
      unix_date: "",
    });
    getGames({
      game_name: "",
      game_category: "",
      unix_date: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {!games ? (
        <p className="text-3xl font-bold font-montserrat absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          Loading...
        </p>
      ) : (
        <>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded my-3"
              onClick={handleClickUsersPage}
            >
              Users
            </button>
          </div>

          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Games
          </h1>

          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeForm}
              value={gamesFilter.game_name}
              type="text"
              id="game_name"
              name="game_name"
              placeholder="Name"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeForm}
              value={gamesFilter.game_category}
              type="text"
              id="game_category"
              name="game_category"
              placeholder="Category"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeDate}
              value={
                gamesFilter.unix_date === ""
                  ? ""
                  : moment
                      .unix(gamesFilter.unix_date / 1000)
                      .format("YYYY-MM-DD")
              }
              type="date"
              id="unix_date"
              name="unix_date"
            />
          </div>

          <div className="flex justify-center py-6">
            <button
              className="px-4 py-2 text-white bg-blue-300 rounded-l-lg hover:bg-gray-600 focus:outline-none focus:shadow-outline"
              onClick={handleClearFilters}
            >
              Clear filters
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-700 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              onClick={handleSearchGames}
            >
              Search
            </button>
          </div>

          <div className="min-w-full divide-y divide-gray-200">
            <div className="flex items-center py-2 px-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-500 uppercase tracking-wider">
              <div className="w-1/3">Name</div>
              <div className="w-1/3">Category</div>
              <div className="w-1/3">Date</div>
            </div>
            <div className="divide-y divide-gray-200">
              {Object.keys(games).map((gameKey, index) => (
                <div
                  key={index}
                  onClick={() => handleClickUser(games[gameKey].id)}
                  className="flex items-center py-4 px-6 bg-gray-100"
                >
                  <div className="w-1/3 p-1">{games[gameKey].game_name}</div>
                  <div className="w-1/3">{games[gameKey].game_category}</div>
                  <div className="w-1/3">
                    {moment
                      .unix(games[gameKey].unix_date / 1000)
                      .format("DD/MM/YYYY")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeFormCreate}
              value={NewGame.game_name}
              type="text"
              id="game_name"
              name="game_name"
              placeholder="Name"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeFormCreate}
              value={NewGame.game_category}
              type="text"
              id="game_category"
              name="game_category"
              placeholder="Category"
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded my-3"
              onClick={handleClickCreate}
            >
              Create Game
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Games;
