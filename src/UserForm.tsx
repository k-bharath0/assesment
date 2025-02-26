import React, { useState, useEffect, useRef } from "react";
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

  const initialValues = useRef({});

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      initialValues.current = parsedData;
    }
  }, []);

 
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
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);


    if (JSON.stringify(updatedData) === JSON.stringify(initialValues.current)) {
      setIsDirty(false); 
    } else {
      setIsDirty(true); 
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (!formData.id) {
      formData.id = uuidv4();
    }
    initialValues.current = formData;
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
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;

