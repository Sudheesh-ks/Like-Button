import { useState } from 'react'
import './App.css'
import { HeartIcon, SpinnerIcon } from './icons'

function App() {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  const hangleClick = async() => {
    setIsFetching(true);
    setError(null);

    try {
      const res = await fetch("https://www.greatfrontend.com/api/questions/like-button", {
              method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        action: liked ? "unlike" : 'like'
      })
    });
    
    if(res.status >= 200 && res.status < 300){
      setLiked(!liked)
    }else{
      const res = await res.json();
      setError(res.message)
      return;
    }

    } finally {
      setIsFetching(false)
    }
  }

  return (
    <>
      <button disabled={isFetching} className={`likeBtn ${liked ? "liked" : ""}`} onClick={hangleClick}>
        { isFetching ? <SpinnerIcon /> : <HeartIcon />} { liked ? "Liked" : "Like" }
      </button>
      {error && <div>{error}</div>}
    </>
  )
}

export default App
