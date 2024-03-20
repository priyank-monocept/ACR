import React from 'react'
import {useForm} from "react-hook-form";
import { DevTool } from '@hookform/devtools';
import '../App.css';


const ACRFormNew = () => {
    const form = useForm();
    const {register, control, handleSubmit} = form;

    const formSubmit = (data) =>{
        console.log(data);
    }


    console.log(form);
    return (
    <div className="main-block">
        <form name="report" onSubmit={handleSubmit(formSubmit)} noValidate > 
        <div className="info">
            <input type="text" {...register('proposal_no')} placeholder="Proposal No"  />
            <input type="text" {...register('product_name')} placeholder="Product Name"  />
            <input type="text" {...register('proposer_name')} placeholder="Proposer Name"  />
            <input type="text" {...register('proposer_occupation')} placeholder="Proposal Occupation"  />
            <input type="text" {...register('proposer_income')} placeholder="Proposal Income"   />
            <input type="text" {...register('sp_name')} placeholder="SP Name"  />
        </div>
        <button type="submit">Download Pdf</button>
        </form>
        <DevTool control={control} placement="top-left" />
    </div>
  )
}

export default ACRFormNew   