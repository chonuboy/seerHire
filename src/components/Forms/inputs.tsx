import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Elements/cards/Card";


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
    <Card className="bg-gray-50 p-4 h-auto md:h-full space-y-2 md:space-y-4 rounded-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="shadow-none space-y-4">
        {/* Input Field */}
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
          className="px-4 py-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
        )}

        {/* Add Button */}
        <div className="space-x-6">
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Add
          </button>
        </div>

        {/* Display Added Tags */}
        {tags && tags.length > 0 && (
          <div>
            <p className="text-sm mb-2 font-medium">Added {title}:</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Tag key={index} text={tag} onRemove={() => onRemoveTag(tag)} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Tag Component (Example)
interface TagProps {
  text: string;
  onRemove: () => void;
}

const Tag: React.FC<TagProps> = ({ text, onRemove }) => {
  return (
    <div className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
      <span>{text}</span>
      <button
        onClick={onRemove}
        className="ml-2 text-blue-800 hover:text-blue-900 focus:outline-none"
      >
        &times;
      </button>
    </div>
  );
};

interface SingleInputProps {
  title: string;
  placeholder: string;
  name:string;
  value: string|number|null | readonly string[] | undefined;
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
  <Card className="bg-gray-50 p-4 md:h-full space-y-2 md:space-y-4 rounded-lg">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 shadow-none">
      <input
        type="text"
        className="px-4 py-2 border w-full border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value ?? ''}
        name ={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="text-red-500 text-sm border-red-500">{error}</div>}
    </CardContent>
  </Card>
);