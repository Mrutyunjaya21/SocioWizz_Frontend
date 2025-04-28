import React from 'react';
import { TextProvider } from './Context/TextContext';
import { ScheduledPostsProvider } from './Context/ScheduleContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostContent from './Pages/PostContent';
import AiPost from './Pages/AiPost';
import CalendarPage from './Pages/CalendarPage';
import CarouselPage from './Pages/Carousel';
import SignInPage from './Components/SignInPage';
import LinkPage from './Components/LinkPage';
import FormPage from './Components/FormPage';
import Homepage from './Components/Homepage';
import Carousel from './Components/Carousel';
import AccountPage from './Pages/AccountPage';

const App = () => {

  return (
    <TextProvider>
      <ScheduledPostsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/link" element={<LinkPage />}/>
            <Route path="/form" element={<FormPage />}/>
            <Route path="/home" element={<Homepage />}/>
            <Route path="/post" element={<PostContent />}/>
            <Route path="/calendar" element={<CalendarPage />}/>
            <Route path="/slide" element={<CarouselPage />}/>
            <Route path ='/generate' element ={<AiPost />}/>
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </Router>
      </ScheduledPostsProvider>
    </TextProvider>
  );
};

export default App;