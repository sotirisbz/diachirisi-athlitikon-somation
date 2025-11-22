import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { statsService } from "../../services/stats.service.js";
import Loading from "../../components/common/Loading/Loading.jsx";
import Card from "../../components/common/Card/Card.jsx";
import Button from "../../components/common/Button/Button.jsx";
import Badge from "../../components/common/Badge/Badge.jsx";

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

  if (loading) return <Loading fullscreen text="Φορτώνει ο Πίνακας Ελέγχου" />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card classname="max-w-md">
          <div className="text-center py-8">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Σφάλμα στη φόρτωση του Πίνακα Ελέγχου
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchStats}>Δοκίμασε Ξανά</Button>
          </div>
        </Card>
      </div>
    );
  if (!stats) return null;

  const quickActions = [
    {
      label: "Προσθήκη Αθλητή",
      path: "/athletes",
      icon: "➕",
      color: "from-blue-500 to-blue-600",
      description: "Εγγραφή νέου αθλητή",
    },
    {
      label: "Προσθήκη Ομάδας",
      path: "/teams",
      icon: "➕",
      color: "from-green-500 to-green-600",
      description: "Δημιουργία νέας ομάδας",
    },
    {
      label: "Προσθήκη Προσωπικού",
      path: "/staff",
      icon: "➕",
      color: "purple",
      description: "Πρόσληψη προσωπικού",
    },
  ];

  const statCards = [
    {
      title: "Συνολικοί Αθλητές",
      value: stats.totalAthletes,
      icon: "🏃",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      path: "/athletes",
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Συνολικές Ομάδες",
      value: stats.totalTeams,
      icon: "👥",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      path: "/teams",
      change: "+5%",
      changeType: "increase",
    },
    {
      title: "Συνολικό Προσωπικό",
      value: stats.totalStaff,
      icon: "👔",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      path: "/staff",
      change: "+2%",
      changeType: "increase",
    },
  ];

  const getStatusVariant = (status) => {
    const variants = {
      active: "success",
      injured: "danger",
      inactive: "default",
      suspended: "wanring",
    };
    return variants[status] || "default";
  };

  const getCategoryColor = (category) => {
    const colors = {
      youth: "primary",
      junior: "info",
      senior: "success",
      professional: "warning",
      amateur: "default",
    };
    return colors[category] || "default";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Πίνακας Ελέγχου</h1>
          <p className="mt-2 text-lg text-gray-600">Καλωσήρθες. </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={fetchStats} leftIcon="🔄">
            Ανανέωση
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          <Card
            key={stat.title}
            classname="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0"
            onClick={() => navigate(stat.path)}
            noPadding
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <div className="flex items-center gap-1">
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === "increase"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.changeType === "increase" ? "↑" : "↓"}{" "}
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500">
                        από τον προηγούμενο μήνα
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <span className="text-3xl">{stat.icon}</span>
                </div>
              </div>
            </div>
            <div
              className={`${stat.bgColor} px-6 py-3 border-t border-gray-100`}
            >
              <p className={`text-sm font-medium ${stat.textColor}`}>
                Προβολή Όλων
              </p>
            </div>
          </Card>;
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Ταχείς Δράσεις" subtitle="Συνήθεις εργασίες">
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
                  >
                    <span className="text-2xl">{action.icon}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {action.label}
                    </p>
                    <p className="text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:blue-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ))}
          </div>
        </Card>

        <Card title="Αθλητές ανά Κατάσταση" subtitle="Ανάλυση τρέχων ρόστερ">
          {stats.athletesByStatus.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-3">🏃</div>
              <p className="font-medium">
                Δεν έχει καταγραφεί κανένας αθλητής έως τώρα
              </p>
              <Button
                className="mt-4"
                size="sm"
                onClick={() => navigate("/athletes")}
              >
                Προσθήκη πρώτου αθλητή
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.athletesByStatus.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusVariant(item._id)}>
                      {item._id}
                    </Badge>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card title="Ομάδες ανά Κατήγορία" subtitle="Κατανομή ομάδων">
        {stats.teamsByCategory.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-5xl mb-3">👥</div>
            <p className="font-medium">Δεν δημιουργήθηκαν ομάδες ακόμα</p>
            <Button
              className="mt-4"
              size="sm"
              onClick={() => navigate("/teams")}
            >
              Δημιουργία της πρώτης ομάδας
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.teamsByCategory.map((item) => (
              <div
                key={item._id}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <Badge
                  variant={getCategoryColor(item._id)}
                  size="lg"
                  className="mb-3"
                >
                  {item._id}
                </Badge>
                <p className="text-3xl font-bold text-gray-900">{item.count}</p>
                <p className="text-sm text-gray-500 mt-1">ομάδες</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
