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
      <label className="font-semibold text-gray-600">{title}</label>
      
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
          className="flex-1 min-w-0 block w-full px-2 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        
        <button
          type="button"
          onClick={handleAddTag}
          className="inline-flex items-center px-4 py-2 justify-center border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm bg-gray-200 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:absolute right-1 top-1.5"
        >
          Add
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {tags && tags.length > 0 && (
        <div className="mt-2 space-y-2">
          <p className="text-gray-500 mb-1">Added {name.charAt(0).toUpperCase() + name.slice(1)}:</p>
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
    <span className="bg-gray-300 py-1 px-3 rounded-full relative mt-2">
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
    <label className="font-semibold text-gray-600">{title}</label>
    <input
      type="text"
      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      placeholder={placeholder}
      value={value ?? ''}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);