export const SubscribedUsers = () => {
  return (
    <div class="relative overflow-x-auto">
      <h3 className="text-lg font-bold mb-2">Manage users</h3>
      <p className="text-gray-500 mb-2">You can view all your subscribed users here, and use actions to block or delete</p>
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
          <tr class="odd:bg-white even:bg-gray-50 border-b">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4 text-gray-900">$2999</td>
            <td class="px-6 py-4 ">
              <a href="#" class="font-medium text-blue-600 hover:underline">
                Block
              </a>
              <a href="#" class="font-medium text-red-600 hover:underline ml-3">
                Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
