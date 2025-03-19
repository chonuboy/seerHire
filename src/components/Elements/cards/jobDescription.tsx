import { Client } from "@/lib/models/client";
import React from "react";
export const JobDescription = ({ currentJob }:{currentJob:Client|null}) => {
    // Function to modify the HTML string
    const modifyHTML = (html: string) => {
      // Create a temporary DOM element to parse the HTML string
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
  
      // Find all <ul> tags and add the `list-disc` class
      const ulElements = doc.querySelectorAll('ul');
      ulElements.forEach((ul) => {
        ul.classList.add('list-disc');
        ul.classList.add('list-inside');
        ul.classList.add('pl-4');
        ul.classList.add('space-y-2');
      });
  
      // Find all <li> tags and add the `list-item` class
      const liElements = doc.querySelectorAll('li');
      liElements.forEach((li) => {
        li.classList.add('list-item');
        li.style.letterSpacing = '1px';
      });
  
      // Convert the modified DOM back to an HTML string
      return doc.body.innerHTML;
    };
  
    // Modify the HTML string before rendering
    const modifiedHTML = modifyHTML(currentJob?.jobDescription || "");
  
    return (
      <div
        className="w-full space-y-4 text-lg"
        dangerouslySetInnerHTML={{ __html: modifiedHTML }}
      />
    );
  };