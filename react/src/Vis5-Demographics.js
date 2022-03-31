import React, { useEffect, useState } from 'react';

export default function Visualization5(props) {
  const [age, setAge] = useState(undefined);
  const [gender, setGender] = useState(undefined);
  const [gender_text, setGenderText] = useState(undefined);
  const [corrected_vision, setCorrectedVision] = useState(undefined);
  const [visualization_experience, setVisualizationExperience] = useState(undefined);
  const [gender_textarea, setGenderTextarea] = useState([]);

  const handleChange = (event) => {
    switch(event.target.name) {
      case 'age':
        setAge(event.target.value);
        break;
      case 'gender':
        setGender(event.target.value);
        break;
      case 'gender_text':
        setGenderText(event.target.value);
        break;
      case 'corrected_vision':
        setCorrectedVision(event.target.value);
        break;
      case 'visualization_experience':
        setVisualizationExperience(event.target.value);
        break;
      default:
        console.log('Error Updating '+event.target.name)
      }
  }

  useEffect(() => {
    if(gender === 'gender_text'){
      let tmp = []
      tmp.push(
        <div>
          <br /><br />
          <div className="form-group">
            <label htmlFor="gender_text">Gender Self-Identification</label>
            <input type="text" className="form-control" name="gender_text" id="gender_text" placeholder="enter gender 🏳️‍🌈" value={gender_text} onChange={handleChange.bind(this)}/>
          </div>
        </div>
      )
      setGenderTextarea(tmp)
    }
  },[gender])

  return (
      <div className="container">

        <h1>Participant Demographics</h1>

        <p>Please answer the following questions.</p>


        <label htmlFor="age">What is your age?</label>
        <br />
        <select className="form-control" name="age" id="age" value={age} onChange={handleChange.bind(this)}>
          <option value="age_null"></option>
          <option value="age_01">under 18 years</option>
          <option value="age_02">18-24 years</option>
          <option value="age_03">25-34 years</option>
          <option value="age_04">35-44 years</option>
          <option value="age_05">45-54 years</option>
          <option value="age_06">55-64 years</option>
          <option value="age_07">65+ years</option>
        </select>

        <br /><br />

        <label htmlFor="gender">What is your gender?</label>
        <br />
        <select className="form-control" name="gender" id="gender" value={gender} onChange={handleChange.bind(this)}>
          <option value="gender_null"></option>
          <option value="gender_m">Man</option>
          <option value="gender_w">Woman</option>
          <option value="gender_x">Nonbinary or Genderqueer</option>
          <option value="gender_text">Prefer to self identify</option>
          <option value="gender_no">Prefer not to say</option>
        </select>

        {gender_textarea}

        <br /><br />

        <label htmlFor="corrected_vision">Do you have corrected vision? (glasses or contact lenses)</label>
        <br />
        <select className="form-control" name="corrected_vision" id="corrected_vision" value={corrected_vision} onChange={handleChange.bind(this)}>
          <option value="corrected_null"></option>
          <option value="corrected_y">Yes</option>
          <option value="corrected_n">No</option>
        </select>

        <br /><br />

        <label htmlFor="visualization_experience">How much experience do you have creating or using data visualizations?</label>
        <br />
        <select className="form-control" name="visualization_experience" id="visualization_experience" value={visualization_experience} onChange={handleChange.bind(this)}>
          <option value="experience_null"></option>
          <option value="experience_01">No Experience</option>
          <option value="experience_02">Little Experience</option>
          <option value="experience_03">Some Experience</option>
          <option value="experience_04">Casual Experience</option>
          <option value="experience_05">Extensive Experience</option>
        </select>

        <br /><br />
         <div className="text-center">
          <button type="button" className="btn btn-primary" style={{ width: '100px' }} onClick={() => {props.nextPage({"age": age, "gender": gender, "gender_text": gender_text, "corrected_vision": corrected_vision, "visualization_experience": visualization_experience, "gender_textarea": gender_textarea})}}>Next</button>
        </div>
      </div>
  );
}










