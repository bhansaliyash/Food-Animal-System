import React, { ChangeEvent, useState } from 'react';
import './App.css';

type FormState = {
  [key: string]: string;
};

const successDiv = (
  <div className="success-msg">
      Success
  </div>
);

const errorDiv =(
  <div className="error-msg">
      Error
  </div>
);

const FarmForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({});
  const [responseData, setResponseData] = useState('');

  const handleFarmSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    console.log(formData);
    const response = await fetch('http://localhost:8000/farm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
      
    if (!response.ok) {
        setResponseData("error");
        return
        // throw new Error('Request failed');
    }
    
    setResponseData("success");
    const responseData = await response.json();
    console.log(responseData);
    setFormData({});
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addFarmForm = (
    <form name="farm_add" className="pure-form" onSubmit={handleFarmSubmit}>
        <fieldset>
            {responseData=="success"?successDiv:responseData=="error"?errorDiv:null}
            <input placeholder="Premise Id" name="premise_id" value={formData.premise_id || ''} onChange={handleChange}/>
            <input placeholder="Name" name="name" value={formData.name || ''} onChange={handleChange}/>
            <input placeholder="Address" name="address" value={formData.address || ''} onChange={handleChange}/>
            <input placeholder="City" name="city" value={formData.city || ''} onChange={handleChange}/>
            <input placeholder="State" name="state" value={formData.state || ''} onChange={handleChange}/>
            <input placeholder="Postal Code" name="postal_code" value={formData.postal_code || ''} onChange={handleChange}/>
            <input placeholder="Longitude" name="longitude" value={formData.longitude || ''} onChange={handleChange}/>
            <input placeholder="Latitude" name="latitude" value={formData.latitude || ''} onChange={handleChange}/>
            <input placeholder="Total Population" name="total_population" value={formData.total_population || ''} onChange={handleChange}/>
            <button type="submit" className="pure-button pure-button-primary">Add</button>
        </fieldset>
    </form>

  );

  return (
    <div>
        {addFarmForm}
    </div>
    
  );
};

export default FarmForm;