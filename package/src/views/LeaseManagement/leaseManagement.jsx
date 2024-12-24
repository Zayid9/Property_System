import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
} from '@mui/material';
import { Add, Edit, Delete, UploadFile, PictureAsPdf, Home, Business, Person } from '@mui/icons-material';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import pmsLogo from '../../assets/images/logos/pms-logo.svg';

const LeaseManagement = () => {
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openTerminateDialog, setOpenTerminateDialog] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [leases, setLeases] = useState([]);
  const [formData, setFormData] = useState({
    tenant: '',
    leaseStartDate: '',
    leaseEndDate: '',
    rentAmount: '',
    paymentTerms: '',
    propertyType: '',
    usageType: '',
    propertyName: '',
    size: '',
    rooms: '',
    bathrooms: '',
    kitchens: '',
    specialFeatures: '',
    address: '',
    businessName: '',
    businessType: '',
    landlordName: '',
    landlordEmail: '',
    landlordPhone: '',
  });
  const [terminationData, setTerminationData] = useState({
    terminationDate: '',
    reason: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    setTenants([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ]);
  }, []);

  const handleFormSubmit = () => {
    if (!formData.tenant || !formData.leaseStartDate || !formData.leaseEndDate || !formData.rentAmount) {
      toast.error('Please fill out all required fields.');
      return;
    }

    const newLease = {
      ...formData,
      id: leases.length + 1,
      status: 'Active',
    };
    setLeases([...leases, newLease]);
    toast.success('Lease agreement created successfully!');
    setOpenFormDialog(false);
    setFormData({
      tenant: '',
      leaseStartDate: '',
      leaseEndDate: '',
      rentAmount: '',
      paymentTerms: '',
      propertyType: '',
      usageType: '',
      propertyName: '',
      size: '',
      rooms: '',
      bathrooms: '',
      kitchens: '',
      specialFeatures: '',
      address: '',
      businessName: '',
      businessType: '',
      landlordName: '',
      landlordEmail: '',
      landlordPhone: '',
    });
  };

  const handleFileUpload = () => {
    if (!formData.tenant || !selectedFile) {
      toast.error('Please select a tenant and upload a file.');
      return;
    }

    const uploadedLease = {
      id: leases.length + 1,
      tenant: formData.tenant,
      file: selectedFile.name,
      status: 'Uploaded',
    };
    setLeases([...leases, uploadedLease]);
    toast.success('Lease agreement uploaded successfully!');
    setOpenUploadDialog(false);
    setSelectedFile(null);
    setFormData({ tenant: '' });
  };

  const generatePDF = (lease) => {
    const doc = new jsPDF();

    doc.addImage(pmsLogo, 'SVG', 10, 10, 50, 20);
    doc.setFontSize(16);
    doc.text('Lease Agreement', 80, 40);
    doc.setFontSize(12);
    doc.text(`Agreement ID: ${lease.id}`, 20, 60);
    doc.text(`Tenant Name: ${lease.tenant}`, 20, 70);
    doc.text(`Lease Start Date: ${lease.leaseStartDate}`, 20, 80);
    doc.text(`Lease End Date: ${lease.leaseEndDate}`, 20, 90);
    doc.text(`Rent Amount: ${lease.rentAmount}`, 20, 100);
    doc.text(`Payment Terms: ${lease.paymentTerms || 'N/A'}`, 20, 110);
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 20, 120);

    doc.line(20, 130, 190, 130);
    doc.text('Digital Signature:', 20, 140);

    doc.save(`Lease_Agreement_${lease.tenant}.pdf`);
    toast.success('PDF generated successfully!');
  };

  const handleTerminateLease = () => {
    if (!terminationData.terminationDate || !terminationData.reason) {
      toast.error('Please provide termination details.');
      return;
    }

    toast.success('Lease terminated successfully!');
    setOpenTerminateDialog(false);
    setTerminationData({ terminationDate: '', reason: '' });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Lease Management
      </Typography>

      <Box mb={3}>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpenFormDialog(true)}>
          Create Lease Agreement
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<UploadFile />}
          onClick={() => setOpenUploadDialog(true)}
          style={{ marginLeft: '10px' }}
        >
          Upload Lease Agreement
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tenant Name</TableCell>
              <TableCell>Lease Start Date</TableCell>
              <TableCell>Lease End Date</TableCell>
              <TableCell>Rent Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leases.map((lease) => (
              <TableRow key={lease.id}>
                <TableCell>{lease.tenant}</TableCell>
                <TableCell>{lease.leaseStartDate || 'N/A'}</TableCell>
                <TableCell>{lease.leaseEndDate || 'N/A'}</TableCell>
                <TableCell>{lease.rentAmount || 'N/A'}</TableCell>
                <TableCell>{lease.status}</TableCell>
                <TableCell>
                  {lease.file ? (
                    <a href={URL.createObjectURL(selectedFile)} download>
                      View File
                    </a>
                  ) : (
                    <IconButton color="primary" onClick={() => generatePDF(lease)}>
                      <PictureAsPdf />
                    </IconButton>
                  )}
                  <IconButton color="error" onClick={() => setOpenTerminateDialog(true)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Lease Agreement Form Dialog */}
      <Dialog open={openFormDialog} onClose={() => setOpenFormDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create Lease Agreement</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Tenant"
            fullWidth
            margin="normal"
            value={formData.tenant}
            onChange={(e) => setFormData({ ...formData, tenant: e.target.value })}
          >
            {tenants.map((tenant) => (
              <MenuItem key={tenant.id} value={tenant.name}>
                {tenant.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Lease Start Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.leaseStartDate}
            onChange={(e) => setFormData({ ...formData, leaseStartDate: e.target.value })}
          />
          <TextField
            label="Lease End Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.leaseEndDate}
            onChange={(e) => setFormData({ ...formData, leaseEndDate: e.target.value })}
          />
          <TextField
            label="Rent Amount"
            type="number"
            fullWidth
            margin="normal"
            value={formData.rentAmount}
            onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
          />
          <TextField
            label="Payment Terms"
            fullWidth
            margin="normal"
            value={formData.paymentTerms}
            onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
          />
          <TextField
            select
            label="Property Type"
            fullWidth
            margin="normal"
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
          >
            <MenuItem value="House">House</MenuItem>
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
          </TextField>
          <TextField
            select
            label="Usage Type"
            fullWidth
            margin="normal"
            value={formData.usageType}
            onChange={(e) => setFormData({ ...formData, usageType: e.target.value })}
          >
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Sale">Sale</MenuItem>
          </TextField>
          {formData.propertyType && formData.usageType && (
            <>
              <TextField
                label="Property Name"
                fullWidth
                margin="normal"
                value={formData.propertyName}
                onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
              />
              <TextField
                label="Size"
                fullWidth
                margin="normal"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              />
              <TextField
                label="Number of Rooms"
                fullWidth
                margin="normal"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
              />
              <TextField
                label="Number of Bathrooms"
                fullWidth
                margin="normal"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
              />
              <TextField
                label="Number of Kitchens"
                fullWidth
                margin="normal"
                value={formData.kitchens}
                onChange={(e) => setFormData({ ...formData, kitchens: e.target.value })}
              />
              <TextField
                label="Special Features"
                fullWidth
                margin="normal"
                value={formData.specialFeatures}
                onChange={(e) => setFormData({ ...formData, specialFeatures: e.target.value })}
              />
              <TextField
                label="Address"
                fullWidth
                margin="normal"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              {formData.propertyType === 'Commercial' && (
                <>
                  <TextField
                    label="Business/Company Name"
                    fullWidth
                    margin="normal"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                  <TextField
                    label="Type of Business"
                    fullWidth
                    margin="normal"
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  />
                </>
              )}
            </>
          )}
          <TextField
            label="Landlord Name"
            fullWidth
            margin="normal"
            value={formData.landlordName}
            onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
          />
          <TextField
            label="Landlord Email"
            fullWidth
            margin="normal"
            value={formData.landlordEmail}
            onChange={(e) => setFormData({ ...formData, landlordEmail: e.target.value })}
          />
          <TextField
            label="Landlord Phone"
            fullWidth
            margin="normal"
            value={formData.landlordPhone}
            onChange={(e) => setFormData({ ...formData, landlordPhone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFormDialog(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upload Lease Agreement Dialog */}
      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Upload Lease Agreement</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Tenant"
            fullWidth
            margin="normal"
            value={formData.tenant}
            onChange={(e) => setFormData({ ...formData, tenant: e.target.value })}
          >
            {tenants.map((tenant) => (
              <MenuItem key={tenant.id} value={tenant.name}>
                {tenant.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            component="label"
            style={{ marginTop: '10px' }}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Button>
          {selectedFile && <Typography mt={2}>{selectedFile.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleFileUpload} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Terminate Lease Dialog */}
      <Dialog open={openTerminateDialog} onClose={() => setOpenTerminateDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Terminate Lease Agreement</DialogTitle>
        <DialogContent>
          <TextField
            label="Termination Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={terminationData.terminationDate}
            onChange={(e) => setTerminationData({ ...terminationData, terminationDate: e.target.value })}
          />
          <TextField
            label="Reason for Termination"
            fullWidth
            margin="normal"
            value={terminationData.reason}
            onChange={(e) => setTerminationData({ ...terminationData, reason: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTerminateDialog(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleTerminateLease} color="primary">
            Terminate Lease
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaseManagement;