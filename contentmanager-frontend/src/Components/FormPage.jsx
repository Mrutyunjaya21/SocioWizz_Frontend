import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/FormPage.css';

const FormPage = () => {


  const [formData, setFormData] = useState({
    name: '',
    age: '',
    country: ''
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    const { name: currentName, age: currentAge, country: currentCountry } = { ...formData, [name]: value };
    if (currentName && currentAge && currentCountry) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleSubmit = () => {
    // Redirect to /link page
    navigate('/link');
  };



  return (
    <div className="form-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
          </div>
          <div className="button-container">
            <button type="submit" disabled={isButtonDisabled}>Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormPage;
