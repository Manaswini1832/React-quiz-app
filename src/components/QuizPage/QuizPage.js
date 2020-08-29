import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./QuizPage.css";

export default function QuizPage() {
  //displayData is an array of objects
  //Each object has a question, array of options, correct answer & question number
  const [displayData, setDisplayData] = useState([]);
  const [correctIndices, setCorrectIndices] = useState([]);
  const [showResultBtn, setShowResultBtn] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [numberOfCorrect, setNumberOfCorrect] = useState(0);
  const [numberOfAtt, setNumberOfAtt] = useState(0);

  let propToResults;
  let numCorrect = 0;
  let attempted = 0;
  let userIndices = [];
  const [ques1, setQues1] = useState(5);
  const [ques2, setQues2] = useState(5);
  const [ques3, setQues3] = useState(5);
  const [ques4, setQues4] = useState(5);
  const [ques5, setQues5] = useState(5);
  const [ques6, setQues6] = useState(5);
  const [ques7, setQues7] = useState(5);
  const [ques8, setQues8] = useState(5);
  const [ques9, setQues9] = useState(5);
  const [ques10, setQues10] = useState(5);

  useEffect(() => {
    getData();
  }, []);

  const url =
    "https://opentdb.com/api.php?amount=10&type=multiple&encode=base64";

  async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    data.results.forEach((result, index) => {
      let ques = atob(result.question);
      let correct_ans = atob(result.correct_answer);
      let incorrect_ans = result.incorrect_answers;
      let properIncorrectAns = []; //Stores incorrect answers which are properly encoded
      for (let i = 0; i < incorrect_ans.length; i++) {
        properIncorrectAns.push(atob(incorrect_ans[i]));
      }
      //This function is to shuffle the options array
      function shuffle(array) {
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
      const options = shuffle([correct_ans, ...properIncorrectAns]);

      setCorrectIndices((prevIndex) => {
        return [...prevIndex, options.indexOf(correct_ans)];
      });

      //This is an object with question, array of options and correct answer
      let partToBePut = {
        question: ques,
        options: options,
        correct_answer: correct_ans,
        correct_index: options.indexOf(correct_ans),
        questionNumber: index + 1,
      };
      // console.log(partToBePut);

      setDisplayData((prevData) => {
        return [...prevData, partToBePut];
      });
    });
  }

  function handleChange(e) {
    const parentId = e.target.parentNode.id;
    const parentClass = e.target.parentNode.className;

    let optionNumber;
    if (parentClass === "option1-div") {
      optionNumber = 0;
      setOptions();
    } else if (parentClass === "option2-div") {
      optionNumber = 1;
      setOptions();
    } else if (parentClass === "option3-div") {
      optionNumber = 2;
      setOptions();
    } else if (parentClass === "option4-div") {
      optionNumber = 3;
      setOptions();
    }

    function setOptions() {
      if (parentId === "1") {
        setQues1(optionNumber);
      } else if (parentId === "2") {
        setQues2(optionNumber);
      } else if (parentId === "3") {
        setQues3(optionNumber);
      } else if (parentId === "4") {
        setQues4(optionNumber);
      } else if (parentId === "5") {
        setQues5(optionNumber);
      } else if (parentId === "6") {
        setQues6(optionNumber);
      } else if (parentId === "7") {
        setQues7(optionNumber);
      } else if (parentId === "8") {
        setQues8(optionNumber);
      } else if (parentId === "9") {
        setQues9(optionNumber);
      } else if (parentId === "10") {
        setQues10(optionNumber);
      }
    }
  }

  function handleClick(e) {
    e.preventDefault();
    userIndices.push(ques1);
    userIndices.push(ques2);
    userIndices.push(ques3);
    userIndices.push(ques4);
    userIndices.push(ques5);
    userIndices.push(ques6);
    userIndices.push(ques7);
    userIndices.push(ques8);
    userIndices.push(ques9);
    userIndices.push(ques10);
    giveResults(userIndices, correctIndices);
    setShowResultBtn(true);
    setShowQuestions(false);
  }

  function giveResults(userArray, correctArray) {
    for (let i = 0; i < userArray.length; i++) {
      if (userArray[i] === correctArray[i]) {
        numCorrect += 1;
      }
      if (userArray[i] !== 5) {
        attempted += 1;
      }
    }
    setNumberOfCorrect(numCorrect);
    setNumberOfAtt(attempted);
  }

  return (
    <div className="quiz-page-main-div">
      {showQuestions === true ? (
        <div>
          {displayData.map((eachDisplayData) => {
            return (
              <div className="card">
                <h3 className="question">{eachDisplayData.question}</h3>
                <form className="options-form">
                  <div
                    className="option1-div"
                    id={eachDisplayData.questionNumber}
                  >
                    <input
                      name="op-radio-btn"
                      className="check-input"
                      type="radio"
                      onChange={handleChange}
                    />
                    <label htmlFor="option1">
                      {eachDisplayData.options[0]}
                    </label>
                  </div>

                  <div
                    className="option2-div"
                    id={eachDisplayData.questionNumber}
                  >
                    <input
                      name="op-radio-btn"
                      className="check-input"
                      type="radio"
                      onChange={handleChange}
                    />
                    <label htmlFor="option2">
                      {eachDisplayData.options[1]}
                    </label>
                  </div>

                  <div
                    className="option3-div"
                    id={eachDisplayData.questionNumber}
                  >
                    <input
                      name="op-radio-btn"
                      className="check-input"
                      type="radio"
                      onChange={handleChange}
                    />
                    <label htmlFor="option3">
                      {eachDisplayData.options[2]}
                    </label>
                  </div>

                  <div
                    className="option4-div"
                    id={eachDisplayData.questionNumber}
                  >
                    <input
                      name="op-radio-btn"
                      className="check-input"
                      type="radio"
                      onChange={handleChange}
                    />
                    <label htmlFor="option4">
                      {eachDisplayData.options[3]}
                    </label>
                  </div>
                </form>
              </div>
            );
          })}
          <div className="submit-btn-div">
            <button
              className="quiz-submit-btn"
              type="submit"
              onClick={handleClick}
            >
              Submit quiz
            </button>
          </div>
        </div>
      ) : null}

      {showResultBtn === true ? (
        <div className="results-div">
          <h1 className="results">
            You attempted <span className="resultNum">{numberOfAtt}</span> of
            the 10 questions, out of which you got{" "}
            <span className="resultNum">{numberOfCorrect}</span> question(s)
            right!
          </h1>
          <Link to="/">
            <button className="quiz-submit-btn" type="button">
              Take another quiz
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
