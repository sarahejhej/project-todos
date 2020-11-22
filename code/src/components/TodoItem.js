import React, { useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { todos } from '../reducers/todos';
import CustomCheckbox from 'library/CustomCheckbox';

const TodoItem = ({ itemIndex }) => {
  // const handleOnChange = event => {
  //   setChecked(event.target.checked);
  // };
  const item = useSelector(store => store.todos.list.items[itemIndex]);
  const [checked, setChecked] = useState(item.complete);

  const dispatch = useDispatch();

  const onRemoveClicked = event => {
    dispatch(
      todos.actions.removeTodo({
        itemIndex: itemIndex,
      })
    );
  };

  const handleOnChange = event => {
    dispatch(
      todos.actions.setComplete({
        itemIndex: itemIndex,
        complete: !item.complete,
      })
    );
    setChecked(event.target.checked);
  };
  return (
    <Container>
      {/* Checkbox to replace with CustomCheckbox */}
      {/* <input
        type="checkbox"
        onChange={handleOnChange}
        checked={item.complete ? 'checked' : ''}
      ></input> */}

      <CustomCheckbox
        checked={checked}
        onChange={handleOnChange}
      ></CustomCheckbox>
      <TodoContainer>
        <p>{item.description}</p>
        <p>{item.category}</p>
      </TodoContainer>
      {/* <p>{moment(item.dueDate).format('MMM Do YYYY')}</p>
      <p>Created: {moment(item.date).fromNow()}</p> */}
      <Image src="../assets/recycle-bin.svg" onClick={onRemoveClicked} />
      {/* <a onClick={onRemoveClicked}>[Remove]</a> */}
    </Container>
  );
};

export default TodoItem;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const TodoContainer = styled(Container)`
  flex-direction: column;
  align-items: flex-start;
`;

const Image = styled.img`
  width: 20px;
`;
