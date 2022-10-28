import { useEffect, useState } from 'react';
import AddCommentCard from './components/AddCommentCard';
import CommentCard from './components/CommentCard';

function App() {
  const [commentsData, setCommentsData] = useState(localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : []);
  const [modalVisible, setModalVisible] = useState(false);
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
  const commentVoter = (parentId, commentId, voteType) => {
    console.log(parentId, commentId, voteType)
    const comments = [...commentsData];

    if (!parentId) {
      comments.filter(comment => {
        if (comment.id === commentId) {
          if (!comment['currentUserVote'] && voteType === 'upvote') {
            comment['currentUserVote'] = true;
            comment.score += 1
          }
          else if (comment.hasOwnProperty('currentUserVote') && voteType === 'downvote') {
            delete comment['currentUserVote'];
            comment.score -= 1
          }
          console.log(comment['currentUserVote'])
        }
      });


    }
    else {

      comments.filter(comment => comment.id === parentId && (comment.replies.filter(reply => {
        if (reply.id === commentId) {

          if (!reply['currentUserVote'] && voteType === 'upvote') {
            reply['currentUserVote'] = true;
            reply.score += 1
          }
          else if (reply.hasOwnProperty('currentUserVote') && voteType === 'downvote') {
            delete reply['currentUserVote'];
            reply.score -= 1
          }
        }
      })));
    }
    setCommentsData(comments);
    localStorage.setItem('comments', JSON.stringify(comments));
  }
  const [deleteCommentId, setDeleteCommentId] = useState({})
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
    localStorage.setItem('comments', JSON.stringify(comments))
    setDeleteCommentId({})
    setModalVisible(false)
  }
  const deleteCommentHandler = () => {
    setModalVisible(true);

  }

  return (
    <div className="app bg-gray-100 min-h-screen py-6 h-min relative">
      <div className="main-container font-Rubik  p-3 md:px-10 md:mx-auto lg:w-1/2">
        <div className="comment-container space-y-4">

          {
            commentsData.length > 0 && commentsData.map((comment, index) => {
              return (
                <div key={comment.id + index} id={comment.id} className="comment-wrapper space-y-4">
                  <CommentCard commentVoter={commentVoter} addComment={addComment} updateComment={updateComment} setDeleteCommentId={setDeleteCommentId} deleteCommentHandler={deleteCommentHandler} comment={comment} />
                  <div className="comment-wrapper pl-5 border-l-2 ml-4 md:pl-10 md:border-l-4 md:ml-11 space-y-4">
                    {comment.replies?.length > 0 ? comment.replies.map(replyComment => {
                      return (
                        <CommentCard commentVoter={commentVoter} addComment={addComment} updateComment={updateComment} setDeleteCommentId={setDeleteCommentId} deleteCommentHandler={deleteCommentHandler} parentId={comment.id} comment={replyComment} />
                      )
                    }) : ''}

                  </div>

                </div>)
            })
          }
        </div>
        <AddCommentCard id='addCommentBox-0' addComment={addComment} currentUser={currentUser} commentType={'SEND'} />
      </div>
      <div className={`modal-container ${modalVisible ? 'flex ' : 'hidden'} fixed w-full top-0 left-0 bg-grayish-Blue bg-opacity-70 h-screen justify-center items-center px-6`}>
        <div className="modal  bg-white rounded-md md:w-1/3 lg:w-1/4 p-4">
          <h2 className='text-2xl font-semibold mb-3' >Delete Comment</h2>
          <p className='text-lg text-grayish-Blue'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
          <div className="btn-container flex justify-between mt-3">
            <button onClick={() => { setModalVisible(false) }} className='bg-dark-blue mx-2 w-1/2 py-1 rounded text-white font-semibold'>NO,CANCAL</button>
            <button onClick={() => { deleteComment(deleteCommentId.parentId, deleteCommentId.commentId) }} className='bg-soft-red mx-2 w-1/2 py-1 rounded text-white font-semibold'>YES,DELETE</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App
