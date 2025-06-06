export const Popup = ({ children, onClose,styleMod }: { children: React.ReactNode; onClose: () => void,styleMod?:string }) => (
    <div
      className={`z-10 fixed top-0 left-0 right-0 w-full h-auto bg-gray-950 bg-opacity-80 flex justify-center items-center ${styleMod}`}
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