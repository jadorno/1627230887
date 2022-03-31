import React, { useEffect, useState } from 'react';
import axios from "axios";

import Submit from './Vis5-Submit'
import Demographics from './Vis5-Demographics'
import Example01 from './Vis5-Example01'
import Example02 from './Vis5-Example02'
import Example03 from './Vis5-Example03'
import Example04 from './Vis5-Example04'
import Example05 from './Vis5-Example05'
import Example06 from './Vis5-Example06'
import Example07 from './Vis5-Example07'
import Exit from './Vis5-Exit'
import Instructions from './Vis5-Instructions'
import Introduction from './Vis5-Introduction'
import Loading from './Vis5-Loading'
import Question01 from './Vis5-Question01'
import Question02 from './Vis5-Question02'
import QuestionBegin01 from './Vis5-QuestionBegin01'
import QuestionBegin02 from './Vis5-QuestionBegin02'
import Comments from './Vis5-Comments'

export default function Visualization5() {

  const [config, setConfig] = useState([]);
  const [page, setPage] = useState(0);
  const [demographics, setDemographics] = useState(undefined);
  const [comments, setComments] = useState(undefined);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('api/study/config')
      .then((response) => {
        setConfig(response.data)
        setPage(1)
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  const exitPage = () => { 
    setPage(33) 
  }

  const previousPage = () => {
    setPage(page - 1) 
  }

  const nextPage4 = (data) => {
    setPage(page + 1) 
  }

  const nextPage3 = (data) => {
    setComments(data)
    setPage(page + 1) 
  }

  const nextPage2 = (data) => {
    setDemographics(data)
    setPage(page + 1) 
  }

  const nextPage1 = (data) => {
    let tmpQuestions = questions;    

    let response = config[data[1]]
    response.type = data[0]
    response.imgS = undefined
    if(data[2] !== -1){
      response.imgS = data[2]
    }
    response.timestamp1 = data[3]
    response.timestamp2 = Date.now()

    tmpQuestions.push(response)
    setQuestions(tmpQuestions)
    setPage(page + 1) 
  }

  const renderSwitch = () => { 
    switch(page) {
      case 0: return(<Loading />);
      case 1: return(<Introduction previousPage={ exitPage.bind(this) } nextPage={ nextPage4.bind(this) } />);
      case 2: return(<Instructions nextPage={ nextPage4.bind(this) } />);
      case 3: return(<Example01 previousPage={ previousPage.bind(this) } nextPage={ nextPage4.bind(this) } />);
      case 4: return(<Example02 previousPage={ previousPage.bind(this) } nextPage={ nextPage4.bind(this) } />);
      case 5: return(<Example04 previousPage={ previousPage.bind(this) } nextPage={ nextPage4.bind(this) } />);
      case 6: return(<Example05 previousPage={ previousPage.bind(this) } nextPage={ nextPage4.bind(this) } />);
      case 7: return(<QuestionBegin01 previousPage={ previousPage.bind(this) } nextPage={ nextPage4.bind(this) } />);
      case 8: return(<Question01 qIndex={0} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 9: return(<Question01 qIndex={1} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 10: return(<Question01 qIndex={2} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 11: return(<Question01 qIndex={3} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 12: return(<Question01 qIndex={4} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 13: return(<Question01 qIndex={5} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 14: return(<Question01 qIndex={6} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 15: return(<Question01 qIndex={7} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 16: return(<Question01 qIndex={8} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 17: return(<Question01 qIndex={9} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 18: return(<Question01 qIndex={10} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 19: return(<Question01 qIndex={11} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 20: return(<Example03 nextPage={ nextPage4.bind(this) } />);
      case 21: return(<Example06 previousPage={ previousPage.bind(this) } nextPage={ nextPage4.bind(this) } />);
      case 22: return(<Example07 previousPage={ previousPage.bind(this) } nextPage={ nextPage4.bind(this) } />);
      case 23: return(<QuestionBegin02 previousPage={ previousPage.bind(this) } nextPage={ nextPage4.bind(this) } />);
      case 24: return(<Question02 qIndex={12} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 25: return(<Question02 qIndex={13} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 26: return(<Question02 qIndex={14} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 27: return(<Question02 qIndex={15} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 28: return(<Question02 qIndex={16} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 29: return(<Question02 qIndex={17} data={ config } nextPage={ nextPage1.bind(this) } />);
      case 30: return(<Demographics nextPage={ nextPage2.bind(this) } />);
      case 31: return(<Comments nextPage={ nextPage3.bind(this) } />);
      case 32: return(<Submit data={{'demographics': demographics, 'comments': comments, 'questions': questions}} />); 
      case 33: return(<Exit />);
      default: return(<div><h2>Internal Error</h2></div>);
    }
  }
  return(renderSwitch());
}


