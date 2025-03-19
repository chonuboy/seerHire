export const Popup = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
    <div
      className="z-10 fixed top-0 left-0 w-full h-auto bg-gray-500 bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="p-4 rounded-lg md:w-1/2 h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );