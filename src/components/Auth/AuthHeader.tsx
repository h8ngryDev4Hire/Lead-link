import React from 'react';

interface AuthHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="text-center mb-10">
      <div className="inline-block p-4 bg-blue-600 text-white rounded-xl mb-4">
        {icon}
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default AuthHeader; 