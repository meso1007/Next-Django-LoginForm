import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js の設定
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  // ダミーデータ（後でAPIなどでリアルデータを引き出せるように）
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales",
        data: [33, 53, 85, 41, 44, 65, 72],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    const storedUsername = sessionStorage.getItem("username");

    if (!token) {
      router.push("/");
      alert("Please Sign In first");
    } else {
      setUsername(storedUsername || "Guest");
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("username");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100">
      <header className="fixed w-full bg-transparent py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            Welcome, {username}!
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex justify-center items-center">
        {/* グラフ */}
        <div className="mt-8  w-full max-w-4xl mx-auto">
          <div className="pt-20 px-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
              <Line data={data} />
            </div>
          </div>
        </div>

        {/* 情報カード */}
        <div className=" mr-12 w-full h-full grid grid-cols-1 sm:grid-cols-1 lg:grid-col-1 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">1,200</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">
              Active Sessions
            </h3>
            <p className="text-2xl font-bold text-gray-900">350</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">$12,300</p>
          </div>
        </div>
        <div className="h-full w-full mr-20 pb-20 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Recent Activities</h2>
          <ul className="text-xl">
            <li className="mb-2">- User JohnDoe logged in.</li>
            <li className="mb-2">- User JaneDoe updated profile.</li>
            <li className="mb-2">- New sale completed: $200</li>
          </ul>
        </div>
      </div>

      {/* 最近のアクティビティ */}
    </div>
  );
};

export default Dashboard;
