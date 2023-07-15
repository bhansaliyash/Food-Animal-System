import React, { ChangeEvent, useState } from 'react';
import './App.css';

type FormState = {
  [key: string]: string;
};

const MovementForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({});
  const [responseData, setResponseData] = useState('');

  const handleMovementSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    console.log( JSON.stringify(formData));
    const response = await fetch('http://localhost:8000/movement/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
      
    if (!response.ok) {
        setResponseData("error");
        return
    }
    
    setResponseData("success")
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

  const addMovementForm =(
    <form className="pure-form" onSubmit={handleMovementSubmit}>
      <fieldset>
          {responseData=="success"?successDiv:responseData=="error"?errorDiv:null}
          <input placeholder="Company" name="company" value={formData.company  || ''} onChange={handleChange}/>
          <input placeholder="Origin Premise Id" name="origin_premise_id" value={formData.origin_premise_id  || ''} onChange={handleChange}/>
          <input placeholder="Destination Premise Id" name="dest_premise_id" value={formData.dest_premise_id  || ''} onChange={handleChange}/>
          <input placeholder="Species" name="species" value={formData.species  || ''} onChange={handleChange}/>
          <input placeholder="Shipment Start Date" name="shipment_start_date" value={formData.shipment_start_date  || ''} onChange={handleChange}/>
          <input placeholder="Items Moved" name="items_moved" value={formData.items_moved  || ''} onChange={handleChange}/>
          <input placeholder="Reason" name="reason" value={formData.reason  || ''} onChange={handleChange}/>
          <button type="submit" className="pure-button pure-button-primary">Add</button>
      </fieldset>
    </form>
  );

  return (
    <div>
        {addMovementForm}
    </div>
    
  );
};

export default MovementForm;