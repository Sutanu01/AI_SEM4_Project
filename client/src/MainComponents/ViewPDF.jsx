import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader1 from '../Loaders/Loader1';

const ViewPDF = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pdfURL, setPdfURL] = useState(null);

  useEffect(() => {
    const file = location.state?.file;
    if (!file) {
      navigate('/');
      return;
    }

    const url = URL.createObjectURL(file);
    setPdfURL(url);

    return () => URL.revokeObjectURL(url);
  }, [location.state, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.6rem' }}>
      {pdfURL ? (
        <iframe
          src={pdfURL}
          title="ViewPDF"
          width="100%"
          height="1000px"
          style={{ border: 'none' }}
        />
      ) : (
        <Loader1/>
      )}
    </div>
  );
};

export default ViewPDF;
