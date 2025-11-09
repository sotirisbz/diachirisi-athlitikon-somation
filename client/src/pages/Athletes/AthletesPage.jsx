import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAthlete,
  fetchAthletes,
} from "../../store/slices/athleteSlice.js";
import Button from "../../components/common/Button/Button.jsx";
import Loading from "../../components/common/Loading/Loading.jsx";
import Card from "../../components/common/Card/Card.jsx";
import DataTable from "../../components/common/DataTable/DataTable.jsx";
import Modal from "../../components/common/Modal/Modal.jsx";
import AthleteForm from "./components/AthleteForm.jsx";

export default function AthletesPage() {
  const dispatch = useDispatch();
  const { items: athletes, loading } = useSelector((state) => state.athletes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAthletes());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Είσαι σίγουρος οτι θέλεις να διαγράψεις αυτόν τον αθλητή;"
      )
    ) {
      await dispatch(deleteAthlete(id));
    }
  };

  const handleEdit = (athlete) => {
    setSelectedAthlete(athlete);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAthlete(null);
  };

  const handleFormSuccess = () => {
    handleCloseModal();
    dispatch(fetchAthletes());
  };

  const filteredAthletes = athletes.filter(
    (athlete) =>
      athlete.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: "fullName",
      label: "Όνομα",
      render: (row) => `${row.firstName} ${row.lastName}`,
    },
    { key: "email", label: "Email" },
    { key: "position", label: "Θέση", render: (row) => row.position || "-" },
    {
      key: "team",
      label: "Ομάδα",
      render: (row) => row.team?.name || "Χωρίς Ομάδα",
    },
    {
      key: "status",
      label: "Κατάσταση",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : row.status === "injured"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Δράσεις",
      render: (row) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="secondary" onClick={() => handleEdit(row)}>
            Τροποποίηση
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(row._id)}
          >
            Διαγραφή
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <Loading fullscreen />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Αθλητές</h1>
          <p className="mt-2 text-gray-600">
            Διαχειρίσου τους αθλητές του σωματείου
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Προσθήκη Αθλητή</Button>
      </div>

      <Card>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Αναζήτησε αθλητές..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <DataTable columns={columns} data={filteredAthletes} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedAthlete ? "Τροποποίηση Αθλητή" : "Προσθήκη Αθλητή"}
        size="lg"
      >
        <AthleteForm
          athlete={selectedAthlete}
          onSuccess={handleFormSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
