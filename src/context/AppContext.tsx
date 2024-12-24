import React, {createContext, useContext, useState} from 'react';
import {mockTasks} from '../utitlity/utils';

const TaskContext = createContext(null);

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState(
    [...mockTasks].sort((a, b) => new Date(a.date) - new Date(b.date)),
  );

  return (
    <TaskContext.Provider value={{tasks, setTasks}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
