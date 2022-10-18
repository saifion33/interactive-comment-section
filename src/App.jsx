import { useEffect, useState } from 'react';
import CommentCard from './components/CommentCard';

function App() {
  const [commentsData, setCommentsData] = useState(localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : {});
  const fetchData = async () => {
    const response = await fetch('/src/assets/data.json', { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
    const data = await response.json();
    if (!localStorage.getItem('comments')) {
      localStorage.setItem('comments', JSON.stringify(data));
    }
    console.log(JSON.parse(localStorage.getItem('comments')).comments[1].replies)
  }

  useEffect(() => {
    fetchData();
  })
  const currentUser = {
    "image": {
      "png": "src/assets/images/avatars/image-juliusomo.png",
      "webp": "src/assets/images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
  }


  return (
    <div className="app bg-gray-100 min-h-screen py-6">
      <div className="main-container font-Rubik  p-3 md:px-10 md:mx-auto lg:w-1/2">
        <div className="comment-container space-y-4">

          {
            JSON.parse(localStorage.getItem('comments')).comments.map(comment => {
              return (
                <div className="comment-wrapper space-y-4">
                  <CommentCard comment={comment} />
                  <div className="comment-wrapper pl-5 border-l-2 ml-4 md:pl-10 md:border-l-4 md:ml-11 space-y-4">
                    {comment.replies.length > 0 ? comment.replies.map(replyComment => { return (<CommentCard comment={replyComment} />) }) : ''}
                  </div>
                </div>)
            })
          }
        </div>
        <div className="add-comment-container bg-white p-3 rounded-md mt-6">
          <textarea className='w-full p-2 border-2 ' name="textarea" id="textarea" rows="4" placeholder='Add a Comment...'></textarea>
          <div className="userprofile-and-send-btn-container flex justify-between items-center mt-2">
            <img className='w-8 h-8' src={currentUser.image.webp} alt="user" />
            <button className="sendBtn bg-modarate-blue text-white font-semibold px-3 py-2 rounded-md">SEND</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
