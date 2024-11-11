import React from 'react';

export const DnD = ({ children }: { children: React.ReactNode }) => {
  const items = React.Children.toArray(children);
  return (
    <div
      className="dnd-root"
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
      }}
    >
      {items.map((item, index) => (
        <div key={index} className="dnd-item">
          {item}
        </div>
      ))}
    </div>
  );
};
