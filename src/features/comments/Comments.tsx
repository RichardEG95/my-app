import React, { ReactElement, useEffect, useState } from 'react';
import { Button, List } from 'antd';
import { EditOutlined, DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import { useGetCommentsQuery, useRemoveCommentMutation } from './commentsApi';
import { IComment } from './entities';
import { SimpleComment } from './components/SimpleComment';
import { CommentsForm } from './components/CommentsForm';

export const Comments = (): ReactElement => {
  const {data: commentsApi} = useGetCommentsQuery();


  const [comments, setComments] = useState<IComment[]>([]);
  const [formInitialValues, setFormInitialValues] = useState<Partial<IComment>>();
  const [removeComment] = useRemoveCommentMutation();

  useEffect(() => {
    if (commentsApi) {
      setComments(commentsApi);
    }
  }, [commentsApi]);

  const onEditClick = (comment: IComment): void => {
    setFormInitialValues(comment);
  };

  const onCommentClick = (comment: IComment): void => {
    setFormInitialValues({ parentId: comment.id });
  };

  const onDeleteClick = (comment: IComment): void => {
    removeComment(comment.id);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '40px 0'}}>
      <div style={{display: 'flex', flexDirection: 'column', width: '650px'}}>
        <CommentsForm initialValues={formInitialValues}/>

        <List itemLayout="vertical" size="large">
          {comments.map((comment: IComment) => (
            <List.Item key={comment.id} actions={[
              <Button id={`delete-${comment.id}`} type="link" size="small" icon={<EditOutlined/>}
                      onClick={() => onEditClick(comment)}>Edit</Button>,
              <Button id={`comment-${comment.id}`} type="link" size="small" icon={<MessageOutlined/>}
                      onClick={() => onCommentClick(comment)}>Comment</Button>,
              <Button id={`delete-${comment.id}`} type="link" size="small" icon={<DeleteOutlined/>}
                      onClick={() => onDeleteClick(comment)}>Delete</Button>,
            ]}>
              <List.Item.Meta title={comment.email} description={comment.comment}/>
              {comment.comments ? comment.comments.map(c => (
                <SimpleComment onEditClick={onEditClick} key={c.id} comment={c}/>)) : undefined}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};
