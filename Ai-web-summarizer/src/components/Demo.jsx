import React from 'react'
import { useState,useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {


    const [article,setArticle] = useState({
        url:"",
        summary:""
    })

    const [allArticles,setAllArticles] = useState([])

    
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    const [copied,setCopied] = useState("")


    useEffect(()=>{
     const articlesFromLocalStorage =JSON.parse(localStorage.getItem('articles'));

     if (articlesFromLocalStorage){
        setAllArticles(articlesFromLocalStorage)
     }

    },[])



    const handleCopy=(copyUrl)=>{
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl)
        setTimeout(() =>setCopied(false),3000)

      }



    const handleSubmit =async(e) => {
         
        e.preventDefault();
        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.summary) {
          const newArticle = { ...article, summary: data.summary };
          const updatedAllArticles = [newArticle, ...allArticles];


          setArticle(newArticle)
          setAllArticles(updatedAllArticles)
          localStorage.setItem('articles',JSON.stringify(updatedAllArticles))
          
    
            // console.log(newArticle);
        }


     

    }


     
  return (
    <section className='mt-16 w-full max-w-xl  ' >
   <div className="flex flex-col w-full gap-2">
     <form className='relative justify-center items-center' onSubmit={handleSubmit}>
    
    <img className='absolute left-0 my-2 ml-3 w-5' src={linkIcon} />
     <input className="url_input peer" type="url" placeholder='Enter a URL'  value={article.url} onChange={(e)=>setArticle({...article,url:e.target.value})} required  />


   <button type="Submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700" >Go</button>
     </form>


     <div className="flex flex-col gap-1 max-h-60 overflow-y-auto "></div>
         {
            allArticles.map((item,index)=>(
                <div key={`link-${index}`} className='link_card' onClick={()=>setArticle(item)}>
                   <div className='copy_btm'> 
                   <img src={copied===item.url?tick:copy} className='w-[40%] h-[40%] object-contain' onClick={()=>handleCopy(item.url)}/>
                   </div>
                      <p className='flex-1 font-satoshi text-red-400 font-medium text-sm truncate'>
                        {item.url}
                      </p>


                </div>
            ))
         }
   </div>

   <div className="my-10 max-w-full flex justify-center items-center">

      {isFetching?(<img src={loader} className='w-20 h-20 object-contain'/>):error?(<p className="font-inter font-bold text-black text-center">
        Well! 😟😟 Something unexpected happened!!
        <br />
        <span className='font-satoshi font-normal text-gray-800'>
            {error?.data?.error}
        </span>


      </p>):( 
     article.summary &&(
        <div className='flex flex-col gap-3'>
            <h2 className='font-satoshi font-bold text-xl text-gray-700'>
            Article   <span className='blue_gradient'>Summary</span> 
            </h2>
             <div className='summary_box'>
                <p className='text-sm text-gray-700 font-inter font-medium'>
                
                {article.summary}
                </p>
                </div>

        </div>
     )

      )


      }


   </div>



   </section>
  )
}

export default Demo
