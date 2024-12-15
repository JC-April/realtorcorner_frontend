import React, { useState } from "react";
import useAxios from "../utils/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./CreateProperty.scss";

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    property_name: "",
    price: "",
    location: "",
    contact: "",
    availability: "available",
    purpose: "rent",
    description: "",
    images: [],
  });

  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData[key].forEach((image) => data.append("images", image));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await axiosInstance.post(
        "https://realtorcornerbackend.onrender.com/post/properties/create/",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Property created successfully!",
        timer: 5000,
        position: "top-right",
        toast: true,
        showConfirmButton: false,
      });
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error creating property:", error);
      if (error.response.status !== 401) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to create property.",
          timer: 5000,
          position: "top-right",
          toast: true,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="container CreateProperty">
      <h1>Create Property</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="property_name"
          placeholder="Property Name"
          value={formData.property_name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Information"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="not_available">Not Available</option>
        </select>
        <select name="purpose" value={formData.purpose} onChange={handleChange}>
          <option value="rent">For Rent</option>
          <option value="sale">For Sale</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          required
        />
        <button type="submit">Create Property</button>
      </form>
    </div>
  );
};

export default CreateProperty;
