import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dummyhouse from "../assets/dummyhouse.png";
import "./Properties.scss";

const Properties = () => {
  let [properties, setProperties] = useState([]);
  let [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  let getProperties = async () => {
    let propertiesUrl =
      "https://realtorcornerbackend.onrender.com/post/properties/";

    //Add filters to the URL if they exist
    const queryParams = new URLSearchParams();

    if (filters.property_name)
      queryParams.append("property_name", filters.property_name);
    if (filters.location) queryParams.append("location", filters.location);
    if (filters.availability)
      queryParams.append("availability", filters.availability);
    if (filters.purpose) queryParams.append("purpose", filters.purpose);

    if (Array.from(queryParams).length > 0) {
      propertiesUrl += `?${queryParams.toString()}`;
    }

    try {
      setLoading(true);
      const response = await fetch(propertiesUrl);
      const data = await response.json();

      if (response.ok) {
        setProperties(data);
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, [filters]); //re-fetch properties when filters change

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  return (
    <div className="container Properties">
      <div className="page-headers">
        <h1>Find Your next Property</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name"
            onChange={(e) =>
              setFilters({ ...filters, property_name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Search by location"
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
          <div className="selectors">
            <select
              onChange={(e) =>
                setFilters({ ...filters, availability: e.target.value })
              }
            >
              <option value="">Availability</option>
              <option value="available">Available</option>
              <option value="not_available">Not Available</option>
            </select>
            <select
              onChange={(e) =>
                setFilters({ ...filters, purpose: e.target.value })
              }
            >
              <option value="">Purpose</option>
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
          </div>
        </div>
      </div>

      <div className="all-properties">
        {loading ? (
          <h2>Getting properties...</h2>
        ) : properties && properties.length > 0 ? (
          properties.map((property, index) => {
            const propertyImages = property.images || [];
            const firstImage =
              propertyImages.length > 0 ? propertyImages[0] : null;
            const propertyName = property.property_name || "No property name";
            const price = property.price ? formatPrice(property.price) : "NA";
            const location = property.location || "No location";
            const slug = property.slug;
            const availability = property.availability || "Not specified";
            const purpose = property.purpose || "Not specified";
            const contact = property.contact || "No contact entered";
            const createdAt = new Date(property.created_at).toLocaleString();
            const updatedAt = new Date(property.updated_at).toLocaleString();

            return (
              <div key={index} className="property-card">
                <img
                  src={firstImage ? firstImage.url : dummyhouse}
                  alt={`${propertyName}`}
                />
                <h3>
                  <Link to={`/properties/${slug}`}>{propertyName}</Link>
                </h3>
                <p>
                  Location: <strong>{location}</strong>
                </p>
                <p>
                  Price: <strong>{price}</strong>
                </p>
                <p>
                  Contact: <strong>{contact}</strong>
                </p>
                <span>
                  Status: <strong>{availability}</strong>
                </span>
                <br></br>
                <span>
                  Purpose: <strong>{purpose}</strong>
                </span>
                <br></br>
                <span>
                  Created At: <strong>{createdAt}</strong>
                </span>
                <br></br>
                {updatedAt ? (
                  <span>
                    Updated At: <strong>{updatedAt}</strong>
                  </span>
                ) : null}
              </div>
            );
          })
        ) : (
          <h3>No properties to show you now</h3>
        )}
      </div>
    </div>
  );
};

export default Properties;
