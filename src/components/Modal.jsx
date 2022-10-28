import React from 'react'

const Modal = (props) => {
    return (
        <div className={`modal-container ${props.modalVisible ? 'flex ' : 'hidden'} fixed w-full top-0 left-0 bg-grayish-Blue bg-opacity-70 h-screen justify-center items-center px-6`}>
            <div className="modal  bg-white rounded-md md:w-1/3 lg:w-1/4 p-4">
                <h2 className='text-2xl font-semibold mb-3' >Delete Comment</h2>
                <p className='text-lg text-grayish-Blue'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="btn-container flex justify-between mt-3">
                    <button onClick={() => { props.setModalVisible(false) }} className='bg-dark-blue mx-2 w-1/2 py-1 rounded text-white font-semibold'>NO,CANCAL</button>
                    <button onClick={() => { props.deleteComment(props.deleteCommentId.parentId, props.deleteCommentId.commentId) }} className='bg-soft-red mx-2 w-1/2 py-1 rounded text-white font-semibold'>YES,DELETE</button>
                </div>
            </div>

        </div>
    )
}

export default Modal
