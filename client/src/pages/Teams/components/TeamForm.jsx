import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaff } from "../../../store/slices/staffSlice.js";
import { updateTeam, createTeam } from "../../../store/slices/teamSlice.js";
import Button from "../../../components/common/Button/Button.jsx";

export default function TeamForm({ team, onSuccess, onCancel }) {
  const dispatch = useDispatch();
  const { items: staff } = useSelector((state) => state.staff);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    category: "amateur",
    ageGroup: "",
    coach: "",
    maxCapacity: 25,
    description: "",
    status: "active",
  });

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name || "",
        sport: team.sport || "",
        category: team.category || "amateur",
        ageGroup: team.ageGroup || "",
        coach: team.coach?._id || "",
        maxCapacity: team.maxCapacity || 25,
        description: team.description || "",
        status: team.status || "active",
      });
    }
  }, [team]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { ...formData };
      if (!data.coach) delete data.coach;
      if (!data.ageGroup) delete data.ageGroup;
      if (!data.description) delete data.description;

      if (team) {
        await dispatch(updateTeam({ id: team._id, data })).unwrap();
      } else {
        await dispatch(createTeam(data)).unwrap();
      }

      onSuccess();
    } catch (err) {
      alert(err || "An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const coaches = staff.filter(
    (s) => s.role === "head_coach" || s.role === "assistant_coach"
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Όνομα Ομάδας *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Άθλημα *
          </label>
          <input
            type="text"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            required
            placeholder="π.χ. Ποδόσφαιρο, Μπάσκετ, Βολεϊ"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Κατηγορία *
          </label>
          <select
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="π.χ. Ποδόσφαιρο, Μπάσκετ, Βολεϊ"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="youth">Νέων</option>
            <option value="junior">Junior</option>
            <option value="senrior">Μεγάλων Ηλικιών</option>
            <option value="professional">Επαγγελματικό</option>
            <option value="amateur">Ερασιτεχνικό</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ηλικιακή Ομάδα *
          </label>
          <input
            type="text"
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            placeholder="π.χ. U-16, 18-21"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Πρώτος Προπονητής
          </label>
          <select
            name="coatch"
            value={formData.coach}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Χωρίς Προπονητή</option>
            {coaches.map((coach) => (
              <option key={coach._id} value={coach._id}>
                {coach.firstName} {coach.lastName} ({coach.role})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Μέγιστη Χωρητικότητα *
          </label>
          <input
            type="number"
            name="maxCapacity"
            value={formData.maxCapacity}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Κατάσταση *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="active">Ενεργός</option>
            <option value="inactive">Ανενεργός</option>
            <option value="suspended">Τιμωρημένος</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Περιγραφή *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Ακύρωση
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Αποθήκευση..." : team ? "Ενημέρωση" : "Δημιουργία"}
        </Button>
      </div>
    </form>
  );
}
