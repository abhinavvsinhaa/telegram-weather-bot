import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../App";

export const SubscribedUsers = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);
  console.log(token);

  const fetchUsers = async () => {
    try {   
      const res = await axios.get(
        `http://localhost:8080/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      console.log(res.data);
      setUsers(res.data);
    } catch (error) {
      console.error("Error: ", error)
    }
  };

  const handleAction = async (id, action) => {
    const res = await axios.patch(
      `http://localhost:8080/users/${id}/${action}`, {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (
      res.data === "User blocked" ||
      res.data === "User deleted" ||
      res.data === "User unblocked"
    ) {
      alert("Action successfully completed!!");
      await fetchUsers();
      return;
    }

    alert(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <h3 className="text-lg font-bold mb-2">Manage users</h3>
      <p className="text-gray-500 mb-2">
        You can view all your subscribed users here, and use actions to block or
        delete
      </p>
      <table className="w-full text-sm text-left rtl:text-right text-gray-50">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Chat Id
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr className="odd:bg-white even:bg-gray-50 border-b" key={i}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.username == "undefined" ? "<None>" : user.username}
                </th>
                <td className="px-6 py-4 text-gray-900">{user.chatId}</td>
                <td className="px-6 py-4 ">
                  <button
                    className="font-medium text-black"
                    onClick={(e) => handleAction(user.id, "block")}
                    disabled={user.isBlocked == true}
                  >
                    Block
                  </button>
                  <button
                    className="font-medium ml-3 text-black"
                    onClick={(e) => handleAction(user.id, "unblock")}
                    disabled={user.isBlocked == false}
                  >
                    Unblock
                  </button>
                  <button
                    className="font-medium text-red-600 ml-3"
                    onClick={(e) => handleAction(user.id, "delete")}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
