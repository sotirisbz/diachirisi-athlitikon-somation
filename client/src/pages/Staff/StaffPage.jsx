import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStaff, fetchStaff } from "../../store/slices/staffSlice.js";
import Button from "../../components/common/Button/Button.jsx";
import Loading from "../../components/common/Loading/Loading.jsx";
import Card from "../../components/common/Card/Card.jsx";
import DataTable from "../../components/common/DataTable/DataTable.jsx";
import Modal from "../../components/common/Modal/Modal.jsx";
import StaffForm from "./components/StaffForm.jsx";

export default function StaffPage() {
  const dispatch = useDispatch();
  const { items: staff, loading } = useSelector((state) => state.staff);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Είσαι σίγουρος οτι θέλεις να διαγράψεις αυτήν μέλος της ομάδας;"
      )
    ) {
      await dispatch(deleteStaff(id));
    }
  };

  const handleEdit = (staffMember) => {
    setSelectedStaff(staffMember);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  const handleFormSuccess = () => {
    handleCloseModal();
    dispatch(fetchStaff());
  };

  const filteredStaff = staff.filter(
    (member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: "fullName",
      label: "Ονοματεπώνυπο",
      render: (row) => `${row.firstName} ${row.lastName}`,
    },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Ρόλος",
      render: (row) => (
        <span className="capitalize">{row.role.replace(/_/g, " ")}</span>
      ),
    },
    {
      key: "specialization",
      label: "Ειδίκευση",
      render: (row) => row.specialization || "-",
    },
    {
      key: "status",
      label: "Κατάσταση",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status.replace(/_/g, " ")}
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
          <h1 className="text-3xl font-bold text-gray-900">Προσωπικό</h1>
          <p className="mt-2 text-gray-600">
            Διαχείριση του προσωπικού του σωματείου
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          Προσθήκη Μέλους του Προσωπικού
        </Button>
      </div>

      <Card>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Αναζήτηση στο προσωπικό..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <DataTable columns={columns} data={filteredStaff} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          selectedStaff
            ? "Τροποποίηση Μέλους του Προσωπικού"
            : "Προσθήκη Νέου Μέλους του Προσωπικού"
        }
        size="lg"
      >
        <StaffForm
          staff={selectedStaff}
          onSuccess={handleFormSuccess}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
