import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import "../App.css";
import { useState } from "react";

const ACRFormNew = () => {
  const [loading, setLoading] = useState(false); // State for loading indicator
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const formSubmit = (data) => {
    setLoading(true); // Set loading to true when form submits
    axios({
      method: 'post',
      url: '/generate-pdf', // Route on your Node.js server
      responseType: 'blob', //Important
      data, 
    }).then(response => {
      // Create a blob from the response data
     const blob = new Blob([response.data], { type: 'application/pdf' });
      // Create a link element to download the PDF
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'example.pdf'; // File name
      // Append the link to the body
      document.body.appendChild(link);
      // Trigger the download
      link.click();
      // Clean up
      document.body.removeChild(link);
      
     console.log(response);
    }).catch(error => {
      console.error('Error generating PDF:', error);
    }).finally(() => {
      setLoading(false); // Reset loading state after request completes
    });
  };

  //console.log(form);
  return (
    <div className="main-block">
      <form name="report" onSubmit={handleSubmit(formSubmit)} noValidate>
        <div className="info">
        <div className="input-fields">
          <input
            type="text"
            {...register("proposal_no", {
              pattern: {
                value: /^[0-9]*$/,
                message: "Enter only numeric values",
              },
              maxLength: {
                value: 14, // maximum length
                message: "Maximum length is 14 characters",
              },
              required: {
                value: true,
                message: "Enter your proposal no",
              },
            })}
            placeholder="Proposal No"
          />

          <span className="error">{errors.proposal_no?.message}</span>
          </div><div className="input-fields">
          <input
            type="text"
            {...register("product_name", {
              required: {
                value: true,
                message: "Enter your product name",
              },
            })}
            placeholder="Product Name"
          />
          <span className="error">{errors.product_name?.message}</span>
          </div><div className="input-fields">
          <input
            type="text"
            {...register("proposer_name", {
              required: {
                value: true,
                message: "Enter your proposer name",
              },
            })}
            placeholder="Proposer Name"
          />
          <span className="error">{errors.proposer_name?.message}</span>
          </div><div className="input-fields">
          <input
            type="text"
            {...register("proposer_occupation", {
              required: {
                value: true,
                message: "Enter your proposer occupation",
              },
            })}
            placeholder="Proposal Occupation"
          />
          
          <span className="error">{errors.proposer_occupation?.message}</span>
          </div><div className="input-fields">
          <input
            type="text"
            {...register("proposer_income", {
              required: {
                value: true,
                message: "Enter your proposer income",
              },
            })}
            placeholder="Proposal Income"
          />
          <span className="error">{errors.proposer_income?.message}</span>
          </div><div className="input-fields">
          <input
            type="text"
            {...register("sp_name", {
              required: {
                value: true,
                message: "Enter your sp name",
              },
            })}
            placeholder="SP Name"
          />
          <span className="error">{errors.sp_name?.message}</span>
          </div><div className="input-fields">
          <input
            type="text"
            {...register("sp_certificate_number", {
              required: {
                value: true,
                message: "Enter your sp certificate number",
              },
            })}
            placeholder="SP Certificate Number"
          />
          <span className="error">{errors.sp_certificate_number?.message}</span>
          </div><div className="input-fields">
          <input
            type="text"
            {...register("corporate_agent_name", {
              required: {
                value: true,
                message: "Enter your corporate agent name",
              },
            })}
            placeholder="Corporate Agent Name"
          />
          <span className="error">{errors.corporate_agent_name?.message}</span>
          </div><div className="input-fields">
          <input
            type="text"
            {...register("corporate_agent_code", {
              required: {
                value: true,
                message: "Enter your corporate agent code",
              },
            })}
            placeholder="Corporate Agent Code"
          />
          <span className="error">{errors.corporate_agent_code?.message}</span>
          </div>
          <div className="input-fields">
            <Controller
              name="policy_date"
              control={control}
              rules={{ required: "Select policy date" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select Policy Date"
                />
              )}
            />
            <span className="error">{errors.policy_date?.message}</span>
          </div>
        </div>
        <div className="submit-button">
         {/* Conditionally render loader if loading */}
         {loading ? (
            <div>Loading...</div>
          ) : (
            <button type="submit">Download Pdf</button>
          )} 
       
        </div>
      </form>
      
    </div>
  );
};

export default ACRFormNew;
