import { useState, useRef, useEffect } from 'react';

/**
 * A simple drop-zone hook for files.
 *
 * @param {Object} options
 * @param {(file: File) => void} options.onDropFile - callback when the file was dropped
 * @param {boolean} [options.isEnabled=true] - enables/disables drop
 * @param {boolean} [options.preventWindowDrops=true] - convert named export to default export
 */
export const useDropZone = ({ onDropFile, isEnabled = true, preventWindowDrops = true }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef(null);
  const dragCounter = useRef(0);

  // Attach events to a specific element (container)
  useEffect(() => {
    if (!isEnabled) return;

    const node = dropRef.current;
    if (!node) return;

    const handleDragEnter = event => {
      event.preventDefault();
      event.stopPropagation();

      const hasFiles = Array.from(event.dataTransfer?.types || []).includes('Files');
      if (!hasFiles) return;

      dragCounter.current += 1;
      setIsDragging(true);
    };

    const handleDragOver = event => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = 'copy';
    };

    const handleDragLeave = event => {
      event.preventDefault();
      event.stopPropagation();

      dragCounter.current -= 1;
      if (dragCounter.current <= 0) {
        dragCounter.current = 0;
        setIsDragging(false);
      }
    };

    const handleDrop = event => {
      event.preventDefault();
      event.stopPropagation();

      dragCounter.current = 0;
      setIsDragging(false);

      const file = event.dataTransfer.files?.[0];
      if (!file || !onDropFile) return;

      onDropFile(file);
    };

    node.addEventListener('dragenter', handleDragEnter);
    node.addEventListener('dragover', handleDragOver);
    node.addEventListener('dragleave', handleDragLeave);
    node.addEventListener('drop', handleDrop);

    return () => {
      node.removeEventListener('dragenter', handleDragEnter);
      node.removeEventListener('dragover', handleDragOver);
      node.removeEventListener('dragleave', handleDragLeave);
      node.removeEventListener('drop', handleDrop);
    };
  }, [isEnabled, onDropFile]);

  // Prevent the browser from opening the file in a tab
  useEffect(() => {
    if (!preventWindowDrops || !isEnabled) return;

    const handleWindowDragOver = event => {
      event.preventDefault();
    };

    const handleWindowDrop = event => {
      event.preventDefault();
    };

    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('drop', handleWindowDrop);

    return () => {
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, [isEnabled, preventWindowDrops]);

  return {
    dropRef,
    isDragging,
  };
};
