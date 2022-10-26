import { useEffect, useState } from 'react';
import AddCommentCard from './components/AddCommentCard';
import CommentCard from './components/CommentCard';

function App() {
  const [commentsData, setCommentsData] = useState(localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : []);
  const fetchData = async () => {
    const response = await fetch('/src/assets/data.json', { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
    const data = await response.json();
    if (!localStorage.getItem('comments')) {
      setCommentsData(data.comments);
      localStorage.setItem('comments', JSON.stringify(data.comments));
    }
  }

  useEffect(() => {
    fetchData();
    !localStorage.getItem('commentIds') && localStorage.setItem('commentIds', JSON.stringify([1, 2, 3, 4, 5]));
    // eslint-disable-next-line
  }, [])
  const currentUser = {
    "image": {
      "png": "src/assets/images/avatars/image-juliusomo.png",
      "webp": "src/assets/images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
  }
  const addComment = (newComment, id, commentType) => {
    const comments = [...commentsData];
    commentType === 'Reply' ? (comments.filter(comment => comment.id === id && (comment.replies.push(newComment)))) : comments.push(newComment);
    setCommentsData(comments)
    localStorage.setItem('comments', JSON.stringify(comments));
  }
  const updateComment = (updatedComment, parentId, commentId) => {
    const comments = [...commentsData];
    comments.filter(comment => { comment.id === parentId ? (comment.replies.filter(reply => reply.id === commentId)[0].content = updatedComment) : ((comment.id === commentId) && (comment.content = updatedComment)) })
    setCommentsData(comments)
    localStorage.setItem('comments', JSON.stringify(comments));
  }
  const deleteComment = (parentId, commentId) => {
    let comments = [...commentsData];
    if (!parentId) {
      const newCommentList = []
      comments.filter(comment => comment.id !== commentId && (newCommentList.push(comment)));
      comments = newCommentList;
    }
    else {
      comments.filter(comment => comment.id === parentId && (comment.replies = comment.replies.filter(reply => reply.id !== commentId)));
    }
    setCommentsData(comments);
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  return (
    <div className="app bg-gray-100 min-h-screen py-6">
      <div className="main-container font-Rubik  p-3 md:px-10 md:mx-auto lg:w-1/2">
        <div className="comment-container space-y-4">

          {
            commentsData.length > 0 && commentsData.map((comment, index) => {
              return (
                <div key={comment.id + index} id={comment.id} className="comment-wrapper space-y-4">
                  <CommentCard addComment={addComment} updateComment={updateComment} deleteComment={deleteComment} comment={comment} />
                  <div className="comment-wrapper pl-5 border-l-2 ml-4 md:pl-10 md:border-l-4 md:ml-11 space-y-4">
                    {comment.replies?.length > 0 ? comment.replies.map(replyComment => {
                      return (
                        <CommentCard addComment={addComment} updateComment={updateComment} deleteComment={deleteComment} parentId={comment.id} comment={replyComment} />
                      )
                    }) : ''}

                  </div>

                </div>)
            })
          }
        </div>
        {/* <CommentCard addComment={addComment} updateComment={updateComment} deleteComment={deleteComment} comment={commentsData.comments[0]} /> */}
        <AddCommentCard id='addCommentBox-0' addComment={addComment} currentUser={currentUser} commentType={'SEND'} />
      </div>
    </div>
  )
}

export default App
