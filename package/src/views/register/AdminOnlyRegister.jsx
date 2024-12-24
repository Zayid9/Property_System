import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  MenuItem,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExportContainer,
  GridPrintExportMenuItem,
} from "@mui/x-data-grid";
import { Edit, Delete, DeleteOutline, Add } from "@mui/icons-material";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const AdminOnlyRegister = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "admin", role: "admin" },
    { id: 2, username: "user1", role: "user" },
    { id: 3, username: "user2", role: "user" },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [newUser, setNewUser] = useState({ username: "", role: "", password: "" });
  const [error, setError] = useState("");
  const toastIdRef = useRef(null);

  const showToast = (message) => {
    if (toastIdRef.current) toast.dismiss(toastIdRef.current);
    toastIdRef.current = toast.success(message);
  };

  const handleOpenDialog = (user = null) => {
    setOpen(true);
    setError("");
    if (user) {
      setEditMode(true);
      setCurrentUserId(user.id);
      setNewUser({ username: user.username, role: user.role, password: "" });
    } else {
      setEditMode(false);
      setNewUser({ username: "", role: "", password: "" });
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setError("");
  };

  const handleAddOrEditUser = () => {
    if (!newUser.username || (!editMode && !newUser.password) || !newUser.role) {
      setError("All fields are required.");
      return;
    }

    setUsers((prev) =>
      editMode
        ? prev.map((u) => (u.id === currentUserId ? { ...u, ...newUser } : u))
        : [...prev, { id: prev.length + 1, username: newUser.username, role: newUser.role }]
    );
    showToast(editMode ? "User updated successfully." : "User added successfully.");
    handleCloseDialog();
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("User deleted successfully.");
  };

  const handleDeleteSelectedRows = () => {
    if (selectedRows.length === 0) return;
    setUsers((prev) => prev.filter((user) => !selectedRows.includes(user.id)));
    showToast("Selected users deleted successfully.");
    setSelectedRows([]);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("User Management Export", 105, 15, null, null, "center");
    const headers = [["ID", "Username", "Role"]];
    const rows = users.map((user) => [user.id, user.username, user.role]);
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 25,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
    doc.save("users_export.pdf");
    showToast("PDF file exported successfully.");
  };

  const exportToCSV = () => {
    const headers = "ID,Username,Role\n";
    const rows = users.map((user) => `${user.id},${user.username},${user.role}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users_export.csv";
    link.click();
    showToast("CSV file exported successfully.");
  };

  const CustomExport = (props) => (
    <GridToolbarExportContainer {...props}>
      <MenuItem onClick={exportToCSV}>Download as CSV</MenuItem>
      <MenuItem onClick={exportToPDF}>Download as PDF</MenuItem>
      <GridPrintExportMenuItem />
    </GridToolbarExportContainer>
  );

  // Custom Toolbar with Styled Add Button
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Button
        startIcon={<Add />}
        color="primary"
        variant="contained"
        onClick={() => handleOpenDialog()}
        sx={{
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "14px",
          backgroundColor: "#007BFF",
          "&:hover": { backgroundColor: "#0056b3" },
        }}
      >
        Add New User
      </Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <CustomExport />
      {selectedRows.length > 0 && (
        <Button
          startIcon={<DeleteOutline />}
          color="error"
          onClick={handleDeleteSelectedRows}
          sx={{ ml: 2, textTransform: "none" }}
        >
          Delete Selected Row
        </Button>
      )}
    </GridToolbarContainer>
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button color="primary" size="small" onClick={() => handleOpenDialog(params.row)} startIcon={<Edit />}>
            Edit
          </Button>
          <Button color="error" size="small" onClick={() => handleDeleteUser(params.row.id)} startIcon={<Delete />}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        User Management
      </Typography>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: CustomToolbar }}
          onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
        />
      </Box>

      {/* Add/Edit User Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} aria-hidden={false}>
        <DialogTitle>{editMode ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <TextField label="Username" fullWidth margin="normal" value={newUser.username} onChange={(e) => setNewUser((prev) => ({ ...prev, username: e.target.value }))} />
          {!editMode && <TextField label="Password" type="password" fullWidth margin="normal" value={newUser.password} onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))} />}
          <TextField label="Role" fullWidth margin="normal" placeholder="e.g., admin or user" value={newUser.role} onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value }))} />
          {error && <Typography variant="body2" color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleAddOrEditUser} color="primary">{editMode ? "Save Changes" : "Add User"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminOnlyRegister;