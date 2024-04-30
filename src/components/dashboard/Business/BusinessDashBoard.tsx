import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <button className=" hover:bg-blue-700 px-4 py-2 rounded-md border ">
            back to shop
          </button>
          <div className="text-xl font-bold">Admin Dashboard</div>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-8 flex">
        {/* Sidebar */}
        <aside className="bg-gray-800 w-64  hidden md:block px-9 p-4 ">
          <ul className="space-y-4 gap-x-11">
            <li>
              <a href="#" className="block text-gray-400 hover:text-white">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-400 hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-400 hover:text-white">
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-400 hover:text-white">
                Customers
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-400 hover:text-white">
                Settings
              </a>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Welcome, Admin!</h1>

          {/* Dashboard Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="bg-blue-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Total Products</h2>
              <p className="text-4xl">100</p>
            </div>
            <div className="bg-green-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Total Orders</h2>
              <p className="text-4xl">50</p>
            </div>
            <div className="bg-yellow-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Total Customers</h2>
              <p className="text-4xl">200</p>
            </div>
            <div className="bg-red-600 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
              <p className="text-4xl">10</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2">Order ID</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Dummy order data */}
                <tr className="border-b border-gray-700">
                  <td className="py-2">#1001</td>
                  <td className="py-2">John Doe</td>
                  <td className="py-2">$100.00</td>
                  <td className="py-2">Pending</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2">#1002</td>
                  <td className="py-2">Jane Smith</td>
                  <td className="py-2">$150.00</td>
                  <td className="py-2">Shipped</td>
                </tr>
                {/* Add more order rows as needed */}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
