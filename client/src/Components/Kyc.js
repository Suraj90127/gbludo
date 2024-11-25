import React, { useEffect, useState } from 'react'
import { kyc } from '../store/reducer/authReducer';
import { useDispatch } from 'react-redux';

const Kyc = () => {

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');

  
  const dispatch = useDispatch()
  

  
  const handleSubmit = async () => {
      const formData = new FormData();
      formData.append("image1", image1);
      formData.append("image2", image2);
     
      // Dispatch updateStatus action with formData
      await dispatch(kyc(formData)).then((response) => {   
        
          if(response.payload.success){
              alert(response.payload.message)       
          }else{
              alert(response.payload.message)
          }
          // navigate("/")  // You might want to uncomment this once debugging is done
      });
  };
  

  const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImage1(file);    
  };
  const handleImageChange2 = (event) => {
      const file = event.target.files[0];
      setImage2(file);    
  };

 
  return (
    <div className='w-[100%] mt-[70px]'>
      <div className="p-6 bg-card rounded-lg shadow-md">
              <h2 className="text-md font-semibold text-black">Step 3 of 3</h2>
              <p className="text-gray text-[0.8rem]">Upload photo of updated_document_name: updated_document_number</p>
              <p className="mt-2 text-gray text-[0.8rem]">
                Please Enter your <strong>Name, Birthdate</strong> and <strong>Document number</strong> are clearly visible in the document photo. (only 5 min kyc complete)
              </p>
              <div className="mt-4">
                <label className="block text-muted-foreground">Choose File</label>
                <input type="file" onChange={handleImageChange} accept="image/*" className="mt-1 block w-full border border-border rounded-md p-2" />
                <span className="text-muted-foreground">No file chosen</span>
              </div>
              <div className="mt-4">
                <label className="block text-muted-foreground">Choose File</label>
                <input type="file" onChange={handleImageChange2} accept="image/*" className="mt-1 block w-full border border-border rounded-md p-2" />
                <span className="text-muted-foreground">No file chosen</span>
              </div>
              <button className="mt-6 bg-[#007bff] text-white p-2  rounded-sm w-full" onClick={handleSubmit}>COMPLETE</button>
            </div>
    </div>
  )
}

export default Kyc
