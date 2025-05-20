'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Resource } from '@/types';

export default function ResourcesPage() {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    type: 'article'
  });

  const isAdmin = user?.role === 'administrator';
  const isVolunteer = user?.role === 'volunteer';
  const canManageResources = isAdmin || isVolunteer;

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      const response = canManageResources 
        ? await api.getAllResources()
        : await api.getResources();
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setResources(response.data);
      }
    } catch (err) {
      setError('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingResource) {
        const response = await api.updateResource(editingResource.id, formData);
        if (response.error) {
          setError(response.error);
        } else {
          await loadResources();
          setEditingResource(null);
          setShowAddForm(false);
          setFormData({ title: '', description: '', url: '', type: 'article' });
        }
      } else {
        const response = await api.createResource(formData);
        if (response.error) {
          setError(response.error);
        } else {
          await loadResources();
          setShowAddForm(false);
          setFormData({ title: '', description: '', url: '', type: 'article' });
        }
      }
    } catch (err) {
      setError('Failed to save resource');
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await api.approveResource(id);
      if (response.error) {
        setError(response.error);
      } else {
        await loadResources();
      }
    } catch (err) {
      setError('Failed to approve resource');
    }
  };

  const handleToggleVisibility = async (id: number) => {
    try {
      const response = await api.toggleResourceVisibility(id);
      if (response.error) {
        setError(response.error);
      } else {
        await loadResources();
      }
    } catch (err) {
      setError('Failed to toggle resource visibility');
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      url: resource.url,
      type: resource.type
    });
    setShowAddForm(true);
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Development Resources</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {canManageResources && (
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingResource(null);
            setFormData({ title: '', description: '', url: '', type: 'article' });
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showAddForm ? 'Cancel' : 'Add Resource'}
        </button>
      )}

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">
            {editingResource ? 'Edit Resource' : 'Add New Resource'}
          </h2>
          
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="tutorial">Tutorial</option>
              <option value="documentation">Documentation</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {editingResource ? 'Update Resource' : 'Add Resource'}
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className={`p-4 border rounded ${
              resource.is_hidden ? 'bg-gray-100' : ''
            }`}
          >
            <h3 className="text-xl font-bold">{resource.title}</h3>
            <p className="text-gray-600 mb-2">{resource.description}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {resource.type}
              </span>
              {!resource.is_approved && (
                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  Pending Approval
                </span>
              )}
              {resource.is_hidden && (
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                  Hidden
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              Created by: {resource.creator_name}
              {resource.approver_name && ` • Approved by: ${resource.approver_name}`}
            </div>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Resource
            </a>

            {canManageResources && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(resource)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                {isVolunteer && !resource.is_approved && (
                  <button
                    onClick={() => handleApprove(resource.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => handleToggleVisibility(resource.id)}
                    className={`${
                      resource.is_hidden ? 'bg-green-500' : 'bg-red-500'
                    } text-white px-3 py-1 rounded text-sm`}
                  >
                    {resource.is_hidden ? 'Unhide' : 'Hide'}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 