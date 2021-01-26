import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Bio from './components/Bio'
import Cosplays from './components/Cosplays'
import Conventions from './components/Conventions'

import {Auth, Hub } from "aws-amplify"
const initialFormState = {
  username: "", password: "", email: "", authCode: "", formType: "signUp"
}
function App() {
  const [formState, updateFormState] = useState(initialFormState)
  const [user, updateUser] = useState(null)
  async function checkUser(){
    try {
      const user = await Auth.currentAuthenticatedUser()
      updateUser(user)
      updateFormState(() => ({...formState, formType: "signedIn"}))
      console.log(user)
    } catch {
      updateUser(null)
    }
  }
  async function setAuthListener(){
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
            console.log('user signed in');
            break;
        case 'signOut':
          console.log(("data from event: ", data))
          updateFormState(() => ({...formState, formType: "signUp"}))
            break;
        default:
          break
    }});
    
  }
  useEffect(() => {
    checkUser()
    setAuthListener()
  }, [])
  function onChange(e){
    e.persist()
    updateFormState(() => ({...formState, [e.target.name]: e.target.value}))
  }
  const {formType} = formState
  async function signUp() {
    const {username, email, password } = formState
    await Auth.signUp({username, password, attributes: {email}})
    updateFormState(() => ({...formState, formType: "confirmSignUp"}))
  }
  async function confirmSignUp() {
    const {username, authCode} = formState
    await Auth.confirmSignUp(username, authCode)
    updateFormState(() => ({...formState, formType: "signIn"}))
  }
  async function signIn() {
    const {username, password} = formState
    await Auth.signIn(username, password)
    updateFormState(() => ({...formState, formType: "signedIn"}))
  }
  return (
    <div classNameName="App">
      <Header />
      {
        formType === "signUp" && (
          <div>
            <input name="username" onChange={onChange} placeholder="username" />
            <input name="password" type=" password" onChange={onChange} placeholder="password" />
            <input name="email" onChange={onChange} placeholder="email" />
            <button onClick={signUp}>Sign Up</button>
            <button onClick={() => updateFormState(() => ({
              ...formState, formType: "signIn"
            }))}>Sign In</button>
          </div>
        )
      }
      {
        formType === "signIn" && (
          <div>
            <input name="username" onChange={onChange} placeholder="username" />
            <input name="password" type=" password" onChange={onChange} placeholder="password" />
            <button onClick={signIn}>Sign In</button>
          </div>
        )
      }
      {
        formType === "confirmSignUp" && (
          <div>
            <input name="authCode" type=" password" onChange={onChange} placeholder="Confirmation code" />
            <button onClick={confirmSignUp}>Confirm Sign Up</button>
          </div>
        )
      }
      {
        formType === "signedIn" && (
          <div>
            <h1>Hello world, welcome user.</h1>
            <button onClick={
            () => Auth.signOut()
            }>Sign Out</button>
          </div>
        )
      }
          {user &&
          (<div>
            <Bio />
            <Cosplays />
            <Conventions />
          </div>)}
    </div>
  );
}

export default App;
