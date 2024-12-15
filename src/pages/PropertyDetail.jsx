import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PropertyDetail.scss";

const PropertyDetail = () => {
  const { slug } = useParams();
  let [propertyDetail, setPropertyDetail] = useState(null);
  let [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  let getPropertyDetail = async () => {
    let propertyDetailUrl = `https://realtorcornerbackend.onrender.com/post/properties/${slug}/`;
    try {
      setLoading(true);
      const response = await fetch(propertyDetailUrl);
      const data = await response.json();

      if (response.ok) {
        setPropertyDetail(data);
        console.log(data.images);
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
    getPropertyDetail();
  }, [slug]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <h2 className="container load">Getting property...</h2>;
  if (!propertyDetail) return <h2>Property not found</h2>;

  return (
    <div className="container PropertyDetail">
      <div className="Property">
        <div className="property_detail_images">
          <div className="image-gallery">
            <div className="primary-image">
              {propertyDetail.images?.[0] && (
                <img
                  src={propertyDetail.images[0].url}
                  alt="Primary displayed"
                  className="large-image"
                  onClick={() => openModal(propertyDetail.images[0])}
                />
              )}
            </div>

            <div className="secondary-images">
              {propertyDetail.images?.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Property thumbnail ${index + 1}`}
                  className="thumbnail"
                  onClick={() => openModal(image)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="property_detail_text">
          <h1>{propertyDetail.property_name}</h1>
          <div className="description">
            <h3>Description:</h3>
            <p>{propertyDetail.description}</p>
          </div>
          <p>
            Price: <strong>{formatPrice(propertyDetail.price)}</strong>
          </p>
          <p>
            Location: <strong>{propertyDetail.location}</strong>{" "}
          </p>
          <p>
            Status:{" "}
            <strong>
              {propertyDetail.availability ? "Available" : "Not Available"}
            </strong>
          </p>
          <p>
            Purpose: <strong>{propertyDetail.purpose}</strong>
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={modalImage.url}
              alt="Modal property"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
