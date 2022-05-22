import React from 'react';
import { Fragment, useState,useEffect, forwardRef } from 'react'
import axios from 'axios'
export const Form = ({ onSubmit }) => {
  useEffect(async () => {
    const reponse=await axios.get('http://localhost:8080/api/getAllExpert');
    if(index==1)
    {
        setData(reponse.data)
        index++
    }},[data]);
    // ** States
    const [data, setData] = useState([])
    let index=1;
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="expert">Expert</label>
        <br/>
        <select id="expert">
          {data.map(o => <option key={o._id} value={o._id}>{o.prenom} {o.nom}</option>)}
        </select>
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
