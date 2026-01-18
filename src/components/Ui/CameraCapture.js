import React, { useRef } from 'react';

const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const CameraCapture = ({ onPhotoTaken, className = '' }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      // Передаємо файл батьківському компоненту
      onPhotoTaken(file);
    }
    // Очищаємо інпут, щоб можна було зробити ще одне фото тієї ж сцени, якщо треба
    event.target.value = '';
  };

  return (
    <div className={`camera-capture-wrapper ${className}`}>
      {/* capture="environment" - відкриває основну (задню) камеру.
         capture="user" - відкриває фронтальну (селфі) камеру.
         accept="image/*" - дозволяє тільки фото.
      */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Ховаємо стандартний інпут
      />

      <button
        type="button"
        onClick={handleButtonClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        // Додайте ваші класи стилізації тут (Tailwind або звичайний CSS)
      >
        <CameraIcon />
        <span>Зробити фото</span>
      </button>
    </div>
  );
};

export default CameraCapture;
