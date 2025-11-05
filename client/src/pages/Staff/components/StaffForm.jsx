import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTeams } from "../../../store/slices/teamSlice";
import { createStaff, updateStaff } from "../../../store/slices/staffSlice";
import Button from "../../../components/common/Button/Button";

export default function StaffForm({ staff, onSuccess, onCancel }) {
  const dispatch = useDispatch();
  const { items: teams } = useSelector((state) => state.teams);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "head_coach",
    specialization: "",
    assignedTeams: [],
    status: "active",
    notes: "",
  });

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  useEffect(() => {
    if (staff) {
      setFormData({
        firstName: staff.firstName || "",
        lastName: staff.lastName || "",
        email: staff.email || "",
        phone: staff.phone || "",
        role: staff.role || "head_coach",
        specialization: staff.specialization || "",
        assignedTeams: staff.assignedTeams?.map((t) => t._id) || [],
        status: staff.status || "active",
        notes: staff.notes || "",
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData((prev) => ({ ...prev, assignedTeams: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { ...formData };
      if (!data.phone) delete data.phone;
      if (!data.specialization) delete data.specialization;
      if (!data.notes) delete data.notes;
      if (data.assignedTeams.length === 0) delete data.assignedTeams;

      if (staff) {
        await dispatch(updateStaff({ id: staff._id, data })).unwrap();
      } else {
        await dispatch(createStaff(data)).unwrap();
      }
      onSuccess();
    } catch (err) {
      alert(err || "An error occurred");
    } finally {
      setLoading(false);
    }
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
            className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Επώνυμο *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ρόλος *
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="head_coach">Πρώτος Προπονητής</option>
            <option value="assistant_coach">Βοηθός Προπονητή</option>
            <option value="trainer">Γυμναστής</option>
            <option value="physiotherapist">Φυσιοθεραπευτής</option>
            <option value="manager">Τεχνικός Διευθυντής</option>
            <option value="administrator">Διαχειριστής</option>
            <option value="other">Άλλο</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ειδίκευση
          </label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="π.χ. ενδυνάμωση, αναπτυξιακός"
            className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="active">Ενεργός</option>
            <option value="on_leave">Σε άδεια</option>
            <option value="inactive">Ανενεργός</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ανατεθημένες Ομάδες
        </label>
        <select
          multiple
          value={formData.assignedTeams}
          onChange={handleTeamChange}
          className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          size="5"
        >
          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name} - {team.sport}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          Κράτα πατημένο το Ctrl για να διαλέξεις πολλαπλές ομάδες
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Σημειώσεις
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Ακύρωση
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Αποθήκευση..." : staff ? "Ενημέρωση" : "Δημιουργία"}
        </Button>
      </div>
    </form>
  );
}
