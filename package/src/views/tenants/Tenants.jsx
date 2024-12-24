import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Stack, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExportContainer, GridPrintExportMenuItem } from '@mui/x-data-grid';
import { Edit, Delete, DeleteOutline, Add } from '@mui/icons-material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Tenants = () => {
  const [tenantName, setTenantName] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [errors, setErrors] = useState({ tenantName: '', tenantEmail: '', tenantPhone: '' });
  const [toastId, setToastId] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTenantId, setCurrentTenantId] = useState(null);
  const errorToastIdRef = useRef(null);

  const validateTenantName = (value) => {
    if (!value.trim()) return 'Tenant name is required';
    return '';
  };

  const validateTenantEmail = (value) => {
    if (!value.trim()) return 'Tenant email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email format';
    return '';
  };

  const validateTenantPhone = (value) => {
    if (!value.trim()) return 'Tenant phone is required';
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value)) return 'Invalid phone number';
    return '';
  };

  const showToast = (message) => {
    if (toastId) toast.dismiss(toastId);
    setToastId(toast.success(message));
  };

  const showErrorToast = (message) => {
    if (errorToastIdRef.current) toast.dismiss(errorToastIdRef.current);
    errorToastIdRef.current = toast.error(message);
  };

  const handleOpenDialog = (tenant = null) => {
    setOpen(true);
    setErrors({ tenantName: '', tenantEmail: '', tenantPhone: '' });
    if (tenant) {
      setEditMode(true);
      setCurrentTenantId(tenant.id);
      setTenantName(tenant.name);
      setTenantEmail(tenant.email);
      setTenantPhone(tenant.phone);
    } else {
      setEditMode(false);
      resetForm();
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    resetForm();
  };

  const handleSaveTenant = () => {
    const tenantNameError = validateTenantName(tenantName);
    const tenantEmailError = validateTenantEmail(tenantEmail);
    const tenantPhoneError = validateTenantPhone(tenantPhone);

    if (tenantNameError || tenantEmailError || tenantPhoneError) {
      setErrors({ tenantName: tenantNameError, tenantEmail: tenantEmailError, tenantPhone: tenantPhoneError });
      showErrorToast('Please fix the errors before submitting.');
      return;
    }

    const newTenant = { id: tenants.length + 1, name: tenantName, email: tenantEmail, phone: tenantPhone };

    if (editMode) {
      setTenants((prev) => prev.map((t) => (t.id === currentTenantId ? newTenant : t)));
      showToast('Tenant updated successfully.');
    } else {
      setTenants([...tenants, newTenant]);
      showToast('Tenant added successfully.');
    }

    handleCloseDialog();
  };

  const handleDeleteTenant = (id) => {
    setTenants((prev) => prev.filter((t) => t.id !== id));
    showToast('Tenant deleted successfully.');
  };

  const handleDeleteSelectedRows = () => {
    if (selectedRows.length === 0) return;
    setTenants((prev) => prev.filter((tenant) => !selectedRows.includes(tenant.id)));
    showToast('Selected tenants deleted successfully.');
    setSelectedRows([]);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Tenant Management Export', 105, 15, null, null, 'center');
    const headers = [['ID', 'Name', 'Email', 'Phone']];
    const rows = tenants.map((tenant) => [tenant.id, tenant.name, tenant.email, tenant.phone]);
    doc.autoTable({
      head: headers,
      body: rows,
      startY: 25,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
    doc.save('tenants_export.pdf');
    showToast('PDF file exported successfully.');
  };

  const exportToCSV = () => {
    const headers = 'ID,Name,Email,Phone\n';
    const rows = tenants.map((tenant) => `${tenant.id},${tenant.name},${tenant.email},${tenant.phone}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tenants_export.csv';
    link.click();
    showToast('CSV file exported successfully.');
  };

  const CustomExport = (props) => (
    <GridToolbarExportContainer {...props}>
      <MenuItem onClick={exportToCSV}>Download as CSV</MenuItem>
      <MenuItem onClick={exportToPDF}>Download as PDF</MenuItem>
      <GridPrintExportMenuItem />
    </GridToolbarExportContainer>
  );

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <Button
        startIcon={<Add />}
        color="primary"
        variant="contained"
        onClick={() => handleOpenDialog()}
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '14px',
          backgroundColor: '#007BFF',
          '&:hover': { backgroundColor: '#0056b3' },
        }}
      >
        Add New Tenant
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
          sx={{ ml: 2, textTransform: 'none' }}
        >
          Delete Selected Row
        </Button>
      )}
    </GridToolbarContainer>
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button color="primary" size="small" onClick={() => handleOpenDialog(params.row)} startIcon={<Edit />}>
            Edit
          </Button>
          <Button color="error" size="small" onClick={() => handleDeleteTenant(params.row.id)} startIcon={<Delete />}>
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const resetForm = () => {
    setTenantName('');
    setTenantEmail('');
    setTenantPhone('');
    setErrors({ tenantName: '', tenantEmail: '', tenantPhone: '' });
  };

  return (
    <PageContainer title="Tenants" description="Manage tenant details">
      <DashboardCard title="Tenant Management">
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={tenants}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: CustomToolbar }}
            onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
          />
        </Box>
      </DashboardCard>

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Tenant' : 'Add New Tenant'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb="5px">Tenant Name</Typography>
              <TextField
                id="tenantName"
                variant="outlined"
                fullWidth
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                onBlur={(e) => handleBlur('tenantName', e.target.value)}
                error={!!errors.tenantName}
                helperText={errors.tenantName}
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb="5px">Tenant Email</Typography>
              <TextField
                id="tenantEmail"
                variant="outlined"
                fullWidth
                value={tenantEmail}
                onChange={(e) => setTenantEmail(e.target.value)}
                onBlur={(e) => handleBlur('tenantEmail', e.target.value)}
                error={!!errors.tenantEmail}
                helperText={errors.tenantEmail}
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb="5px">Tenant Phone</Typography>
              <TextField
                id="tenantPhone"
                variant="outlined"
                fullWidth
                value={tenantPhone}
                onChange={(e) => setTenantPhone(e.target.value)}
                onBlur={(e) => handleBlur('tenantPhone', e.target.value)}
                error={!!errors.tenantPhone}
                helperText={errors.tenantPhone}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSaveTenant} color="primary">{editMode ? 'Save Changes' : 'Add Tenant'}</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default Tenants;