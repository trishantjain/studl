import { useState } from "react"
import QuesContext from "./quesContext"

const QuesState = (props) => {

  const host = "http://localhost:5000"
  const quesinitial = []

  const [question, setQuestion] = useState(quesinitial)

  //* Function: - Get all questions asked by the particular user 
  const getQues = async () => {
    const response = await fetch(`${host}/ques/fetchallques`, {
      method: "GET",
      headers: {
        'Content-Type': 'applicaton/json',
        'auth-token': localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setQuestion(json);
  }

  //* Function: - For adding Question asked by the user
  const addQues = async (ques) => {
    const response = await fetch(`${host}/ques/addques`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ ques })
    });

    // Updating note in frontend        
    const user_question = await response.json();
    setQuestion(question.concat(user_question))
  }


  return (
    <div>
      <QuesContext.Provider value={{ question, getQues, addQues }}>
        {props.children}
      </QuesContext.Provider>
    </div>
  )
}

export default QuesState
