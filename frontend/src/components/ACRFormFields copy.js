import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { DevTool } from "@hookform/devtools";
import axios from "axios";
const ACRFormFields = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {

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
    });

  };

  const getValidationRules = (options) => ({
    required: { value: true, message: `Enter your ${options.fieldName}` },
    pattern: options.pattern,
  });

  const FormInput = ({ name, placeholder, rules, errors }) => (
    <>
      <div className="input-fields">
        <input
          type="text"
          {...register(name, rules)}
          placeholder={placeholder}
        />
        <span className="error">{errors[name]?.message}</span>
      </div>
    </>
  );
  return (
    <div className="absolute w-screen">
      <form name="report" onSubmit={handleSubmit(formSubmit)} noValidate>
        <div className="info">
          <FormInput
            name="proposal_no"
            placeholder="Proposal No"
            rules={getValidationRules({
              fieldName: "proposal no",
              pattern: {
                value: /^[0-9]*$/,
                message: "Enter only numeric values",
              },
            })}
            errors={errors}
          />

          <FormInput
            name="product_name"
            placeholder="Product Name"
            rules={getValidationRules({
              fieldName: "product name",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Only alphabetic characters allowed",
              },
            })}
            errors={errors}
          />

          <FormInput
            name="proposer_name"
            placeholder="Proposer Name"
            rules={getValidationRules({
              fieldName: "Proposer name",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Only alphabetic characters allowed",
              },
            })}
            errors={errors}
          />

          <FormInput
            name="proposer_occupation"
            placeholder="Proposal Occupation"
            rules={getValidationRules({
              fieldName: "Proposal Occupation",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Only alphabetic characters allowed",
              },
            })}
            errors={errors}
          />

          <FormInput
            name="proposer_income"
            placeholder="Proposal Income"
            rules={getValidationRules({
              fieldName: "Proposal Income",
              pattern: {
                value: /^[0-9]*$/,
                message: "Enter only numeric values",
              },
            })}
            errors={errors}
          />

          <FormInput
            name="sp_name"
            placeholder="SP Name"
            rules={getValidationRules({
              fieldName: "SP Name",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Only alphabetic characters allowed",
              },
            })}
            errors={errors}
          />

          <FormInput
            name="sp_certificate_number"
            placeholder="SP Certificate Number"
            rules={getValidationRules({
              fieldName: "SP Certificate Number",
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: "Only alphanumeric characters allowed",
              },
            })}
            errors={errors}
          />

          <FormInput
            name="corporate_agent_name"
            placeholder="Corporate Agent Name"
            rules={getValidationRules({
              fieldName: "Corporate Agent Name",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Only alphabetic characters allowed",
              },
            })}
            errors={errors}
          />

          <FormInput
            name="corporate_agent_code"
            placeholder="Corporate Agent Code"
            rules={getValidationRules({
              fieldName: "Corporate Agent Code",
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: "Only alphanumeric characters allowed",
              },
            })}
            errors={errors}
          />
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
          <button type="submit">Download Pdf</button>
        </div>
      </form>
      {/* <DevTool control={control} placement="top-left" /> */}
    </div>
  );
};

export default ACRFormFields;
