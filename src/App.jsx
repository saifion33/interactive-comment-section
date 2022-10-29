import { useEffect, useState } from 'react';
import AddCommentCard from './components/AddCommentCard';
import Alertbar from './components/Alertbar';
import CommentCard from './components/CommentCard';
import Modal from './components/Modal';
import moonIcon from '/assets/images/moon-icon.svg'
import sunIcon from '/assets/images/sun-icon.svg'

function App() {
  const [commentsData, setCommentsData] = useState(localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : []);
  const [modalVisible, setModalVisible] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const mainDoc = document.getElementById('main-document');
  const fetchData = async () => {
    const response = await fetch('/assets/data.json', { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
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
      "png": "/assets/images/avatars/image-juliusomo.png",
      "webp": "/assets/images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
  }
  // ##################################  ALERT RELATED FUNCTIONS  ##################################################
  const [alert, setAlert] = useState({ alertMessage: 'This is my message', alertType: 'successful' })
  const [alertVisible, setAlertVisible] = useState(false)
  // **************** This function takes alert type and alert message and sets alert. Alert Auto dismissed after 1.5 second. ****************
  const showAlert = (alert_type, alert_message) => {
    setAlert({ alertMessage: alert_message, alertType: alert_type })
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 1500);
  }

  // #################################### ADD COMMENT OR REPLY FUNCTION #############################################
  // This function takes comment , comment id and comment Type (comment Or reply)
  const addComment = (newComment, id, commentType) => {
    const comments = [...commentsData];
    commentType === 'Reply' ? (comments.filter(comment => comment.id === id && (comment.replies.push(newComment)))) : comments.push(newComment);
    setCommentsData(comments)
    localStorage.setItem('comments', JSON.stringify(comments));
    showAlert('successful', 'comment added successfully')
  }

  // #################################### UPDATE COMMENT OR UPDATE REPLY FUNCTION #############################################
  // This function takes updated comment , if it is reply then takes parentComment id and comment id itself.
  const updateComment = (updatedComment, parentId, commentId) => {
    const comments = [...commentsData];
    comments.filter(comment => { comment.id === parentId ? (comment.replies.filter(reply => reply.id === commentId)[0].content = updatedComment) : ((comment.id === commentId) && (comment.content = updatedComment)) })
    setCommentsData(comments)
    localStorage.setItem('comments', JSON.stringify(comments));
    showAlert('successful', 'comment updated successfully')
  }

  // #################################### COMMENT VOTER FUNCTION #############################################
  // This function takes  voteType (upvote or downvote) and comment id, if this comment is reply comment then it also takes parentId
  const commentVoter = (parentId, commentId, voteType) => {
    const comments = [...commentsData];

    if (!parentId) {
      comments.filter(comment => {
        if (comment.id === commentId) {
          if (!comment['currentUserVote'] && voteType === 'upvote') {
            comment['currentUserVote'] = true;
            comment.score += 1
            showAlert('successful', `You Upvote the comment`)
          }
          else if (comment.hasOwnProperty('currentUserVote') && voteType === 'downvote') {
            delete comment['currentUserVote'];
            comment.score -= 1
            showAlert('warning', `You Downvote the comment`)
          }

        }
      });


    }
    else {

      comments.filter(comment => comment.id === parentId && (comment.replies.filter(reply => {
        if (reply.id === commentId) {

          if (!reply['currentUserVote'] && voteType === 'upvote') {
            reply['currentUserVote'] = true;
            reply.score += 1
            showAlert('successful', `You Upvote the comment`)
          }
          else if (reply.hasOwnProperty('currentUserVote') && voteType === 'downvote') {
            delete reply['currentUserVote'];
            reply.score -= 1
            showAlert('warning', `You Downvote the comment`)
          }
        }
      })));
    }
    setCommentsData(comments);
    localStorage.setItem('comments', JSON.stringify(comments));

  }
  // ############################################## DELETE COMMENT FUNCTION ##############################################
  /*  When user clicks on delete btn of comment then a function is called and setDeleteCommentId
   as object with comment id if comment is reply then also set parent id as well*/

  const [deleteCommentId, setDeleteCommentId] = useState({})
  // This function is called when user clicks on delete btn of modal dialog
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
    showAlert('danger', 'comment deleted successfully')
  }
  // when user clicks on delete btn of comment this function will run and show modal
  const deleteCommentHandler = () => {
    setModalVisible(true);

  }

  return (
    <div className="app  bg-gray-100 dark:bg-slate-800 min-h-screen py-6 h-min relative">
      <div className="light-and-dark-icon-container p-5 lg:p-0 lg:ml-5 lg:cursor-pointer">
        <div className={`${lightMode ? 'hidden' : 'flex'} justify-center font-semibold dark:text-white items-center gap-5`} onClick={() => { setLightMode(true); mainDoc.classList.remove('dark') }}>
          <p className='text-xl lg:text-base'>{lightMode ? 'Dark Mode' : 'Light Mode'}</p>
          <img className='w-8 h-8' src={sunIcon} alt="sun" />
        </div>
        <div className={`${lightMode ? 'flex' : 'hidden'} justify-center font-semibold items-center gap-5`} onClick={() => { setLightMode(false); mainDoc.classList.add('dark') }}>
          <p className='text-xl lg:text-base'>{lightMode ? 'Dark Mode' : 'Light Mode'}</p>
          <img className='w-8 h-8' src={moonIcon} alt="moon" />
        </div>
      </div>
      <Alertbar alertType={alert.alertType} alertVisible={alertVisible} alertMessage={alert.alertMessage} />
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
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} deleteCommentId={deleteCommentId} deleteComment={deleteComment} />
    </div>
  )
}

export default App
