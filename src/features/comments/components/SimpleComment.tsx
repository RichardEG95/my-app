import React, { ReactElement } from 'react';
import { IComment } from '../entities';
import { Avatar, Button, Comment } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRemoveCommentMutation } from '../commentsApi';

export interface CommentProps {
  comment: IComment;
  children?: ReactElement;
  onEditClick: (comment: IComment) => void;
}

export const SimpleComment = (props: CommentProps): ReactElement => {
  const {comment, children, onEditClick} = props;

  const [removeComment] = useRemoveCommentMutation();

  const onDeleteClick = (comment: IComment): void => {
    removeComment(comment.id);
  };

  return (
    <Comment
      actions={[
        <Button id={`edit-child-${comment.id}`} type="link" size="small" icon={<EditOutlined/>}
                onClick={() => onEditClick(comment)}>Edit</Button>,
        <Button id={`delete-child-${comment.id}`} type="link" size="small" icon={<DeleteOutlined/>}
                onClick={() => onDeleteClick(comment)}>Delete</Button>
      ]}
      author={<span>{comment.email}</span>}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
      content={comment.comment}
    >
      {children}
    </Comment>
  );
};
