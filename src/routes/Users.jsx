import React, { useContext, useState } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [usersFilter, setUsersFilter] = useState({
    email: "",
    address: "",
    first_name: "",
    last_name: "",
    city: "",
    country: "",
  });

  const [newUser, setNewUser] = useState({
    email: "",
    address: "",
    first_name: "",
    last_name: "",
    city: "",
    country: "",
  });

  const { users, getUsers, createUser } = useContext(FirebaseContext);

  const navigate = useNavigate();

  const handleChangeForm = (event) => {
    setUsersFilter((curr) => ({
      ...curr,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCreateForm = (event) => {
    setNewUser((curr) => ({
      ...curr,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSearchUsers = () => {
    getUsers(usersFilter);
  };

  const handleClickCreate = () => {
    createUser(newUser);

    setNewUser({
      email: "",
      address: "",
      first_name: "",
      last_name: "",
      city: "",
      country: "",
    });
  };

  const handleClickUser = (id) => {
    navigate("/user/" + id);
  };

  const handleClickGamesPage = () => {
    navigate("/games/");
  };
  const handleClearFilters = () => {
    setUsersFilter({
      email: "",
      address: "",
      first_name: "",
      last_name: "",
      city: "",
      country: "",
    });
    getUsers({
      email: "",
      address: "",
      first_name: "",
      last_name: "",
      city: "",
      country: "",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {!users ? (
        <p className="text-3xl font-bold font-montserrat absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          Loading...
        </p>
      ) : (
        <>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded my-3"
              onClick={handleClickGamesPage}
            >
              Games
            </button>
          </div>

          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Users
          </h1>

          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeForm}
              value={usersFilter.email}
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeForm}
              value={usersFilter.address}
              type="text"
              id="address"
              name="address"
              placeholder="Address"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeForm}
              value={usersFilter.first_name}
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeForm}
              value={usersFilter.last_name}
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last name"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeForm}
              value={usersFilter.city}
              type="text"
              id="city"
              name="city"
              placeholder="City"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleChangeForm}
              value={usersFilter.country}
              type="text"
              id="country"
              name="country"
              placeholder="Country"
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
              onClick={handleSearchUsers}
            >
              Search
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="flex justify-center">
              <div className="w-full lg:w-11/12">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr className="text-gray-600 text-left">
                        <th className="font-semibold text-sm uppercase px-6 py-4 sm:py-2 md:py-3 lg:py-4">
                          First name
                        </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 sm:py-2 md:py-3 lg:py-4">
                          Last name
                        </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 sm:py-2 md:py-3 lg:py-4">
                          Country
                        </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 md:py-3 lg:py-4 hidden sm:table-cell">
                          City
                        </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 md:py-3 lg:py-4 hidden sm:table-cell">
                          Address
                        </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 md:py-3 lg:py-4 hidden md:table-cell">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user, index) => (
                        <tr
                          key={index}
                          onClick={() => handleClickUser(user.id)}
                          className="text-gray-700"
                        >
                          <td className="px-6 py-4 sm:py-2 md:py-3 lg:py-4">
                            {user.first_name}
                          </td>
                          <td className="px-6 py-4 sm:py-2 md:py-3 lg:py-4">
                            {user.last_name}
                          </td>
                          <td className="px-6 py-4 sm:py-2 md:py-3 lg:py-4">
                            {user.country}
                          </td>
                          <td className="px-6 py-4 md:py-3 lg:py-4 hidden sm:table-cell">
                            {user.city}
                          </td>
                          <td className="px-6 py-4 md:py-3 lg:py-4 hidden sm:table-cell">
                            {user.address}
                          </td>
                          <td className="px-6 py-4 md:py-3 lg:py-4 hidden md:table-cell">
                            {user.email}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleCreateForm}
              value={newUser.email}
              type="text"
              id="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleCreateForm}
              value={newUser.address}
              type="text"
              id="address"
              name="address"
              placeholder="Address"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleCreateForm}
              value={newUser.first_name}
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleCreateForm}
              value={newUser.last_name}
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last name"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleCreateForm}
              value={newUser.city}
              type="text"
              id="city"
              name="city"
              placeholder="City"
            />
            <input
              className="bg-gray-200 rounded-lg px-4 mx-7 py-2"
              onChange={handleCreateForm}
              value={newUser.country}
              type="text"
              id="country"
              name="country"
              placeholder="Country"
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded my-3"
              onClick={handleClickCreate}
            >
              Create
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;

/*

          <div className="overflow-x-auto">
      <div className="flex justify-center">
        <div className="w-full lg:w-11/12">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-left">
                  <th className="font-semibold text-sm uppercase px-6 py-4 sm:py-2 md:py-3">
                    Name
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 sm:py-2 md:py-3">
                    Email
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 sm:py-2 md:py-3">
                    Phone
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 sm:py-2 md:py-3">
                    Status
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 sm:py-2 md:py-3">
                    Role
                  </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 sm:py-2 md:py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1,2,3,4,5,6].map((row, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-6 py-4 sm:py-2 md:py-3">name</td>
                    <td className="px-6 py-4 sm:py-2 md:py-3">email</td>
                    <td className="px-6 py-4 sm:py-2 md:py-3">phone</td>
                    <td className="px-6 py-4 sm:py-2 md:py-3">
                      <span className="px-2 py-1 font-semibold leading-tight rounded-full text-green-700 bg-green-100">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 sm:py-2 md:py-3">role</td>
                    <td className="px-6 py-4 sm:py-2 md:py-3">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  

*/
