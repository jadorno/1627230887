import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Visualization5(props) {

  // const [status, setStatus] = useState(0);
  // const [id, setID] = useState(undefined);
  const [status_message, setStatusMessage] = useState("Please wait. Uploading Responses.");

  useEffect(() => {
    let submit_data = {
      questions: props.data.questions,
      demographics: props.data.demographics,
      comments: props.data.comments
    }
    axios.post('api/study/submit', submit_data)
      .then((response) => {
        if(response.status === 200){
          // setID(response.data.id);
          // setStatus(1);
          setStatusMessage("Confirmation Number: "+response.data.id)
        } else {
          console.log(response)
          // setStatus(2);
          setStatusMessage("An error has occurred uploading your submission.")
        }
      })
      .catch((error) => {
        console.log(error);
        // setStatus(2);
      });
  },[props.data])

  return (
      <div className="container">
        <h1>{status_message}</h1>
        <p>Enter this confirmation number in the <u>Amazon Mechanical Turk submission</u>. Please note that if you don&#39;t submit the correct number, we won&#39;t be able to pay you.</p>
      </div>
  );
}
