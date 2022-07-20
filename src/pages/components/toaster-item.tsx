import React from 'react';

export default function ToasterItem({
  title,
  content,
  onMouseOver,
  onMouseLeave,
}: {
  title: string;
  content: string;
  onMouseOver: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className='toaster-container'
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}>
      <div className='title'>{title}</div>
      <div className='content'>{content}</div>
    </div>
  );
}
