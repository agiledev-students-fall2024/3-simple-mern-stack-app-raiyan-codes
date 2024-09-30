import React, { useEffect, useState } from 'react';

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:7002/about-us')
      .then(response => response.json())
      .then(data => setAboutData(data))
      .catch(error => console.error('Error', error));
  }, []);

  if (!aboutData) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>About Me Page</h1>
      <p>{aboutData.text}</p>
      <img
        src={aboutData.imageUrl}
        alt="Me!!!"
        style={{ width: '200px', borderRadius: '50%', marginTop: '20px' }}
      />
    </div>
  );
};

export default AboutUs;
