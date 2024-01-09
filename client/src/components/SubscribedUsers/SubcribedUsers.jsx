import { useEffect, useState } from "react";
import axios from "axios";

export const SubscribedUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.post(
      "https://telegram-weather-bot-server-gz9r.onrender.com/users",
      {
        username: "testadmin",
        password: "testing123@",
      }
    );

    console.log(res.data);
    setUsers(res.data);
  };

  const handleAction = async (id, action) => {
    const res = await axios.patch(
      `https://telegram-weather-bot-server-gz9r.onrender.com/users/${id}/${action}`);

    if (res.data == 'User blocked' || res.data == 'User deleted' || res.data == 'User unblocked') {
      alert('Action successfully completed!!')
      await fetchUsers()
      return
    }

    alert(res.data)
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div class="relative overflow-x-auto">
      <h3 className="text-lg font-bold mb-2">Manage users</h3>
      <p className="text-gray-500 mb-2">
        You can view all your subscribed users here, and use actions to block or
        delete
      </p>
      <table class="w-full text-sm text-left rtl:text-right text-gray-50">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              Username
            </th>
            <th scope="col" class="px-6 py-3">
              Chat Id
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr class="odd:bg-white even:bg-gray-50 border-b" key={i}>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.username == "undefined" ? "<None>" : user.username}
                </th>
                <td class="px-6 py-4 text-gray-900">{user.chatId}</td>
                <td class="px-6 py-4 ">
                  <button class="font-medium text-black" onClick={(e) => handleAction(user.id, 'block')} disabled={ user.isBlocked == true }>
                    Block
                  </button>
                  <button class="font-medium ml-3 text-black" onClick={(e) => handleAction(user.id, 'unblock')} disabled={ user.isBlocked == false }>
                    Unblock
                  </button>
                  <button class="font-medium text-red-600 ml-3" onClick={(e) => handleAction(user.id, 'delete')}>
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
