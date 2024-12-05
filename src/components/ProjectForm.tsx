import React from 'react';
import { Unit, ProjectUnit } from '../types';

interface ProjectFormProps {
  onSubmit: (formData: FormData) => void;
  units: Unit[];
  selectedUnits: ProjectUnit[];
  onUnitChange: (unitId: string, quantity: number) => void;
  initialValues?: any;
}

function ProjectForm({ onSubmit, units, selectedUnits, onUnitChange, initialValues }: ProjectFormProps) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(new FormData(e.currentTarget));
    }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={initialValues?.name}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Image URL</label>
          <input
            type="url"
            name="imageUrl"
            defaultValue={initialValues?.imageUrl}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Homes Passed</label>
          <input
            type="number"
            name="homesPassed"
            required
            min="0"
            defaultValue={initialValues?.homesPassed}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Customers</label>
          <input
            type="number"
            name="currentCustomers"
            required
            min="0"
            defaultValue={initialValues?.currentCustomers}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Project Notes</label>
        <textarea
          name="notes"
          rows={4}
          defaultValue={initialValues?.notes}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Project Units</h3>
        <div className="space-y-4">
          {units.map((unit) => (
            <div key={unit.id} className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  {unit.name} (${unit.cost}/{unit.type})
                </label>
                <input
                  type="number"
                  min="0"
                  step={unit.type === 'foot' ? '1' : '0.01'}
                  value={selectedUnits.find(u => u.unitId === unit.id)?.quantity || ''}
                  onChange={(e) => onUnitChange(unit.id, Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Project
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;