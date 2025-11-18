import React, { useState, useEffect, useRef } from 'react';
import '../styles/ReportForm.css';
import Copy from './animations/copy';

const ReportForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    isAnonymous: true,
    urgency: 0,
    problemType: '',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    images: []
  });

  const [errors, setErrors] = useState({});
  const formContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('form-open');
    } else {
      document.body.classList.remove('form-open');
    }

    return () => {
      document.body.classList.remove('form-open');
    };
  }, [isOpen]);

  const urgencyLevels = [
    { 
      value: "Low", 
      label: "Low", 
      color: "#b9d2f8ff", 
      description: "Minor issue - can wait for regular maintenance" 
    },
    { 
      value: "Medium", 
      label: "Medium", 
      color: "#6694f7ff", 
      description: "Standard priority - address within a few days" 
    },
    { 
      value: "High", 
      label: "High", 
      color: "#4752f3ff", 
      description: "Important issue - needs attention soon" 
    },
    { 
      value: "Critical", 
      label: "Critical", 
      color: "#2f00ffff", 
      description: "Immediate action required - safety or major disruption" 
    }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.isAnonymous && !formData.fullName.trim()) {
      newErrors.fullName = 'Name is required when not anonymous';
    } else if (!formData.isAnonymous && formData.fullName.trim()) {
      const nameRegex = /^[a-zA-Z\s]{2,20}$/;
      if (!nameRegex.test(formData.fullName.trim())) {
        newErrors.fullName = 'Name should contain only letters (2-20 characters)';
      }
    }

    if (!formData.problemType) {
      newErrors.problemType = 'Please select a problem type';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    } else if (formData.title.trim().length > 20) {
      newErrors.title = 'Title must be less than 20 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.trim().length > 100) {
      newErrors.description = 'Description must be less than 100 characters';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 30);
      
      if (selectedDate < new Date('2021-01-01')) {
        newErrors.date = 'Please select a valid date';
      } else if (selectedDate > maxDate) {
        newErrors.date = 'Date cannot be more than 30 days in the future';
      }
    }

    if (formData.location.length > 20) {
      newErrors.location = 'Location must be 20 characters or less';
    }

    if (formData.images.length > 0) {
      formData.images.forEach((image, index) => {
        if (image.size > 5 * 1024 * 1024) { // 5MB
          newErrors.images = `Image ${index + 1} is too large (max 5MB)`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const toggleAnonymous = () => {
    setFormData(prev => ({
      ...prev,
      isAnonymous: !prev.isAnonymous,
      fullName: !prev.isAnonymous ? '' : prev.fullName
    }));
    
    if (errors.fullName) {
      setErrors(prev => ({
        ...prev,
        fullName: ''
      }));
    }
  };

  const handleUrgencyChange = (e) => {
    const urgencyValue = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      urgency: urgencyValue
    }));
  };

  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    
    if (formData.images.length + files.length > 3) {
      setErrors(prev => ({
        ...prev,
        images: 'Maximum 3 images allowed'
      }));
      return;
    }

    
    const validFiles = files.filter(file => {
      
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          images: 'Only image files are allowed'
        }));
        return false;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          images: 'Image size must be less than 5MB'
        }));
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles]
      }));

      // Clear image errors if upload was successful
      if (errors.images) {
        setErrors(prev => ({
          ...prev,
          images: ''
        }));
      }
    }

    // Reset file input
    e.target.value = '';
  };

  // Remove image
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = document.querySelector('.error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
      return;
    }
    
    const submissionData = {
      ...formData,
      urgencyLevel: urgencyLevels[formData.urgency].value,
      submittedAt: new Date().toISOString(),
      imageCount: formData.images.length
    };
    
    console.log('Form submitted:', submissionData);
    alert('Report submitted successfully!');
    
    setFormData({
      fullName: '',
      isAnonymous: true,
      urgency: 0,
      problemType: '',
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      images: []
    });
    setErrors({});
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentUrgency = urgencyLevels[formData.urgency];

  return (
    <div className="form-overlay" onClick={handleOverlayClick}>
      <div className="form-container" onClick={(e) => e.stopPropagation()} ref={formContainerRef}>
        <div className="form-header">
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Close form"
          >
            ×
          </button>
          <Copy delay={0.2}><h1 className="form-title">WE HE(A)RE YOU !! </h1></Copy>
        </div>

        <div className="form-content">
          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name Field */}
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                YOUR FULL NAME:
              </label>
              <input 
                id="fullName"
                type="text" 
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder={formData.isAnonymous ? "Name will be hidden (Anonymous)" : "Enter your full name"}
                disabled={formData.isAnonymous}
              />
              {errors.fullName && (
                <div className="error-message" role="alert">
                  {errors.fullName}
                </div>
              )}
            </div>
            
            {/* Anonymous Toggle */}
            <div className="form-group">
              <label className="form-label">
                Would you like to remain anonymous?
              </label>
              <div 
                className="anonymous-toggle" 
                onClick={toggleAnonymous}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleAnonymous()}
              >
                <span className="toggle-label">Anonymous Reporting</span>
                <div className="eye-container">
                  <div className={`eye ${formData.isAnonymous ? 'closed' : ''}`}>
                    <div className="pupil"></div>
                    <div className="eyelid"></div>
                  </div>
                </div>
              </div>
              <div className="toggle-status">
                Currently: {formData.isAnonymous ? 'Yes (Your name will be hidden)' : 'No (Your name will be visible)'}
              </div>
            </div>
            
            {/* Problem Type */}
            <div className="form-group">
              <label htmlFor="problemType" className="form-label">
                PROBLEM TYPE:
              </label>
              <div className={`select-wrapper ${errors.problemType ? 'error' : ''}`}>
                <select 
                  id="problemType"
                  className="form-input select-input"
                  name="problemType"
                  value={formData.problemType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a problem type</option>
                  <option value="Electrical bug">Electrical bug</option>
                  <option value="Sanitary issue">Sanitary issue</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Lost stuff">Lost stuff</option>
                  <option value="Social">Social</option>
                  <option value="Other">Other</option>
                </select>
                <div className="select-arrow">▼</div>
              </div>
              {errors.problemType && (
                <div className="error-message" role="alert">
                  {errors.problemType}
                </div>
              )}
            </div>
            
            {/* Incident Date */}
            <div className="form-group">
              <label htmlFor="incidentDate" className="form-label">
                INCIDENT DATE:
              </label>
              <input 
                id="incidentDate"
                type="date" 
                className={`form-input ${errors.date ? 'error' : ''}`}
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]}
                required
              />
              {errors.date && (
                <div className="error-message" role="alert">
                  {errors.date}
                </div>
              )}
            </div>

            {/* Location Field */}
            <div className="form-group">
              <label htmlFor="location" className="form-label">
                LOCATION (Optional):
              </label>
              <input 
                id="location"
                type="text" 
                className={`form-input ${errors.location ? 'error' : ''}`}
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Where did this happen? (e.g., Room 205, Kitchen A)"
                maxLength={20}
              />
              {errors.location && (
                <div className="error-message" role="alert">
                  {errors.location}
                </div>
              )}
              <div className="character-count">
                {formData.location.length}/20
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                UPLOAD IMAGES (Optional):
              </label>
              
              <div className="image-upload-container">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                />
                
                <button
                  type="button"
                  className="image-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={formData.images.length >= 3}
                >
                  <span className="upload-icon">📷</span>
                  Add Images ({formData.images.length}/3)
                </button>
                
                <div className="upload-info">
                  Max 3 images • 5MB each • PNG, JPG, JPEG
                </div>

                {formData.images.length > 0 && (
                  <div className="image-previews">
                    {formData.images.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`Preview ${index + 1}`}
                          className="preview-image"
                        />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() => removeImage(index)}
                          aria-label={`Remove image ${index + 1}`}
                        >
                          ×
                        </button>
                        <div className="image-size">
                          {(image.size / 1024 / 1024).toFixed(1)}MB
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {errors.images && (
                <div className="error-message" role="alert">
                  {errors.images}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                How would you rate the urgency of the situation?
              </label>
              <div className="urgency-slider-container">
                <input 
                  type="range" 
                  min="0" 
                  max="3" 
                  value={formData.urgency}
                  onChange={handleUrgencyChange}
                  className="urgency-slider"
                  aria-label="Urgency level"
                />
                <div className="urgency-levels">
                  {urgencyLevels.map((level, index) => (
                    <div 
                      key={level.value}
                      className={`urgency-level ${index === formData.urgency ? 'active' : ''}`}
                    >
                      {level.label}
                    </div>
                  ))}
                </div>
                <div className="urgency-display">
                  <div>
                    <div 
                      className="urgency-text"
                      style={{ color: currentUrgency.color }}
                    >
                      {currentUrgency.label}
                    </div>
                    <div className="urgency-description">
                      {currentUrgency.description}
                    </div>
                  </div>
                  <div 
                    className="urgency-indicator"
                    style={{ backgroundColor: currentUrgency.color }}
                    aria-label={`Current urgency level: ${currentUrgency.label}`}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                TITLE:
              </label>
              <input 
                id="title"
                type="text" 
                className={`form-input ${errors.title ? 'error' : ''}`}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a title for your report"
                maxLength={20}
                required
              />
              {errors.title && (
                <div className="error-message" role="alert">
                  {errors.title}
                </div>
              )}
              <div className="character-count">
                {formData.title.length}/20
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                YOUR DESCRIPTION:
              </label>
              <textarea 
                id="description"
                className={`form-input ${errors.description ? 'error' : ''}`}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the issue in detail"
                rows="4"
                maxLength={100}
                required
              />
              {errors.description && (
                <div className="error-message" role="alert">
                  {errors.description}
                </div>
              )}
              <div className="character-count">
                {formData.description.length}/100
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-btn"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;