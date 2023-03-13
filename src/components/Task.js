import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import { images } from '../images';
import Input from './Input';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.itemBackground};
  border-radius: 10px;
  padding: 5px;
  margin: 3px 0px;
`;

const Content = styled.Text`
  flex: 1;
  font-size: 24px;
  color: ${({ theme, completed }) =>
    completed ? theme.done : theme.text}; // 완료 시 글자 색 변경
  text-decoration-line: ${({ completed }) =>
    completed ? 'line-through' : 'none'}; // 완료 시 취소선
`;

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };
  const _onSubmitEditing = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      updateTask(editedTask);
    }
  };
  return isEditing ? (
    <Input
      value={text}
      onChangeText={text => setText(text)}
      onSubmitEditing={_onSubmitEditing}
    />
  ) : (
    <Container>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted} // 완료 버튼 클릭 시 체크 박스로 변경
        id={item.id}
        onPressOut={toggleTask}
        completed={item.completed}
      />
      <Content completed={item.completed}>{item.text}</Content>
      {item.completed || (
        <IconButton
          type={images.update}
          onPressOut={_handleUpdateButtonPress}
        />
      )}
      {/* <IconButton type={images.update} /> */}
      <IconButton
        type={images.delete}
        id={item.id}
        onPressOut={deleteTask}
        completed={item.completed}
      />
    </Container>
  );

  // return (
  //   <Container>
  //     <IconButton
  //       type={item.completed ? images.completed : images.uncompleted} // 완료 버튼 클릭 시 체크 박스로 변경
  //       id={item.id}
  //       onPressOut={toggleTask}
  //       completed={item.completed}
  //     />
  //     <Content completed={item.completed}>{item.text}</Content>
  //     {item.completed || <IconButton type={images.update} />}
  //     <IconButton type={images.update} />
  //     <IconButton
  //       type={images.delete}
  //       id={item.id}
  //       onPressOut={deleteTask}
  //       completed={item.completed}
  //     />
  //   </Container>
  // );
};

Task.propTypes = {
  item: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
};

export default Task;
