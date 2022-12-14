import { React, useState } from 'react'

const AddCommentCard = (props) => {
    const [value, setValue] = useState('')
    const changeHandler = (e) => {
        setValue(e.target.value)
    }

    const submitComment = () => {
        const idsList = JSON.parse(localStorage.getItem('commentIds'));
        const date = new Date;
        // This function generates a unique id for each comment
        const idGenerator = () => {
            const id = Math.floor(Math.random() * (1000 - 10)) + 10;
            if (idsList.includes(id)) {
                return idGenerator();
            }
            idsList.push(id);
            localStorage.setItem('commentIds', JSON.stringify(idsList))
            return id;
        }

        const newComment = {
            id: idGenerator(),
            content: value,
            score: 0,
            replyingTo: props.user,
            user: props.currentUser,
            createdAt: date.getTime()
        }
        props.addComment(newComment, props.commentId, props.commentType);
        setValue('')
        props.commentType === 'Reply' && props.setReplying(false)
    }
    return (
        <div key={props.user} id={props.id} className="add-comment-container bg-white dark:bg-slate-900 p-3 rounded-md mt-6">
            <textarea value={value} onChange={changeHandler} className='w-full p-2 border-2 dark:bg-slate-800 dark:text-stone-200' name="textarea" id="textarea" rows="4" placeholder='Add a Comment...'></textarea>
            <div className="userprofile-and-send-btn-container flex justify-between items-center mt-2">
                <img className='w-8 h-8' src={props.currentUser.image.webp} alt="user" />
                {
                    value && <button className="sendBtn bg-modarate-blue text-white font-semibold px-3 py-1 rounded-md" onClick={submitComment}>{props.commentType}</button>

                }            </div>
        </div>
    )
}

export default AddCommentCard
