import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  // Load data from local storage
  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Warn if user tries to leave with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes! Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    //e.preventDefault();
    if (!formData.id) {
      formData.id = uuidv4(); // Generate User ID
    }
    localStorage.setItem("userData", JSON.stringify(formData));
    alert("User data saved!");
    setIsDirty(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User Information Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Address" name="address" value={formData.address} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
