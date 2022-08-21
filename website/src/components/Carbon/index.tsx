import { useEffect } from 'react';
import './index.css';

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export default function Carbon({
  code = 'CEAIV23U',
  placement = 'wwwjest-previewcom',
  querySelector = 'h1',
  customStyle = 'min-height: 100px; margin: 20px 0;',
}) {
  useEffect(() => {
    try {
      var targetElement = document.querySelector(querySelector);
      const s = document.createElement('script');
      s.id = '_carbonads_js';
      s.src = `//cdn.carbonads.com/carbon.js?serve=${code}&placement=${placement}`;
      // Add a container below h1 to avoid layout shift
      const mountContainer = document.createElement('div');
      mountContainer.setAttribute('style', customStyle);
      insertAfter(targetElement, mountContainer);
      // Mount carbon as a child of mountContainer
      mountContainer.appendChild(s);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return null;
}
