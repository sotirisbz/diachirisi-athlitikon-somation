import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../../../store/slices/teamSlice.js";
import {
  createAthlete,
  updateAthlete,
} from "../../../store/slices/athleteSlice.js";
import Button from "../../../components/common/Button/Button.jsx";

export default function AthleteForm({ athlete, onSuccess, onCancel }) {
  const dispatch = useDispatch();
  const { items: teams } = useSelector((state) => state.teams);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "male",
    position: "",
    jerseyNumber: "",
    team: "",
    height: "",
    weight: "",
    status: "active",
    notes: "",
  });

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    if (athlete) {
      setFormData({
        firstName: athlete.firstName || "",
        lastName: athlete.lastName || "",
        email: athlete.email || "",
        phone: athlete.phone || "",
        dateOfBirth: athlete.dateOfBirth
          ? athlete.dateOfBirth.split("T")[0]
          : "",
        gender: athlete.gender || "male",
        position: athlete.position || "",
        jerseyNumber: athlete.jerseyNumber || "",
        team: athlete.team?._id || "",
        height: athlete.height || "",
        weight: athlete.weight || "",
        status: athlete.status || "active",
        notes: athlete.notes || "",
      });
    }
  }, [athlete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { ...formData };
      if (!data.team) delete data.team;
      if (!data.jerseyNumber) delete data.jerseyNumber;
      if (!data.height) delete data.height;
      if (!data.weight) delete data.weight;

      if (athlete) {
        await dispatch(updateAthlete({ id: athlete._id, data })).unwrap();
      } else {
        await dispatch(createAthlete(data)).unwrap();
      }
      onSuccess();
    } catch (err) {
      alert(err || "An error occured");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Όνομα *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Επίθετο *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Τηλέφωνο
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ημερομηνία Γέννησης *
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Φύλλο *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="θηλυκό">Θηλυκό</option>
            <option value="αρσενικό">Αρσενικό</option>
            <option value="άλλο">Άλλο</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Θέση *
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Αριθμός Φανέλας *
          </label>
          <input
            type="number"
            name="jerseyNumber"
            value={formData.jerseyNumber}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ομάδα *
          </label>
          <select
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Καμία Ομάδα</option>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ύψος (cm)
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Βάρος (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Κατάσταση *
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="ενεργός">Ενεργός</option>
            <option value="τραυματίας">Τραυματίας</option>
            <option value="ανενεργός">Ανενεργός</option>
            <option value="τιμωρημένος">Τιμωρημένος</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Σημειώσεις *
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : athlete ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
