import React from 'react';
import { useParams } from 'react-router-dom';

const ManageContent = () => {
  const { type } = useParams();

  return (
    <div className="py-16" data-testid="manage-content">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <h1 className="text-4xl font-bold mb-6" data-testid="manage-title">
          Manage {type?.charAt(0).toUpperCase() + type?.slice(1)}
        </h1>
        <div className="border border-border p-12 text-center">
          <p className="text-muted mb-4">
            Content management interface for {type}
          </p>
          <p className="text-sm text-muted">
            This is a placeholder for the full CRUD interface. In production, this would include forms to create, edit, and delete {type}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageContent;
