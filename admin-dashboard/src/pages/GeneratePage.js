import React from 'react';
import Layout from '../components/Layout';
import QRCodeGenerator from '../components/QRCodeGenerator';

const GeneratePage = () => {
  return (
    <Layout title="Generate QR Codes">
      <QRCodeGenerator />
    </Layout>
  );
};

export default GeneratePage; 