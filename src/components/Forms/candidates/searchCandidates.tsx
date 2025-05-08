"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { TagInput } from "./inputs"
import { SingleInput } from "./inputs"
import { candidateSearchSchema } from "@/lib/models/candidate"
import type { SearchQueries } from "@/lib/models/candidate"
import { X } from "lucide-react"
import { setSearchQuery } from "@/Features/candidateSearchSlice"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

const SearchForm: React.FC = () => {
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch()
  const router = useRouter()

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
      preferredLocation: [],
      domain: [],
      mustHaveTechnologies: null,
      goodToHaveTechnologies: null,
      companies: [],
    },
    validationSchema: candidateSearchSchema,
    onSubmit: (values) => {
      if (values.companies?.length === 0) {
        values.companies = null
      }
      if (values.preferredLocation?.length === 0) {
        values.preferredLocation = null
      }
      if (values.domain?.length === 0) {
        values.domain = null
      }

      const payload = Object.entries(values).reduce((acc: any, [key, value]) => {
        if (value !== null && value !== "" && !(Array.isArray(value) && value.length === 0)) {
          acc[key] = value
        }
        return acc
      }, {})

      console.log(payload)

      if (Object.keys(payload).length === 0) {
        toast.error("Please enter at least one search criteria.", {
          position: "top-center",
        })
      } else {
        dispatch(setSearchQuery(payload))
        setTimeout(() => {
          router.push("/search/results")
        }, 2000)
      }
    },
  })

  useEffect(() => {
    console.log(formik.values)
    console.log(formik.errors)
  }, [formik.values, formik.errors])

  const handleAddGoodToHave = () => {
    if (
      formik.values.goodToHaveTechnologies?.includes(inputValue.trim()) ||
      formik.values.mustHaveTechnologies?.includes(inputValue.trim())
    ) {
      toast.error("Technology already added", { position: "top-center" })
      return
    }
    if (inputValue.trim()) {
      formik.setFieldValue("goodToHaveTechnologies", [
        ...(formik.values.goodToHaveTechnologies?.length ? formik.values.goodToHaveTechnologies : []),
        inputValue.trim(),
      ])
      setInputValue("")
    }
  }

  const handleAddMustHave = () => {
    if (
      formik.values.goodToHaveTechnologies?.includes(inputValue.trim()) ||
      formik.values.mustHaveTechnologies?.includes(inputValue.trim())
    ) {
      toast.error("Technology already added", { position: "top-center" })
      return
    }
    if (inputValue.trim()) {
      formik.setFieldValue("mustHaveTechnologies", [
        ...(formik.values.mustHaveTechnologies?.length ? formik.values.mustHaveTechnologies : []),
        inputValue.trim(),
      ])
      setInputValue("")
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    formik.setFieldValue(
      "goodToHaveTechnologies",
      formik.values.goodToHaveTechnologies?.filter((t) => t !== tech),
    )
    formik.setFieldValue(
      "mustHaveTechnologies",
      formik.values.mustHaveTechnologies?.filter((t) => t !== tech),
    )
  }

  const handleAddTag = (field: keyof SearchQueries, tag: string) => {
    if (Array.isArray(formik.values[field]) && formik.values[field].includes(tag)) {
      toast.error(`${tag} already added`, { position: "top-center" })
      return
    }
    if (Array.isArray(formik.values[field]) && formik.values[field].includes(tag)) {
      return
    }

    Array.isArray(formik.values[field]) && formik.setFieldValue(field, [...formik.values[field], tag])
  }

  const handleRemoveTag = (field: keyof SearchQueries, tag: string) => {
    formik.setFieldValue(
      field,
      Array.isArray(formik.values[field])
        ? formik.values[field].filter((t: string) => t !== tag)
        : formik.values[field],
    )
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="rounded-xl space-y-8"
    >
      <div className="grid grid-cols-1 p-4 gap-8 md:mx-20 mx-2">
        <div className="space-y-8">
          {/* Technologies */}
          <div className="space-y-4">
            <h2 className="font-semibold dark:text-white text-lg text-blue-800">
              Technologies
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter technologies..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-blue-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 bg-white dark:bg-black dark:text-white text-blue-900 placeholder-gray-300"
              />
              <div className="md:absolute inset-y-0 right-0 flex items-center gap-3 pr-3 mt-3 md:mt-0">
                <button
                  type="button"
                  onClick={handleAddGoodToHave}
                  className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-300 shadow-sm font-medium"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={handleAddMustHave}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md font-medium"
                >
                  Mandatory
                </button>
              </div>
            </div>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-3 mt-4">
              {formik.values.goodToHaveTechnologies?.map((tech, index) => (
                <div key={index} className="relative mt-1 animate-fadeIn">
                  <span className="bg-blue-100 py-1.5 px-4 rounded-full relative mt-2 text-blue-800 font-medium shadow-sm inline-flex items-center">
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(tech)}
                      className="bg-red-500 text-white rounded-full ml-2 p-1 hover:bg-red-600 absolute -top-2 -right-2 shadow-md transition-all duration-300 hover:scale-110"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                </div>
              ))}
              {formik.values.mustHaveTechnologies?.map((tech, index) => (
                <div key={index} className="relative mt-1 animate-fadeIn">
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 py-1.5 px-4 rounded-full relative mt-2 text-white font-medium shadow-md inline-flex items-center">
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(tech)}
                      className="bg-red-500 text-white rounded-full ml-2 p-1 hover:bg-red-600 absolute -top-2 -right-2 shadow-md transition-all duration-300 hover:scale-110"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Companies */}
          <TagInput
            name="companies"
            title="Previous Companies"
            placeholder="Enter companies..."
            tags={formik.values.companies ?? []}
            onAddTag={(tag) => handleAddTag("companies", tag)}
            onRemoveTag={(tag) => handleRemoveTag("companies", tag)}
          />

          {/* Domain */}
          <TagInput
            name="domains"
            title="Domain Expertise"
            placeholder="Enter domains..."
            tags={formik.values.domain ?? []}
            onAddTag={(tag) => handleAddTag("domain", tag)}
            onRemoveTag={(tag) => handleRemoveTag("domain", tag)}
            error={formik.touched.domain ? formik.errors.domain : null}
          />
          <TagInput
            name="preferredLocations"
            title="Preferred Locations"
            placeholder="Enter locations..."
            tags={formik.values.preferredLocation ?? []}
            onAddTag={(tag) => handleAddTag("preferredLocation", tag)}
            onRemoveTag={(tag) => handleRemoveTag("preferredLocation", tag)}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-8 py-2 rounded-xl">
          {/* Role and Experience */}
          <div className="grid grid-cols-1 gap-6">
            <SingleInput
              name="currentLocation"
              title="Current Location"
              placeholder="Enter location..."
              value={formik.values.currentLocation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <SingleInput
              name="techRole"
              title="Tech Role"
              placeholder="Enter role..."
              value={formik.values.techRole}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <SingleInput
              name="highestEducation"
              title="Qualification"
              placeholder="Enter qualification..."
              value={formik.values.highestEducation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.highestEducation ? formik.errors.highestEducation : null}
            />
          </div>

          {/* Experience Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SingleInput
              name="minExperience"
              title="Min Experience (years)"
              placeholder="0"
              value={formik.values.minExperience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.minExperience ? formik.errors.minExperience : null}
            />
            <SingleInput
              name="maxExperience"
              title="Max Experience (years)"
              placeholder="10"
              value={formik.values.maxExperience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.maxExperience ? formik.errors.maxExperience : null}
            />
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SingleInput
              name="minSalary"
              title="Min Salary (LPA)"
              placeholder="0"
              value={formik.values.minSalary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.minSalary ? formik.errors.minSalary : null}
            />
            <SingleInput
              name="maxSalary"
              title="Max Salary (LPA)"
              placeholder="50"
              value={formik.values.maxSalary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.maxSalary ? formik.errors.maxSalary : null}
            />
          </div>

          {/* Job Type and Notice Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SingleInput
              name="preferredJobType"
              title="Job Type"
              placeholder="Full-time, Contract, etc."
              value={formik.values.preferredJobType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.preferredJobType ? formik.errors.preferredJobType : null}
            />
            <SingleInput
              name="noticePeriod"
              title="Notice Period (days)"
              placeholder="30"
              value={formik.values.noticePeriod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.noticePeriod ? formik.errors.noticePeriod : null}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-full hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg w-full md:w-auto md:min-w-[200px] text-lg"
          >
            Search Candidates
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchForm
