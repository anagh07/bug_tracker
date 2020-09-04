import React from 'react';
import './Comment.css';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const Comment = ({ id, text, author, date, user, userId, handleCommentDelete }) => {
  date = new Date(date);
  date = date.toISOString().substring(0, 10);

  return (
    <div className='comment'>
      <span className='comment__element comment__author'>
        <strong>{author}</strong> on {date}
      </span>
      <p className='comment__element comment__body'>{text}</p>
      <div className='comment__element comment__buttons'>
        {/* Check if current user then edit/delete */}
        {user._id.toString() === userId.toString() && (
          <input
            type='button'
            value='Delete'
            className='comment__button'
            onClick={() => handleCommentDelete(id)}
            cursor='pointer'
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Comment);
