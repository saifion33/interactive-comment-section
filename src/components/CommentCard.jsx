import React from 'react'
import plusIcon from '../assets/images/icon-plus.svg';
import minusIcon from '../assets/images/icon-minus.svg';
import replyIcon from '../assets/images/icon-reply.svg';

const CommentCard = (props) => {
  const currentUser = {
    "image": {
      "png": "src/assets/images/avatars/image-juliusomo.png",
      "webp": "src/assets/images/avatars/image-juliusomo.webp"
    },
    "username": "juliusomo"
  }
  return (
    <div key={props.comment.id} className="comment-card bg-white rounded-md p-3 lg:flex lg:flex-row-reverse lg:p-5">
      <div className=''>
        <div className="profile-container flex items-center gap-3 w-full">
          <img className='w-8 h-8 lg:w-10 lg:h-10' src={props.comment.user.image.webp} alt={props.comment.user.username} />
          <strong className="username  font-semibold">{props.comment.user.username}</strong>
          <p className='text-grayish-Blue tracking-wider'>{props.comment.createdAt}</p>
          <div className="hidden lg:flex replay-btn-container  items-center space-x-2 text-lg ml-auto mr-4"  >
            <strong className='text-blue-800'>Reply</strong>
            <img className='w-5' src={replyIcon} alt="reply" />
          </div>
        </div>
        <div className="comment-body py-4">
          <p className='text-grayish-Blue'>
            <strong className='text-blue-800'>{props.comment.replyingTo ? [`@ ${props.comment.replyingTo} `] : ''}</strong>
            {props.comment.content}
          </p>
        </div>
      </div>
      <div className="upvote-and-replay-container flex justify-between items-center lg:items-start lg:mr-5">
        <div className="upvote flex items-center space-x-3 bg-very-light-gray py-2 px-3 rounded-xl lg:flex-col lg:space-x-0 lg:space-y-3 lg:py-5 ">
          <img className='w-4 h-4' src={plusIcon} alt="plus" />
          <p className='text-lg font-semibold text-blue-800'>{props.comment.score}</p>
          <img className='w-4 h-1' src={minusIcon} alt="minus" />
        </div>
        <div className="replay-btn-container flex lg:hidden items-center mr-4 space-x-2 text-lg"  >
          <strong className='text-blue-800'>Reply</strong>
          <img className='w-5' src={replyIcon} alt="reply" />
        </div>
      </div>
    </div>
  )
}

export default CommentCard
