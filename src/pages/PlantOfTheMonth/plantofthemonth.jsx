import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios'; 
import DOMPurify from 'dompurify';
import './PlantOfTheMonth.css';

const PlantOfTheMonth = () => {
  const [plant, setPlant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await axiosInstance.get('/potm/plantofthemonth');
        setPlant(response.data);
      } catch (error) {
        console.error('Error fetching plant of the month:', error);
      }
    };

    fetchPlant();
  }, []);

  const sanitizedprocedure = plant ? DOMPurify.sanitize(plant.procedure, {
    ALLOWED_TAGS: ['strong', 'em', 'u', 'ol', 'li', 'p', 'br', 'span'], // Add tags you want to allow
  }) : '';
  
  return (
    <div className="plant-of-the-month">
      {plant ? (
        <>
          <h1>Plant Of  {plant.month} :  {plant.title}</h1>
          {plant.imageUrl && <img src={plant.imageUrl} alt={plant.title} />}
          <p>{plant.summary}</p>
          <h2>How to Grow</h2>
          <div dangerouslySetInnerHTML={{ __html: sanitizedprocedure }}></div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlantOfTheMonth;