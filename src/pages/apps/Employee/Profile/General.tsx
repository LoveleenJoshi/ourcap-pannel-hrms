import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col ,Form} from 'react-bootstrap';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../../../config';
import BASE_URL from '../../../../Base_URL/base_url';
// dummy data
// import { bank } from './data';
interface Personal {
   Full_Name: string;
    Gender: string;
    Date_of_Birth: string;
    Marital_Status: string;
    Nationality: string;
    National_ID_Number: string;
    Personal_Tax_ID: string;
    Email_Address: string;
    Phone_Number: string;
}

interface GeneralProps {
    personalData: Personal;
    setPersonalData: React.Dispatch<React.SetStateAction<Personal>>
   
}

interface Address {
    Primary_Address: string;
    Country: string;
    City: string;
    State: string;
    Postal_Code: string;
}

interface AddressProp {
    addressData: Address;
    setAddressData: React.Dispatch<React.SetStateAction<Address>>
}

interface Emergency {
    Full_Name: string;
    Relationship: string;
    Phone_Number: string;
}
interface Bank{
    Bank_Name: string;
    Account_Name: string;
    Branch: string;
    Account_Number: string;
    SWIFT: string;
    PAN: string;
    IFSC: string;
}
    interface BankProp{
    bankData:Bank
    setBankDetailsData:React.Dispatch<React.SetStateAction<Bank>>
    }
interface EmergencyProp{
    emergancyData:Emergency
    setEmergencyData: React.Dispatch<React.SetStateAction<Emergency>>
}
const General: React.FC<GeneralProps & AddressProp & EmergencyProp & BankProp> = ({
    personalData,
    setPersonalData,
    addressData,
    setAddressData,
    emergancyData,
    setEmergencyData,
    bankData,
    setBankDetailsData
}: GeneralProps & AddressProp & EmergencyProp & BankProp) => {
    const {register,handleSubmit}=useForm();
    const [isPersonalEditing,setPersonalIsEditing]=useState(false);
    const [isAddressEditing,setAddressIsEditing]=useState(false);
    const [isEmergencyEditing,setEmergencyIsEditing]=useState(false);
    const [updatedData,setUpdatedData]=useState({...personalData});
    const [updatedAddress,setUpdatedAddress]=useState({...addressData});
    const [updateEmergency,setUpdateEmergency]=useState({...emergancyData});
    const [updateBankDetails,setUpdateBankDetails]=useState({...bankData});
    const [isBankEditing,setIsBankEditing]=useState(false);

    const handleEditClick = () => {
        setPersonalIsEditing(true);
        setUpdatedData({ ...personalData }); 
    };
    function handlePersonalCancelClick(){
        setPersonalIsEditing(false);
        setUpdatedData({...personalData})
        console.log(personalData)
    }
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setUpdatedData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };
    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value !== undefined ? value : ""  // Default to empty string if undefined
        }));
    };
    
    
    
    
   
    const onPersonalSubmit = async () => {
        try {
            console.log('Sending request...');
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            };
    
            const formData = new FormData();
           
            formData.append('name', updatedData.Full_Name);
            formData.append('email', updatedData.Email_Address);
            formData.append('contact_number', updatedData.Phone_Number);
            formData.append('gender', updatedData.Gender);
            formData.append('marital_status', updatedData.Marital_Status);
            formData.append('date_of_birth', updatedData.Date_of_Birth);
           
            formData.append('national_id_number', updatedData.National_ID_Number);
           
            formData.append('nationality', updatedData.Nationality);
            console.log(formData)
            // FormData.append("",updatedData.Personal_Tax_ID)
           
    
            // If you have a file input in your form, you can append it like this:
            // formData.append('profile_images', file);
    
            const response = await fetch(`${BASE_URL}/api/profile/update`, {
                method: 'POST',
                headers: headers,
                body: formData
            });
            console.log('Response:', response);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log(responseData);
            alert(responseData.message)
    
            // setUpdatedData(responseData);
            // setUpdatedData({
            //     ...updatedData,
            //     ...responseData.data // Assuming responseData contains the updated data
            // });
            setPersonalData(updatedData);
            setUpdatedData(prevState => ({
                ...prevState,
                ...responseData.data // make sure responseData.data has the correct structure
            }));
            
        
        }
         catch (error) {
            console.error('Error updating personal info:', error);
        } finally {
            setPersonalIsEditing(false);
        }
    };



    ///////////////////////////Address Update////////////////
    const handleAddressEditClick = () => {
        setAddressIsEditing(true);
        setUpdatedAddress({ ...addressData });
    };
    const handleAddressCancelClick=()=>{
        setAddressIsEditing(false);
        // Reset updatedData to addressData
        setUpdatedAddress({ ...addressData });
    }
    const handleAddressChange=async(e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setUpdatedAddress((prevData) => ({
            ...prevData,
            [name]: value !== undefined ? value : "" 
        }));
    }
    const onAddressSubmit=async()=>{
        try {
            console.log('Sending request...');
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${config.API_TOKEN}`
            };
    
            const formData = new FormData();
           
            formData.append('primary_address', updatedAddress.Primary_Address);
            formData.append('country_name', updatedAddress.Country);
            formData.append('state_name', updatedAddress.State);
            formData.append('city_id', updatedAddress.City);
            formData.append('postal_code', updatedAddress.Postal_Code);
           
            console.log(formData)
            // FormData.append("",updatedData.Personal_Tax_ID)
           
    
            // If you have a file input in your form, you can append it like this:
            // formData.append('profile_images', file);
    
            const response = await fetch(`${BASE_URL}/api/add-update-address`, {
                method: 'POST',
                headers: headers,
                body: formData
            });
            console.log('Response:', response);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
            console.log(responseData);
            alert(responseData.message)
    
            // setUpdatedData(responseData);
            // setUpdatedData({
            //     ...updatedData,
            //     ...responseData.data // Assuming responseData contains the updated data
            // });
            setAddressData(updatedAddress);
           setUpdatedAddress(prevState => ({
                ...prevState,
                ...responseData.data // make sure responseData.data has the correct structure
            }));
            
        
        }
         catch (error) {
            console.error('Error updating personal info:', error);
        } finally {
            setAddressIsEditing(false);
        }

    }
    

    ///////////////////////////Emergency//////////
    const handleEmergencyEditClick =()=>{
        setEmergencyIsEditing(true);
       setUpdateEmergency({... emergancyData})
    }

    const handleEmergencyCancelClick=()=>{
        setEmergencyIsEditing(false)
        setUpdateEmergency({... emergancyData})
    }

    const onEmergencySubmit=async ()=>{
        try{
         console.log("Sending requests");
         const headers={
           "Accept":"application/json",
           "Authorization":`Bearer ${config.API_TOKEN}`
         }
        const formData = new FormData();
        formData.append("emergency_contact_name",updateEmergency.Full_Name);
        formData.append("relation",updateEmergency.Relationship);
        formData.append("emergency_contact_number",updateEmergency.Phone_Number)
        console.log(formData);
        const response=await fetch(`${BASE_URL}/api/emergency-detail`,{
            method:"POST",
            headers:headers,
            body:formData
        });
        console.log("response :" ,response);
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
       const responseData=await response.json();
       alert(responseData.message)
        
        
        setEmergencyData(updateEmergency);
        setUpdateEmergency(prevData=>({
           ...prevData,
           ...responseData.data
        })
           
        )
    }
    
    catch(err){
        console.error('Error updating personal info:', err);
    }
    finally{
        setEmergencyIsEditing(false)
    }
   }
    const handleEmergencyChange=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const{name,value}=e.target;
    setUpdateEmergency((prevData=>({
    ...prevData,
    [name]:value!==undefined?value:''
    })))
    }


    ////////////////////Bank info/////////////////
    const handEditBankDetails=()=>{
        setUpdateBankDetails({...bankData})
        setIsBankEditing(true)
    }


    const handleCancelBankDetails=()=>{
        setUpdateBankDetails({...bankData})
        setIsBankEditing(false)
    }

    const onBankDetailsSubmit=async()=>{
        try{
         
            console.log("Sending requests");
         const headers={
           "Accept":"application/json",
           "Authorization":`Bearer ${config.API_TOKEN}`
         }
        const formData = new FormData();
        formData.append("name",updateBankDetails.Bank_Name);
        formData.append("branch",updateBankDetails.Branch);
        formData.append("shift_bic",updateBankDetails.SWIFT);
        formData.append("account_holder_name",updateBankDetails.Account_Name);
        // formData.append("account_number",updateBankDetails.Account_Name);
        formData.append("pan_number",updateBankDetails.PAN);
        formData.append("ifsc_code",updateBankDetails.IFSC);
        console.log(formData);
        const response=await fetch(`${BASE_URL}/api/add-update-bank-details`,{
            method:"POST",
            headers:headers,
            body:formData
        });
        console.log("response :" ,response);
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
       const responseData=await response.json();
       alert(responseData.message)
        
        
       setBankDetailsData(updateBankDetails);
       setUpdateBankDetails(prevData=>({
           ...prevData,
           ...responseData.data
        })
           
        )
        }
        catch(err){
            console.error('Error updating personal info:', err);
        }
        finally{
        setIsBankEditing(false)
        }
    }

    const handleBankChange=async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const{name,value}=e.target;
        setUpdateBankDetails((prevData=>({
        ...prevData,
        [name]:value!==undefined?value:''
        })))
    }
    return (
        <>
            <Card key="personal-info">
                <Card.Body>
                    {!isPersonalEditing && (<Button variant='outline-primary' className="btn-sm waves-effect waves-light float-end" onClick={handleEditClick}>
                        <i className="mdi mdi-pencil"></i> Edit
                    </Button>)}
                    {isPersonalEditing && (
                         <div className="d-flex justify-content-end">
                         <Button  className="me-2 btn btn-light" onClick={handlePersonalCancelClick}>
                             Cancel
                         </Button>
                         <Button variant="primary" onClick={handleSubmit(onPersonalSubmit)}>
                             Save
                         </Button>
                     </div>
                    )}
                    <h4 className="header-title mb-3">Personal Info</h4>
                    <Row key="personal-info-rows">
                        {Object.entries(personalData).map(([key, value]) => (
                            <Row className='font-14' key={`personal-${key}`}>
                                <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col>
                                <Col xs={6} className='mb-1'>
                    {isPersonalEditing ? (
                        <Form.Control 
                            type="text" 
                            name={key} 
                            value={updatedData[key as keyof Personal] || ""} // Bind to updatedData instead of value directly
                            onChange={handlePersonalChange} 
                        />
                    ) : (
                        value
                    )}
                </Col>

                            </Row>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
            <Card key="address">
                <Card.Body>
                    {!isAddressEditing && (
                        <Button variant='outline-primary' className="btn-sm waves-effect waves-light float-end" onClick={handleAddressEditClick}>
                            <i className="mdi mdi-pencil"></i> Edit
                        </Button>
                    )}
                    {isAddressEditing && (
                        <div className="d-flex justify-content-end">
                            <Button  className="me-2 btn btn-light" onClick={handleAddressCancelClick}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleSubmit(onAddressSubmit)}>
                                Save
                            </Button>
                        </div>
                    )}
                    <h4 className="header-title mb-3">Address</h4>
                    <Row key="address-rows">
                        {Object.entries(addressData).map(([key, value]) => (
                            <Row className='font-14' key={`address-${key}`}>
                                <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col>
                                <Col xs={6} className='mb-1'>
                                    {isAddressEditing ? (
                                        <Form.Control
                                            type="text"
                                            name={key}
                                            value={updatedAddress[key as keyof Address] || ""} // Bind to updatedData instead of value directly
                                            onChange={handleAddressChange}
                                        />
                                    ) : (
                                        value
                                    )}
                                </Col>
                            </Row>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
            <Card key="emergency-contact">
                <Card.Body>
                   {!isEmergencyEditing && 
                   ( <Button variant='outline-primary' className="btn-sm waves-effect waves-light float-end" onClick={handleEmergencyEditClick}>
                    <i className="mdi mdi-pencil"></i> Edit
                </Button>)}

                {isEmergencyEditing  && (
                   <div  className='d-flex justify-content-end'>
                     <Button  className="me-2 btn btn-light"
                      onClick={handleEmergencyCancelClick}>Cancel</Button>
                        <Button variant="primary" className="me-2"
                     onClick={handleSubmit(onEmergencySubmit)}>save</Button>
                   </div>
                )}
                    <h4 className="header-title mb-3">Emergency Contact</h4>
                    <Row key="emergency-rows">
                      
                                {Object.entries(emergancyData).map(([key, value]) => (
                                    <Row className='font-14' key={`emergency-${key}`}>
                                        <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col>
                                        <Col xs={6} className='mb-1'>{
                                        isEmergencyEditing ? (
                                            <Form.Control
                                            type="text"
                                            name={key}
                                            value={updateEmergency[key as keyof Emergency] || ""} // Bind to updatedData instead of value directly
                                            onChange={handleEmergencyChange}
                                        />
                                        ):(value)
                                        
                                    }</Col>
                                    </Row>
                                ))}
                            
                        
                    </Row>
                </Card.Body>
            </Card>
            <Card key="bank-info">
                <Card.Body>
                    {
                        (!isBankEditing)&&(
                            <Button variant='outline-primary'
                            onClick={handEditBankDetails} className="btn-sm waves-effect waves-light float-end">
                        <i className="mdi mdi-pencil"></i> Edit
                    </Button>
                        )
                    }
                    {
                        (isBankEditing) && (
                          <div className='d-flex justify-content-end'>
                              <Button  className="me-2 btn btn-light" onClick={handleCancelBankDetails}>cancel</Button>
                            <Button variant="primary" className="me-2"  onClick={handleSubmit(onBankDetailsSubmit)}>save</Button>
                          </div>
                        )
                    }
                    <h4 className="header-title mb-3">Bank Info</h4>
                    <Row key="bank-rows">
                       
                                {Object.entries(bankData).map(([key, value]) => (
                                    <Row className='font-14' key={`bank-${key}`}>
                                        <Col xs={6} className='text-secondary pr-0'>{key.split('_').join(' ')}</Col>
                                        <Col xs={6} className='mb-1'>{
                                    (isBankEditing)?
                                        (
                                            <Form.Control
                                            type="text"
                                            name={key}
                                            value={updateBankDetails[key as keyof Bank] || ""} // Bind to updatedData instead of value directly
                                            onChange={handleBankChange}
                                        />
                                        ):(value)
                                            }</Col>
                                    </Row>
                                ))}
                            
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default General;
