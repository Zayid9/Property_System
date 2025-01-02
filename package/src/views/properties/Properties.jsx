import React, { useState, useRef } from "react";
import Slider from "react-slick";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  IconButton,
  Divider,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { AddPhotoAlternate, Edit, Delete, Clear } from "@mui/icons-material";
import toast from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Properties = () => {
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyType, setPropertyType] = useState("");
  const [saleOrRent, setSaleOrRent] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyName: "",
    size: "",
    rooms: "",
    bathrooms: "",
    kitchens: "",
    specialFeatures: "",
    condition: "",
    address: "",
    paymentTerms: "",
    businessName: "",
    businessType: "",
    available: true,
  });
  const [images, setImages] = useState([]);
  const [submittedProperties, setSubmittedProperties] = useState([]);
  const toastIdRef = useRef(null);
  const errorToastIdRef = useRef(null);

  const showToast = (message) => {
    if (toastIdRef.current) toast.dismiss(toastIdRef.current);
    toastIdRef.current = toast.success(message);
  };

  const showErrorToast = (message) => {
    if (errorToastIdRef.current) toast.dismiss(errorToastIdRef.current);
    errorToastIdRef.current = toast.error(message);
  };

  const handleDialogOpen = () => {
    setOpen(true);
    setStep(1);
    resetForm();
  };

  const handleDialogClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleDetailOpen = (property) => {
    setSelectedProperty(property);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
    setSelectedProperty(null);
  };

  const handlePropertyTypeChange = (e) => {
    setPropertyType(e.target.value);
    setStep(2);
  };

  const handleSaleOrRentChange = (e) => {
    setSaleOrRent(e.target.value);
    setStep(3);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (images.length >= 4) {
      showErrorToast("You can upload up to 4 images only.");
      return;
    }

    if (images.some((img) => img.name === file.name)) {
      showErrorToast("Duplicate image detected.");
      return;
    }

    setImages((prevImages) => [...prevImages, file]);
    showToast("Image uploaded successfully!");
  };

  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    showToast("Image removed successfully!");
  };

  const handleSubmit = () => {
    if (images.length < 4) {
      showErrorToast("You must upload at least 4 images.");
      return;
    }

    const newProperty = {
      propertyType,
      saleOrRent,
      ...formData,
      images,
    };

    if (editingIndex !== null) {
      const updatedProperties = [...submittedProperties];
      updatedProperties[editingIndex] = newProperty;
      setSubmittedProperties(updatedProperties);
      showToast("Property updated successfully!");
    } else {
      setSubmittedProperties([...submittedProperties, newProperty]);
      showToast("Property added successfully!");
    }

    handleDialogClose();
  };

  const resetForm = () => {
    setPropertyType("");
    setSaleOrRent("");
    setFormData({
      propertyName: "",
      size: "",
      rooms: "",
      bathrooms: "",
      kitchens: "",
      specialFeatures: "",
      condition: "",
      address: "",
      paymentTerms: "",
      businessName: "",
      businessType: "",
      available: true,
    });
    setImages([]);
  };

  const handleEdit = (index) => {
    const property = submittedProperties[index];
    setFormData({
      propertyName: property.propertyName,
      size: property.size,
      rooms: property.rooms,
      bathrooms: property.bathrooms,
      kitchens: property.kitchens,
      specialFeatures: property.specialFeatures,
      condition: property.condition,
      address: property.address,
      paymentTerms: property.paymentTerms,
      businessName: property.businessName || "",
      businessType: property.businessType || "",
      available: property.available,
    });
    setPropertyType(property.propertyType);
    setSaleOrRent(property.saleOrRent);
    setImages(property.images);
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedProperties = submittedProperties.filter((_, i) => i !== index);
    setSubmittedProperties(updatedProperties);
    showToast("Property deleted successfully!");
  };

  const handleAvailabilityChange = (index) => {
    const updatedProperties = [...submittedProperties];
    updatedProperties[index].available = !updatedProperties[index].available;
    setSubmittedProperties(updatedProperties);
    showToast("Property availability updated successfully!");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        Property Listings
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        style={{ marginBottom: "1rem" }}
      >
        Add New Property
      </Button>

      <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="md">
        <DialogTitle>
          {editingIndex !== null ? "Edit Property" : "Add New Property"}
        </DialogTitle>
        <DialogContent>
          {step === 1 && (
            <TextField
              select
              label="Select Property Type"
              value={propertyType}
              onChange={handlePropertyTypeChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
            </TextField>
          )}

          {step === 2 && (
            <TextField
              select
              label="Select Usage Type"
              value={saleOrRent}
              onChange={handleSaleOrRentChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Rent">Rent</MenuItem>
              <MenuItem value="Sale">Sale</MenuItem>
            </TextField>
          )}

          {step === 3 && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Property Name"
                  fullWidth
                  value={formData.propertyName}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyName: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Size (sq. meters)"
                  fullWidth
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Number of Rooms"
                  type="number"
                  fullWidth
                  value={formData.rooms}
                  onChange={(e) =>
                    setFormData({ ...formData, rooms: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Number of Bathrooms"
                  type="number"
                  fullWidth
                  value={formData.bathrooms}
                  onChange={(e) =>
                    setFormData({ ...formData, bathrooms: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Number of Kitchens"
                  type="number"
                  fullWidth
                  value={formData.kitchens}
                  onChange={(e) =>
                    setFormData({ ...formData, kitchens: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Special Features"
                  fullWidth
                  value={formData.specialFeatures}
                  onChange={(e) =>
                    setFormData({ ...formData, specialFeatures: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Condition"
                  select
                  fullWidth
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                  margin="normal"
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Needs Renovation">Needs Renovation</MenuItem>
                  <MenuItem value="Recently Renovated">Recently Renovated</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Address"
                  fullWidth
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>

              {propertyType === "Commercial" && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Business/Company Name"
                      fullWidth
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessName: e.target.value,
                        })
                      }
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Type of Business"
                      fullWidth
                      value={formData.businessType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessType: e.target.value,
                        })
                      }
                      margin="normal"
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  select
                  label="Payment Terms"
                  fullWidth
                  value={formData.paymentTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentTerms: e.target.value })
                  }
                  margin="normal"
                >
                  {saleOrRent === "Rent" && (
                    <>
                      <MenuItem value="Monthly">Monthly</MenuItem>
                      <MenuItem value="Every 3 months">Every 3 months</MenuItem>
                      <MenuItem value="Every 6 months">Every 6 months</MenuItem>
                      <MenuItem value="Every 9 months">Every 9 months</MenuItem>
                      <MenuItem value="Annually">Annually</MenuItem>
                    </>
                  )}
                  {saleOrRent === "Sale" && (
                    <>
                      <MenuItem value="One-time payment">
                        One-time payment
                      </MenuItem>
                      <MenuItem value="6 months">6 months</MenuItem>
                      <MenuItem value="Annually">Annually</MenuItem>
                    </>
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.available}
                      onChange={(e) =>
                        setFormData({ ...formData, available: e.target.checked })
                      }
                      color="primary"
                    />
                  }
                  label="Available"
                />
              </Grid>

              <Grid item xs={12}>
                <Box mt={2}>
                  <label htmlFor="image-upload">
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<AddPhotoAlternate />}
                      component="span"
                      disabled={images.length >= 4}
                    >
                      Upload Images (Max: {4 - images.length})
                    </Button>
                  </label>
                </Box>
              </Grid>
              <Grid container spacing={2} mt={2}>
                {images.map((img, index) => (
                  <Grid item xs={3} key={index}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="100"
                        image={URL.createObjectURL(img)}
                        alt={`uploaded-${index}`}
                      />
                      <Box display="flex" justifyContent="center">
                        <IconButton
                          color="error"
                          onClick={() => handleImageRemove(index)}
                        >
                          <Clear />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error">
            Cancel
          </Button>
          {step === 3 && (
            <Button onClick={handleSubmit} color="primary">
              {editingIndex !== null ? "Update" : "Submit"}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {submittedProperties.map((property, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card onClick={() => handleDetailOpen(property)} style={{ cursor: "pointer" }}>
              <Slider {...sliderSettings}>
                {property.images.map((img, idx) => (
                  <CardMedia
                    key={idx}
                    component="img"
                    height="200"
                    image={URL.createObjectURL(img)}
                    alt={`property-${idx}`}
                  />
                ))}
              </Slider>
              <CardContent>
                <Typography variant="h6">{property.propertyName}</Typography>
                <Typography>Location: {property.address}</Typography>
                <Typography>Available: {property.available ? "Yes" : "No"}</Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(index);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    color="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAvailabilityChange(index);
                    }}
                  >
                    <Switch checked={property.available} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedProperty && (
        <Dialog open={detailOpen} onClose={handleDetailClose} fullWidth maxWidth="lg">
          <DialogTitle>{selectedProperty.propertyName}</DialogTitle>
          <DialogContent>
            <Slider {...sliderSettings}>
              {selectedProperty.images.map((img, idx) => (
                <CardMedia
                  key={idx}
                  component="img"
                  height="400"
                  image={URL.createObjectURL(img)}
                  alt={`detail-${idx}`}
                />
              ))}
            </Slider>
            <Typography variant="h6">Property Details</Typography>
            <Divider />
            <Typography variant="body1">
              <strong>Type:</strong> {selectedProperty.propertyType}
            </Typography>
            <Typography variant="body1">
              <strong>Location:</strong> {selectedProperty.address}
            </Typography>
            <Typography variant="body1">
              <strong>Rooms:</strong> {selectedProperty.rooms}
            </Typography>
            <Typography variant="body1">
              <strong>Bathrooms:</strong> {selectedProperty.bathrooms}
            </Typography>
            <Typography variant="body1">
              <strong>Kitchens:</strong> {selectedProperty.kitchens}
            </Typography>
            <Typography variant="body1">
              <strong>Special Features:</strong> {selectedProperty.specialFeatures}
            </Typography>
            <Typography variant="body1">
              <strong>Condition:</strong> {selectedProperty.condition}
            </Typography>
            <Typography variant="body1">
              <strong>Payment Terms:</strong> {selectedProperty.paymentTerms}
            </Typography>
            <Typography variant="body1">
              <strong>Available:</strong> {selectedProperty.available ? "Yes" : "No"}</Typography>
            {selectedProperty.propertyType === "Commercial" && (
              <>
                <Typography variant="body1">
                  <strong>Business/Company Name:</strong> {selectedProperty.businessName}
                </Typography>
                <Typography variant="body1">
                  <strong>Type of Business:</strong> {selectedProperty.businessType}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDetailClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Properties;