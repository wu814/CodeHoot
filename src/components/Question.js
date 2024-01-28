import React, {useEffect, useState} from 'react'
import "./css/Question.css"
import Landing from "./codeEditor/Landing"
import CountDownTimer from "./CountDownTimer"
import { addDoc, collection, getDocs, updateDoc,  } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"
import { useNavigate } from 'react-router-dom';


const Question = () => {

  return (
    <div>
      <Landing />
    </div>
  );
};

export default Question