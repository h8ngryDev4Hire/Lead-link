import React from 'react';
import Card from '../common/Card';

interface PipelineStage {
  name: string;
  percentage: number;
  color: string;
}

interface LeadPipelineProps {
  totalLeads?: number;
  stages?: PipelineStage[];
}

const LeadPipeline: React.FC<LeadPipelineProps> = ({
  totalLeads = 128,
  stages = [
    { name: 'New', percentage: 20, color: 'bg-gray-500' },
    { name: 'Contacted', percentage: 25, color: 'bg-blue-500' },
    { name: 'Qualified', percentage: 18, color: 'bg-green-500' },
    { name: 'Proposal', percentage: 15, color: 'bg-purple-500' },
    { name: 'Negotiation', percentage: 12, color: 'bg-yellow-500' },
    { name: 'Closed', percentage: 10, color: 'bg-green-600' }
  ]
}) => {
  return (
    <div className="mt-8">
      <Card title="Pipeline" subtitle="Lead distribution by stage">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Lead Pipeline
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {totalLeads} Leads
              </span>
            </div>
          </div>
          <div className="flex h-4 overflow-hidden text-xs bg-gray-200 rounded-full">
            {stages.map((stage, index) => (
              <div 
                key={index}
                style={{ width: `${stage.percentage}%` }} 
                className={`flex flex-col text-center text-white justify-center ${stage.color} shadow-none whitespace-nowrap`}
              >
                {stage.percentage}%
              </div>
            ))}
          </div>
          <div className="flex text-xs font-semibold mt-2 justify-between">
            {stages.map((stage, index) => (
              <span key={index}>{stage.name}</span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LeadPipeline; 