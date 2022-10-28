import React, { useState } from 'react'
import plusIcon from '/assets/images/icon-plus.svg';
import minusIcon from '/assets/images/icon-minus.svg';
import replyIcon from '/assets/images/icon-reply.svg';
import deleteIcon from '/assets/images/icon-delete.svg';
import editIcon from '/assets/images/icon-edit.svg';
import AddCommentCard from './AddCommentCard';
import timeStampConverter from '../Function/timeStampConverter';

const CommentCard = (props) => {
  const currentUser = {
    "image": {
      "png": "/assets/images/avatars/image-juliusomo.png",
      "webp": "/assets/images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
  }


  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);

  const [value, setValue] = useState(props.comment.content);

  return (
    <>
      <div key={props.comment.id} className="comment-card bg-white rounded-md p-3 lg:flex lg:justify-start w-full lg:flex-row-reverse lg:p-5">
        <div className='w-full'>
          <div className="profile-container flex justify-start items-center gap-3 w-full">
            <img className='w-8 h-8 lg:w-10 lg:h-10' src={props.comment.user.image.webp} alt={props.comment.user.username} />
            <strong className="username  font-semibold">{props.comment.user.username}</strong>
            <p className={`${props.comment.user.username !== currentUser.username ? 'hidden px-0' : 'px-2 '}bg-modarate-blue  text-white rounded-sm`}>you</p>
            <p className='text-grayish-Blue'>{isNaN(props.comment.createdAt) ? props.comment.createdAt : timeStampConverter(props.comment.createdAt)}</p>
            <div onClick={() => { setReplying(true) }} className={`${props.comment.user.username === currentUser.username ? 'lg:hidden' : 'lg:flex '}cursor-pointer hidden  replay-btn-container  items-center space-x-2 text-lg ml-auto mr-4`}  >
              <strong className='text-blue-800'>Reply</strong>
              <img className='w-5' src={replyIcon} alt="reply" />
            </div>
            <div className={`delete-and-edit-container ml-auto hidden  space-x-3 ${props.comment.user.username !== currentUser.username ? 'hidden' : 'lg:flex '}`}>
              <div onClick={() => {
                props.setDeleteCommentId({ parentId: (props.parentId ? props.parentId : null), commentId: props.comment.id })
                props.deleteCommentHandler()
              }} className="delete flex items-center cursor-pointer">
                <img className='mr-1' src={deleteIcon} alt="delete" />
                <p className='text-soft-red'>Delete</p>
              </div>
              <div onClick={() => {
                setEditing(true)
              }} className="edit flex items-center cursor-pointer">
                <img className='mr-1' src={editIcon} alt="edit" />
                <p className='text-modarate-blue'>Edit</p>
              </div>
            </div>
          </div>
          <div className="comment-body w-full py-4">
            {
              !editing && <p className='text-grayish-Blue'>
                <strong className='text-blue-800'>{props.comment.replyingTo ? [`@ ${props.comment.replyingTo} `] : ''}</strong>
                {props.comment.content}
              </p>

            }
            {
              editing && <div className='overflow-auto'>
                <textarea className='w-full' name="textarea" id="textarea" rows="3" value={value} onChange={(e) => { setValue(e.target.value) }}></textarea>
                <button className=" sendBtn float-right bg-modarate-blue text-white font-semibold px-3 py-1 rounded-md" onClick={() => { props.updateComment(value, (props.parentId ? props.parentId : null), props.comment.id); setEditing(false) }}>UPDATE</button>
              </div>
            }
          </div>
        </div>
        <div className="upvote-and-replay-container flex justify-between items-center lg:items-start lg:mr-5">
          <div className="upvote flex items-center space-x-3 bg-very-light-gray py-2 px-3 rounded-xl lg:flex-col lg:space-x-0 lg:space-y-3 lg:py-5 ">
            <img onClick={() => { props.commentVoter(props.parentId ? props.parentId : null, props.comment.id, 'upvote') }} className='w-4 h-4 hover:cursor-pointer' src={plusIcon} alt="plus" />
            <p className='text-lg font-semibold text-blue-800'>{props.comment.score}</p>
            <img onClick={() => { props.commentVoter(props.parentId ? props.parentId : null, props.comment.id, 'downvote') }} className='w-4 h-1 hover:cursor-pointer' src={minusIcon} alt="minus" />
          </div>
          <div onClick={() => { setReplying(true) }} className={`replay-btn-container cursor-pointer flex lg:hidden items-center mr-4 space-x-2 text-lg ${props.comment.user.username === currentUser.username ? 'hidden' : ''}`}  >
            <strong className='text-blue-800 '>Reply</strong>
            <img className='w-5' src={replyIcon} alt="reply" />
          </div>
          <div className={`delete-and-edit-container flex space-x-3 ${props.comment.user.username !== currentUser.username ? 'hidden' : 'lg:hidden'}`}>
            <div onClick={() => {
              props.setDeleteCommentId({ parentId: (props.parentId ? props.parentId : null), commentId: props.comment.id })
              props.deleteCommentHandler()
            }} className="delete flex items-center">
              <img className='mr-1' src={deleteIcon} alt="delete" />
              <p className='text-soft-red'>Delete</p>
            </div>
            <div onClick={() => {
              setEditing(true)
            }} className="delete flex items-center">
              <img className='mr-1' src={editIcon} alt="edit" />
              <p className='text-modarate-blue'>Edit</p>
            </div>
          </div>
        </div>
      </div>
      {
        replying && <AddCommentCard id='addCommentBox-0' setReplying={setReplying} commentId={props.parentId ? props.parentId : props.comment.id} user={props.comment.user.username} currentUser={currentUser} addComment={props.addComment} deleteComment={props.deleteComment} commentType={'Reply'} />
      }
    </>
  )
}

export default CommentCard
