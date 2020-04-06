import React from 'react';

import Sider from '../layouts/Sider';
import Posts from '../components/Posts';
import SiderMain from '../layouts/SiderMain';
import AuthModal from '../components/AuthModal';
import PostModal from '../components/PostModal';
import Categories from '../components/Categories';
import CreatePost from '../components/CreatePost';

const HomePage = () => (
  <>
    <Sider>
      <Categories />
    </Sider>
    <SiderMain>
      <CreatePost />
      <Posts />
    </SiderMain>
    <PostModal />
    <AuthModal />
  </>
);

export default HomePage;
