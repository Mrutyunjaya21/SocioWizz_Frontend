import React, { createContext, useState, useContext } from 'react';

const ScheduleContext = createContext();

export const useScheduledPosts = () => useContext(ScheduleContext);

export const ScheduledPostsProvider = ({ children }) => {
  const [scheduledPosts, setScheduledPosts] = useState([]);

  const addScheduledPost = (post) => {
    setScheduledPosts(prevPosts => [...prevPosts, post]);
  };

  return (
    <ScheduleContext.Provider value={{ scheduledPosts, addScheduledPost }}>
      {children}
    </ScheduleContext.Provider>
  );
};