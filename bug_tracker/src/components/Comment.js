import React from 'react';
import './Comment.css';
import Button from '@material-ui/core/Button';

const Comment = ({ id, text, author, date }) => {
  console.log(text);
  return (
    <div className='comment'>
      <span className='comment__element comment__author'>
        <strong>{author}</strong> on {date}
      </span>
      <p className='comment__element comment__body'>{text}</p>
      <div className='comment__element comment__buttons'>
        {/* Check if current user then edit/delete */}
        <input type='button' value='Edit' className='comment__button' />
        <input type='button' value='Delete' className='comment__button' />
      </div>
    </div>
  );
};

export default Comment;
