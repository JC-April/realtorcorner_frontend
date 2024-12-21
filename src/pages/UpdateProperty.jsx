import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./UpdateProperty.scss";

const UpdateProperty = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [formData, setFormData] = useState({
    property_name: "",
    price: "",
    location: "",
    contact: "",
    availability: "available",
    purpose: "rent",
    description: "",
    newImages: [],
  });

  const [myProperty, setMyProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [removingImages, setRemovingImages] = useState([]);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await axiosInstance.get(
          `https://realtorcornerbackend.onrender.com/post/properties/${slug}/edit/`
        );
        const property = response.data;

        setFormData({
          property_name: property.property_name,
          price: property.price,
          location: property.location,
          contact: property.contact,
          availability: property.availability,
          purpose: property.purpose,
          description: property.description,
          newImages: [],
        });

        setMyProperty(property);
        setImages(
          property.images.map((image) => ({
            id: image.id,
            url: image.url,
          }))
        );
      } catch (error) {
        console.error("Error fetching property:", error);
        if (error.response.status !== 401) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch properties",
            timer: 5000,
            position: "top-right",
            toast: true,
            showConfirmButton: false,
          });
        }
      }
    };
    getProperty();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      newImages: [...formData.newImages, ...e.target.files],
    });
  };

  const handleRemoveImage = (imageId) => {
    setRemovingImages([...removingImages, imageId]);
    setImages(images.filter((image) => image.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // add property data initially without images
    for (const key in formData) {
      if (key !== "newImages") {
        data.append(key, formData[key]);
      }
    }

    // Append new images
    for (let i = 0; i < formData.newImages.length; i++) {
      data.append("images", formData.newImages[i]);
    }

    // append IDs of images to be removed
    removingImages.forEach((id) => {
      data.append("remove_images", id);
    });

    try {
      await axiosInstance.put(
        `https://realtorcornerbackend.onrender.com/post/properties/${slug}/edit/`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Property updated successfully!",
        timer: 5000,
        position: "top-right",
        toast: true,
        showConfirmButton: false,
      });
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error updating property:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update property.",
        timer: 5000,
        position: "top-right",
        toast: true,
        showConfirmButton: false,
      });
    }
  };

  if (!myProperty) return <div>Loading...</div>;

  return (
    <div className="container UpdateProperty">
      <h1>Update Property</h1>
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

        <h3>Existing Images</h3>
        <div className="existing-images">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="image-item">
                <img
                  src={image.url}
                  alt="property"
                  style={{ width: "100px" }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p>No existing images</p>
          )}
        </div>

        <h3>Add New Images</h3>
        <input type="file" multiple onChange={handleImageChange} />

        <button type="submit">Update Property</button>
      </form>
    </div>
  );
};

export default UpdateProperty;
