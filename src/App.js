import './index.scss';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const questions = [
  {
    title: 'React - is ... ?',
    variants: ['Library', 'Framework', 'Application'].sort((a, b) => 0.5 - Math.random()),
    correct: 'Library',
    correctIndex: '',
  },
  {
    title: 'Component - is ... ',
    variants: ['Application', 'Segment of application or website', 'Property'].sort((a, b) => 0.5 - Math.random()),
    correct: 'Segment of application or website',
    correctIndex: '',
  },
  {
    title: 'What is JSX?',
    variants: [ 'It\'s simply HTML', 'It\s function', 'It\'s like a HTML, but with opportunity to implement JS-code',].sort((a, b) => 0.5 - Math.random()),
    correct: 'It\'s like a HTML, but with opportunity to implement JS-code',
    correctIndex: '',
  },
];

for(let i = 0; i <questions.length; i++){
  let temp = questions[i];
  detectCorrect(i, temp.correct)
}

function detectCorrect(num, ans) {
   
   let currentQ = questions[num];
   currentQ["correctIndex"] = currentQ.variants.indexOf(ans);
  
   return currentQ["correctIndex"]
 }




function Result({ correct }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/5511/5511415.png" />
      <h2>You answered correctly {correct} of {questions.length}</h2>
      <a href="/">
        <button>Try again</button>
      </a>

    </div>
  );
}

function Game({ step, question, onClickVariant }) {
  const percentage = Math.round(step / questions.length * 100);

  

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>

      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((item, index) => (
          <li onClick={() => onClickVariant(index)} key={item}> {item} </li>))}

      </ul>

    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  var question = questions[step];


  const notifyCorrect = () => toast.success('Correct!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });;

  const notifyUncorrect = () => toast.error('Miss...', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });


  const onClickVariant = (index) => {
    console.log(step, index);
    setStep(step + 1)


    if (index == question.correctIndex) {
      setCorrect(correct + 1)
      notifyCorrect();
    } else notifyUncorrect();
  }
  return (

    <div className="App">
      <ToastContainer />

      {

        step != questions.length ? (<Game step={step} question={question} onClickVariant={onClickVariant} />
        ) : (<Result correct={correct} />)
      }



    </div>
  );
}

export default App;