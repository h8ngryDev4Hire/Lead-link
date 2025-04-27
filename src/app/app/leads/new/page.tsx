"use client";

import React from 'react';
import Layout from '@/components/Layout/Layout';
import LeadForm from '@/components/LeadForm/LeadForm';

export default function NewLeadPage() {
  return (
    <Layout title="Add Lead">
      <div className="max-w-lg mx-auto">
        <LeadForm />
      </div>
    </Layout>
  );
} 