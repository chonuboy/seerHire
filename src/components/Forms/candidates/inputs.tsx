import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";


interface TagInputProps {
  title: string;
  placeholder: string;
  name: string;
  tags: string[] | null;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  error?: string | string[] | null;
}

export const TagInput: React.FC<TagInputProps> = ({
  title,
  placeholder,
  tags,
  onAddTag,
  name,
  onRemoveTag,
  error,
}) => {
  const [input, setInput] = useState("");

  const handleAddTag = () => {
    if (!input.trim()) {
      toast.error("Please Enter a Value", {
        position: "top-center",
      });
      return;
    }
    onAddTag(input.trim());
    setInput("");
  };

  return (
    <div className="space-y-4">
      <label className="font-semibold dark:text-white text-lg text-blue-800">{title}</label>
      
      <div className="flex md:flex-row flex-col md:items-center gap-2 relative">
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTag();
            }
          }}
          className="w-full px-4 py-3 rounded-lg border border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 bg-white dark:bg-black dark:text-white text-blue-700 placeholder-gray-300"
        />
        
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-300 shadow-sm font-medium md:absolute right-1 top-1.5"
        >
          Add
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {tags && tags.length > 0 && (
        <div className="mt-2 space-y-2 animate-fadeIn">
          <div className="flex flex-wrap items-center gap-6">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} onRemove={() => onRemoveTag(tag)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface TagProps {
  text: string;
  onRemove: () => void;
}

const Tag: React.FC<TagProps> = ({ text, onRemove }) => {
  return (
    <span className="bg-blue-100 py-1.5 px-4 rounded-full relative mt-2 text-blue-800 font-medium shadow-sm inline-flex items-center">
      {text}
      <button
        type="button"
        onClick={onRemove}
        className="bg-red-500 text-white rounded-full ml-2 p-1 hover:bg-red-600 absolute -top-2 -right-3"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
};

interface SingleInputProps {
  title: string;
  placeholder: string;
  name: string;
  value: string | number | null | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | string[] | null;
}

export const SingleInput: React.FC<SingleInputProps> = ({
  title,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  error,
}) => (
  <div className="space-y-4">
    <label className="font-semibold dark:text-white text-lg text-blue-800">{title}</label>
    <input
      type="text"
      className="block w-full px-3 py-2 rounded-md border border-gray-300 dark:bg-black dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder:gray-300"
      placeholder={placeholder}
      value={value ?? ''}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);