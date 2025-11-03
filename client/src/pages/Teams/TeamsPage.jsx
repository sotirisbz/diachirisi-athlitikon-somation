import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeam, fetchTeams } from "../../store/slices/teamSlice";
import Button from "../../components/common/Button/Button.jsx";
import Loading from "../../components/common/Loading/Loading.jsx";
import Card from "../../components/common/Card/Card.jsx";
import DataTable from "../../components/common/DataTable/DataTable.jsx";
import Modal from "../../components/common/Modal/Modal.jsx";
import TeamForm from "./components/TeamForm.jsx";

export default function TeamsPage() {
  const dispatch = useDispatch();
  const { items: teams, loading } = useSelector((state) => state.teams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (
      window.confirm("Είσαι σίγουρος οτι θέλεις να διαγράψεις αυτήν την ομάδα;")
    ) {
      await dispatch(deleteTeam(id));
    }
  };

  const handleEdit = (team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  const handleFormSuccess = () => {
    handleCloseModal();
    dispatch(fetchTeams());
  };

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: "name", label: "Όνομα Ομάδας" },
    { key: "sport", label: "Άθλημα" },
    {
      key: "category",
      label: "Κατηγορία",
      render: (row) => <span className="capitalize">{row.category}</span>,
    },
    {
      key: "coach",
      label: "Πρώτος Προπονητής",
      render: (row) =>
        row.coach ? `${row.coach.firstName} ${row.coach.lastName}` : "-",
    },
    {
      key: "status",
      label: "Κατάσταση",
      render: (row) => (
        <span
          className={`px-2 py-1 roudned-full text-xs font-medium ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
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
      reder: (row) => (
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
          <h1 className="text-3-xl font-bold text-gray-900">Ομάδες</h1>
          <p className="mt-2 text-gray-600">Διαχείρηση της ομάδας</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Προσθήκη Ομάδας</Button>
      </div>

      <Card>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Αναζήτηση ομάδας..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <DataTable columns={columns} data={filteredTeams} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedTeam ? "Τροποποίηση Ομάδας" : "Προσθήκη Νέας Ομάδας"}
      >
        <TeamForm
          team={selectedTeam}
          onSuccess={handleFormSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
