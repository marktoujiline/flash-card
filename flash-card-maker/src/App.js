import React from 'react'
import useForm from 'react-hook-form';
import data from './data.json';
import './App.css';

export default function App() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => { 
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
      {data.map(
        (flashcard, i) => <div key={i} >

          <h1>Flashcard {i}</h1>
          <h2>Front</h2>
          <span>Text: </span><input name={`front_${i}`} defaultValue={flashcard.front.text} ref={register}></input>
          <span>Code: </span><textarea name={`front_${i}`} defaultValue={flashcard.front.code} ref={register}></textarea>
          <h2>Back</h2>
          <span>Text: </span><input name={`back_${i}`} defaultValue={flashcard.back.text} ref={register}></input>
          <span>Code: </span><textarea name={`back_${i}`} defaultValue={flashcard.back.code} ref={register}></textarea>
        </div>
      )}
      <input name="example" defaultValue="test" ref={register} />
      <input type="submit" />
    </form>
  )
}
