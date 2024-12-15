import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const token = localStorage.getItem("authTokens");
  const { logoutUser } = useContext(AuthContext);

  const decode = jwtDecode(token);
  let username = decode.username;

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await axiosInstance.get(
          "https://realtorcornerbackend.onrender.com/post/dashboard/"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
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
    getProperties();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const handleDelete = async (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(
            `https://realtorcornerbackend.onrender.com/post/properties/${slug}/edit/`
          );
          setProperties((prev) =>
            prev.filter((property) => property.slug !== slug)
          );
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Property has been deleted.",
            timer: 3000,
            position: "top-right",
            toast: true,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting property:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete property.",
            timer: 5000,
            position: "top-right",
            toast: true,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return (
    <div className="container AdminDashboard">
      <div className="profile">
        <h1>Admin Dashboard</h1>
        <p>Hi {username}</p>
        <Link onClick={logoutUser}>Logout</Link>
      </div>

      <div className="create-button">
        <Link to="/property/create" className="btn btn-primary">
          Create Property
        </Link>
      </div>

      <div className="property-list">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="property-item">
              <h2>{property.property_name}</h2>
              <p>Location: {property.location}</p>
              <p>Price: {formatPrice(property.price)}</p>

              <div className="actions">
                <button
                  onClick={() => navigate(`/property/${property.slug}/edit`)}
                  className="btn btn-warning"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(property.slug)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No properties found</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
