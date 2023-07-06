import React from 'react'
import { useState,useEffect } from 'react'
import { getNews } from '../../api/external';
import './Home.css';
import { TailSpin } from 'react-loader-spinner';
function Home() {
  const [articles,setArticles] = useState([]);
  const [loaded,setLoaded] = useState(false);
  useEffect(()=>{
    //time 8:13:00
    setLoaded(false);
    (async function newsApiCall(){
        try{
        const response = await getNews();
        setLoaded(true);
        setArticles(response);
    }
        catch(error){
            return error;
        }
    })();
    //cleanup function
  },[]);

  //8:24:00
  const handleCardClick = (url)=>{
    window.open(url,'_blank');  
  };
    return (
    <>
    {loaded? <>
    <div className="styles-header">
        Latest Articles
    </div>
    <div className="grid">
        {articles.map((article)=>{
            return(
           <div className='card' key={article.url} onClick={()=>handleCardClick(article.url)}>
            <img src={article.urlToImage} alt="" />
            <h4>{article.title}</h4>
           </div> )
        })}
    </div></> : <> <div style={{width:"fit-content",margin:"auto",textAlign:'center',justifyContent:'center',alignItems:'center'}}><TailSpin height={80} width={80} radius={1} color={'#800080'} /></div></>}
    </>
  )
}

export default Home