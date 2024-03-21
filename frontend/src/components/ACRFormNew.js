import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "../App.css";

const ACRFormNew = () => {
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const formSubmit = (data) => {
    console.log(data);
  };

  //console.log(form);
  return (
    <div className="main-block">
      <form name="report" onSubmit={handleSubmit(formSubmit)} noValidate>
        <div className="info">
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
          <p class="error">{errors.proposal_no?.message}</p>
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
          <p class="error">{errors.product_name?.message}</p>
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
          <p class="error">{errors.proposer_name?.message}</p>
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
          <p class="error">{errors.proposer_occupation?.message}</p>
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
          <p class="error">{errors.proposer_income?.message}</p>
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
          <p class="error">{errors.sp_name?.message}</p>
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
          <p class="error">{errors.sp_certificate_number?.message}</p>
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
          <p class="error">{errors.corporate_agent_name?.message}</p>
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
          <p class="error">{errors.corporate_agent_code?.message}</p>
        </div>
        <button type="submit">Download Pdf</button>
      </form>
      <DevTool control={control} placement="top-left" />
    </div>
  );
};

export default ACRFormNew;
