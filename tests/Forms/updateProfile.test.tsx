import React from 'react';
import { it, expect, describe, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProfileUpdateForm from '@/components/Forms/candidates/updateProfile';
import '@testing-library/jest-dom/vitest';
import { Dialog } from '@headlessui/react'

describe('ProfileUpdateForm', () => {
  const mockProps = {
    initialValues: {
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      isActive: true,
      isExpectedCtcNegotiable: false,
      designation: 'Software Engineer',
      techRole: 'Frontend Developer',
      companyName: 'Tech Corp',
      totalExperience: 5,
      highestEducation: 'B.Tech',
      primaryNumber: '+1234567890',
      secondaryNumber: '+0987654321',
      emailId: 'john@example.com',
      currentSalary: 100000,
      expectedSalary: 120000,
      gender: 'Male',
      noticePeriod: 30,
      maritalStatus: 'Single',
      currentLocation: { locationId: 1, locationDetails: 'New York' },
      address1: '123 Main St',
      addressLocality: 'Downtown',
      pinCode: '123456',
      linkedin: 'https://linkedin.com/in/johndoe',
      differentlyAbled: false,
      differentlyAbledType: '',
      contactId: 1
    },
    id: 1,
    autoClose: vi.fn(),
    masterLocations: [
      { locationId: 1, locationDetails: 'New York' },
      { locationId: 2, locationDetails: 'San Francisco' }
    ],
    preferredJobModes: [
      { jobType: 'Remote' },
      { jobType: 'Hybrid' }
    ],
    preferredLocation: ['New York', 'San Francisco'],
    hiringTypes: [
      { hiringType: 'Full Time' },
      { hiringType: 'Contract' }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the form with all fields', () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    expect(screen.getByLabelText('First Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument()
    expect(screen.getByLabelText('Candidate Status')).toBeInTheDocument()
    expect(screen.getByLabelText('Designation')).toBeInTheDocument()
    expect(screen.getByLabelText('Tech Role')).toBeInTheDocument()
    expect(screen.getByLabelText('Current Company')).toBeInTheDocument()
    expect(screen.getByLabelText('Total Experience (Years)')).toBeInTheDocument()
    expect(screen.getByLabelText('Mobile Number (Primary)')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Current Salary (LPA)')).toBeInTheDocument()
    expect(screen.getByLabelText('Preferred Job Type')).toBeInTheDocument()
    expect(screen.getByLabelText('Gender')).toBeInTheDocument()
    expect(screen.getByLabelText('Current Location')).toBeInTheDocument()
  })

  it('pre-fills form with initial values', () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Software Engineer')).toBeInTheDocument()
    expect(screen.getByDisplayValue('5')).toBeInTheDocument()
    expect(screen.getByDisplayValue('100000')).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<ProfileUpdateForm {...mockProps} initialValues={{ ...mockProps.initialValues, firstName: '' }} />)
    
    const submitButton = screen.getByText('Update')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('First Name is required')).toBeInTheDocument()
    })
  })

  it('handles text input changes', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const firstNameInput = screen.getByLabelText('First Name')
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } })
    
    expect(firstNameInput).toHaveValue('Jane')
  })

  it('handles number input changes', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const experienceInput = screen.getByLabelText('Total Experience (Years)')
    fireEvent.change(experienceInput, { target: { value: '6' } })
    
    expect(experienceInput).toHaveValue(6)
  })

  it('handles date picker changes', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const newDate = new Date('1995-05-15')
    const datePicker = screen.getByLabelText('Date of Birth')
    
    // This depends on how your date picker is implemented
    // You might need to use a different approach to change the date
    fireEvent.change(datePicker, { target: { value: '1995-05-15' } })
    
    await waitFor(() => {
      expect(datePicker).toHaveValue('15/05/1995') // Format depends on your date picker
    })
  })

  it('handles radio button changes', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const activeRadio = screen.getByLabelText('Active')
    const inactiveRadio = screen.getByLabelText('Inactive')
    
    fireEvent.click(inactiveRadio)
    
    await waitFor(() => {
      expect(inactiveRadio).toBeChecked()
      expect(activeRadio).not.toBeChecked()
    })
  })

  it('shows confirmation dialog when setting to inactive', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const inactiveRadio = screen.getByLabelText('Inactive')
    fireEvent.click(inactiveRadio)
    
    await waitFor(() => {
      expect(screen.getByText('Confirm Status Change')).toBeInTheDocument()
    })
  })

  it('handles job type checkbox changes', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const remoteCheckbox = screen.getByLabelText('Remote')
    fireEvent.click(remoteCheckbox)
    
    await waitFor(() => {
      expect(remoteCheckbox).toBeChecked()
    })
  })

  it('handles flexible job type selection', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const flexibleCheckbox = screen.getByLabelText('Flexible')
    fireEvent.click(flexibleCheckbox)
    
    await waitFor(() => {
      expect(flexibleCheckbox).toBeChecked()
      expect(screen.getByLabelText('Remote')).toBeChecked()
      expect(screen.getByLabelText('Onsite')).toBeChecked()
      expect(screen.getByLabelText('Hybrid')).toBeChecked()
    })
  })

  it('handles hiring type checkbox changes', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const fullTimeCheckbox = screen.getByLabelText('Full Time')
    fireEvent.click(fullTimeCheckbox)
    
    await waitFor(() => {
      expect(fullTimeCheckbox).toBeChecked()
    })
  })

  it('handles flexible hiring type selection', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const flexibleCheckbox = screen.getByLabelText('Flexible')
    fireEvent.click(flexibleCheckbox)
    
    await waitFor(() => {
      expect(flexibleCheckbox).toBeChecked()
      expect(screen.getByLabelText('Full Time')).toBeChecked()
      expect(screen.getByLabelText('Part Time')).toBeChecked()
      expect(screen.getByLabelText('Contract')).toBeChecked()
    })
  })

  it('handles location selection', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    // This depends on your LocationAutocomplete implementation
    // You might need to mock the component or trigger its events directly
    const locationInput = screen.getByPlaceholderText('Enter Current Location')
    fireEvent.change(locationInput, { target: { value: 'San Francisco' } })
    
    // Simulate selecting a location from dropdown
    const locationOption = await screen.findByText('San Francisco')
    fireEvent.click(locationOption)
    
    await waitFor(() => {
      expect(locationInput).toHaveValue('San Francisco')
    })
  })

  it('handles form submission', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const submitButton = screen.getByText('Update')
    fireEvent.click(submitButton)
    
    // await waitFor(() => {
    //   expect(mockProps.onSubmit).toHaveBeenCalled()
    // })
  })

  it('handles cancel button click', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)
    
    await waitFor(() => {
      expect(mockProps.autoClose).toHaveBeenCalled()
    })
  })

  it('shows differently abled type field when differently abled is yes', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const yesRadio = screen.getByLabelText('Yes')
    fireEvent.click(yesRadio)
    
    await waitFor(() => {
      expect(screen.getByLabelText('Differently Abled Type')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument()
    })
  })

  it('handles salary negotiability toggle', async () => {
    render(<ProfileUpdateForm {...mockProps} />)
    
    const negotiableRadio = screen.getByLabelText('Yes')
    fireEvent.click(negotiableRadio)
    
    await waitFor(() => {
      expect(negotiableRadio).toBeChecked()
    })
  })
})