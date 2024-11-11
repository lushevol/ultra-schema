import React from 'react';

export const DnD = ({ children }: { children: React.ReactNode }) => {
  const items = React.Children.toArray(children);
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};
