// src/utils/TestComponent.jsx
import React from "react";

const TestComponent = ({ Component, props = {} }) => {
  console.log(`Rendering TestComponent for: ${Component.name}`);

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h2 className="text-lg font-semibold mb-2">Testing: {Component.name}</h2>
      <Component {...props} />
    </div>
  );
};

export default TestComponent;
