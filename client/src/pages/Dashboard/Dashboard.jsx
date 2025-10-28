import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { statsService } from "../../services/stats.service.js";
import Loading from "../../components/common/Loading/Loading.jsx";
import Card from "../../components/common/Card/Card.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await statsService.getDashboardStats();
      setStats(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading fullscreen />;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;
  if (!stats) return null;

  const quickActions = [
    {
      label: "Προσθήκη Αθλητή",
      path: "/athletes",
      icon: "➕🏃",
      color: "blue",
    },
    { label: "Προσθήκη Ομάδας", path: "/teams", icon: "➕👥", color: "green" },
    {
      label: "Προσθήκη Προσωπικού",
      path: "/staff",
      icon: "➕👔",
      color: "purple",
    },
  ];

  const statCards = [
    {
      title: "Συνολικοί Αθλητές",
      value: stats.totalAthletes,
      icon: "🏃",
      color: "blue",
      path: "/athletes",
    },
    {
      title: "Συνολικές Ομάδες",
      value: stats.totalTeams,
      icon: "👥",
      color: "green",
      path: "/teams",
    },
    {
      title: "Συνολικό Προσωπικό",
      value: stats.totalStaff,
      icon: "👔",
      color: "purple",
      path: "/staff",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Πίνακας Ελέγχου</h1>
        <p className="mt-2 text-gray-600">
          Καλώς Ήλθες στον Διαχειριστή Σωματείου
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          <Card
            key={stat.title}
            classname="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(stat.path)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className="text-5xl">{stat.icon}</div>
            </div>
          </Card>;
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Ταχείς Δράσεις">
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  {action.label}
                </span>
                <span className="text-2xl">{action.icon}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card title="Αθλητές ανά Κατάσταση">
          <div className="space-y-3">
            {stats.athletesByStatus.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <span className="font-medium text-gray-700 capitalize">
                  {item._id}
                </span>
                <span className="text-xl font-bold text-gray-900">
                  {item.count}
                </span>
              </div>
            ))}
            {stats.athletesByStatus.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                Δεν υπάρχουνε διαθέσιμα δεδομένα αθλητών
              </p>
            )}
          </div>
        </Card>
      </div>

      <Card title="Ομάδες ανά Κατήγορία">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.teamsByCategory.map((item) => (
            <div
              key={item._id}
              className="p-4 bg-gray-50 rounded-lg text-center"
            >
              <p className="text-sm text-gray-600 capitalize">{item._id}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {item.count}
              </p>
            </div>
          ))}
          {stats.teamsByCategory === 0 && (
            <p className="col-span-full text-gray-500 text-center py-4">
              Δεν υπάρχουνε διαθέσιμα δεδομένα ομάδων
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
