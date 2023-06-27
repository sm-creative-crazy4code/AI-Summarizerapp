import React from 'react'
import { logo } from '../assets'

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">

        <nav className="flex justify-between items-center w-full mb-10 pt-3">

            <img src={logo} alt='logo'  className='w-28 object-contain'/>

            <button type="button" 
             onClick={()=>window.open(`https://github.com/` )}
            className="black_btn">
             GitHub
            </button>
        </nav>


<h1 className="head_text">
     Summarize Articles with the power of <br  className='max-md:hidden'/>
     <span className="orange_gradient">OpenAI GPT-4</span>
  </h1>
  <h2 className='desc'>
  Effortlessly distill complex texts with our AI Summarizer. Experience instant insights and time-saving efficiency. Unlock the power of artificial intelligence for concise, essential information. Revolutionize your content consumption today.
  </h2>

    </header>
  )
}

export default Hero
