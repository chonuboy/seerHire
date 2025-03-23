import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TagInput } from "./inputs";
import { SingleInput } from "./inputs";
import { candidateSearchSchema } from "@/lib/models/candidate";
import { SearchQueries } from "@/lib/models/candidate";
import { searchCandidates } from "@/api/candidates/candidates";
import { setSearchQuery } from "@/Features/candidateSearchSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const SearchForm: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik<SearchQueries>({
    initialValues: {
      techRole: null,
      minExperience: null,
      maxExperience: null,
      currentLocation: null,
      minSalary: null,
      maxSalary: null,
      noticePeriod: null,
      preferredJobType: null,
      highestEducation: null,
      preferredLocation:[],
      domain: [],
      mustHaveTechnologies: null,
      goodToHaveTechnologies: null,
      companies: [],
    },
    validationSchema: candidateSearchSchema,
    onSubmit: (values) => {
      if(values.companies?.length === 0) {
        values.companies = null;
      }
      if(values.preferredLocation?.length === 0) {
        values.preferredLocation = null;
      }
      if(values.domain?.length === 0) {
        values.domain = null;
      }
      const allFieldsNull = Object.values(values).every(
        (value) => value === null
      );

      if (allFieldsNull) {  
        toast.error("Please enter at least one search criteria.", {
          position: "top-center",
        });
      } else {
        dispatch(setSearchQuery(values));
        setTimeout(() => {
          router.push("/search/results");
        }, 2000);
      }
    },
  });

  useEffect(() => {
    console.log(formik.values);
    console.log(formik.errors);
  }, [formik.values, formik.errors]);

  // Add a technology to the good-to-have list
  const handleAddGoodToHave = () => {
    if (inputValue.trim()) {
      formik.setFieldValue("goodToHaveTechnologies", [
        ...(formik.values.goodToHaveTechnologies?.length
          ? formik.values.goodToHaveTechnologies
          : []),
        inputValue.trim(),
      ]);
      setInputValue(""); // Clear input
    }
  };

  // Add a technology to the must-have list
  const handleAddMustHave = () => {
    if (inputValue.trim()) {
      formik.setFieldValue("mustHaveTechnologies", [
        ...(formik.values.mustHaveTechnologies?.length
          ? formik.values.mustHaveTechnologies
          : []),
        inputValue.trim(),
      ]);
      setInputValue(""); // Clear input
    }
  };

  // Remove a technology from both lists
  const handleRemoveTechnology = (tech: string) => {
    formik.setFieldValue(
      "goodToHaveTechnologies",
      formik.values.goodToHaveTechnologies?.filter((t) => t !== tech)
    );
    formik.setFieldValue(
      "mustHaveTechnologies",
      formik.values.mustHaveTechnologies?.filter((t) => t !== tech)
    );
  };

  const handleAddTag = (field: keyof SearchQueries, tag: string) => {
    if (
      Array.isArray(formik.values[field]) &&
      formik.values[field].includes(tag)
    ) {
      return;
    }

    Array.isArray(formik.values[field]) &&
      formik.setFieldValue(field, [...formik.values[field], tag]);
  };

  const handleRemoveTag = (field: keyof SearchQueries, tag: string) => {
    formik.setFieldValue(
      field,
      Array.isArray(formik.values[field])
        ? formik.values[field].filter((t: string) => t !== tag)
        : formik.values[field]
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Technologies */}
        <div className="bg-gray-50 rounded-lg shadow-lg border-2 border-gray-200 p-2">
          <h1 className="text-lg font-bold text-gray-900 mb-6">Technologies</h1>

          {/* Input and Buttons */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter Single or Multiple Technologies"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleAddGoodToHave}
                className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Add
              </button>
              <button
                type="button"
                onClick={handleAddMustHave}
                className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add as Mandatory
              </button>
            </div>
          </div>

          {/* Display Added Technologies */}
          {(Array.isArray(formik.values.goodToHaveTechnologies) &&
            formik.values.goodToHaveTechnologies.length > 0) ||
          (Array.isArray(formik.values.mustHaveTechnologies) &&
            formik.values.mustHaveTechnologies.length > 0) ? (
            <h2 className="text-lg font-semibold text-gray-900">
              Technologies Added
            </h2>
          ) : (
            ""
          )}
          <div className="mt-2 space-y-2">
            <div className="flex flex-wrap gap-2">
              {formik.values.goodToHaveTechnologies?.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="text-xs text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
              {formik.values.mustHaveTechnologies?.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="text-xs text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Companies */}
        <TagInput
          name="companies"
          title="Companies"
          placeholder="Enter Single or Multiple Previous Companies"
          tags={formik.values.companies}
          onAddTag={(tag) => handleAddTag("companies", tag)}
          onRemoveTag={(tag) => handleRemoveTag("companies", tag)}
        />

        {/* Tech Role */}
        <SingleInput
          name="techRole"
          title="Tech Role"
          placeholder="Enter Tech Role"
          value={formik.values.techRole}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* Current Location */}
        <SingleInput
          name="currentLocation"
          title="Current Location"
          placeholder="Enter Current Location"
          value={formik.values.currentLocation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* Domain */}
        <TagInput
          name="domain"
          title="Domain"
          placeholder="Enter Single or Multiple Domains"
          tags={formik.values.domain}
          onAddTag={(tag) => handleAddTag("domain", tag)}
          onRemoveTag={(tag) => handleRemoveTag("domain", tag)}
          error={formik.touched.domain ? formik.errors.domain : null}
        />

        {/* Preferred Location */}
        <TagInput
          name="preferredLocation"
          title="Preferred Location"
          placeholder="Enter Single or Multiple Locations"
          tags={formik.values.preferredLocation}
          onAddTag={(tag) => handleAddTag("preferredLocation", tag)}
          onRemoveTag={(tag) => handleRemoveTag("preferredLocation", tag)}
        />

        {/* Qualification */}
        <SingleInput
          name="highestEducation"
          title="Qualification"
          placeholder="Enter Qualification Details"
          value={formik.values.highestEducation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.highestEducation
              ? formik.errors.highestEducation
              : null
          }
        />

        {/* Experience */}
        <SingleInput
          name="minExperience"
          title="Minimum Experience"
          placeholder="Enter Minimum Experience"
          value={formik.values.minExperience}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.minExperience ? formik.errors.minExperience : null
          }
        />

        <SingleInput
          name="maxExperience"
          title="Maximum Experience"
          placeholder="Enter Maximum Experience"
          value={formik.values.maxExperience}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.maxExperience ? formik.errors.maxExperience : null
          }
        />
        {/* Preferred Job Type */}
        <SingleInput
          name="preferredJobType"
          title="Preferred Job Type"
          placeholder="Enter Preferred Job Type"
          value={formik.values.preferredJobType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.preferredJobType
              ? formik.errors.preferredJobType
              : null
          }
        />

        {/* Salary */}
        <SingleInput
          name="minSalary"
          title="Minimum Salary"
          placeholder="Enter Minimum Salary"
          value={formik.values.minSalary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.minSalary ? formik.errors.minSalary : null}
        />
        <SingleInput
          name="maxSalary"
          title="Maximum Salary"
          placeholder="Enter Maximum Salary"
          value={formik.values.maxSalary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.maxSalary ? formik.errors.maxSalary : null}
        />

        {/* Notice Period */}
        <SingleInput
          name="noticePeriod"
          title="Notice Period"
          placeholder="Enter Minimum Days"
          value={formik.values.noticePeriod}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.noticePeriod ? formik.errors.noticePeriod : null
          }
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search Candidates
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
