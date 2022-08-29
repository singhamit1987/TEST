import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchPosts } from '../../actions/posts-action-types';
import { fetchMyProfileDetail } from '../../actions/user-action-types';
import { Button } from '../../components';
import { USER_SCHOOL_ADMIN } from '../../constants';
import AddPost from '../school-wall/add-post';
import SinglePost from './single-post';
import Tiles from './tiles';

const schoolRecords = [{
  className: 'bg-arielle-smile',
  count: 560,
  subtitle: 'sub text goes here',
  title: 'Total Users',
}, {
  className: 'bg-happy-green',
  count: 45,
  subtitle: 'sub text goes here',
  title: 'Total Teachers',
}, {
  className: 'bg-sunny-morning',
  count: 500,
  subtitle: 'sub text goes here',
  title: 'Total Students',
}, {
  className: 'bg-strong-bliss',
  count: 12,
  subtitle: 'sub text goes here',
  title: 'Total Classes',
}];

const timePeriod = [{
  className: 'bg-arielle-smile',
  count: 5,
  subtitle: 'sub text goes here',
  title: 'New Users',
}, {
  className: 'bg-happy-green',
  count: 15,
  subtitle: 'sub text goes here',
  title: 'New Teachers',
}, {
  className: 'bg-sunny-morning',
  count: 45,
  subtitle: 'sub text goes here',
  title: 'New Students',
}];

const Dashboard = () => {
  const [form, setForm] = React.useState({
    formDate: null,
    toDate: null,
  });
  const [visible, setVisibility] = React.useState(false);
  const [playing, setPlaying] = React.useState(null);
  const dispatch = useDispatch();

  const {
    posts, user,
  } = useSelector((store) => ({
    posts: store.posts.records,
    user: store.user.userDetail,
  }));

  React.useEffect(() => {
    dispatch(fetchMyProfileDetail());

    if (user?.user_type_id === USER_SCHOOL_ADMIN) {
      dispatch(fetchPosts());
    }
  }, []);

  const onDateChange = (name, date) => {
    const updates = {
      ...form,
      [name]: date,
    };

    setForm(updates);
  };

  function onCreatePost(payload) {
    setVisibility(false);
    dispatch(createPost(payload));
  }

  function onDownload(url) {
    window.open(url, '_blank');
  }

  function onPlay(e) {
    setPlaying(e);
  }

  return (
    <>
      {user?.user_type_id === USER_SCHOOL_ADMIN && (
        <div className="mb-3 card">
          <div className="card-header-tab card-header border-0">
            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              School Wall
            </div>
            <ul
              className="nav d-flex align-items-center justify-content-center justify-content-md-right mb-2 mb-md-0"
              role="tablist"
            >
              <Button onClick={() => setVisibility(true)} className="btn-pill btn-shadow btn-wide btn btn-info btn-sm">
                <span className="add-icon">+ </span>
                Add Post
              </Button>
            </ul>
          </div>
          <div className="main-card mb-3 d-block card-footer">
            <div className="row px-2">
              {cloneDeep(posts)?.splice(0, 2).map((post) => (
                <SinglePost
                  {...post}
                  key={post.school_wall_posts_id}
                  playing={post.school_wall_posts_id === playing}
                  onDownload={() => onDownload(post.asset)}
                  onPlay={() => onPlay(post.school_wall_posts_id)}
                />
              ))}
              <div className="col-sm-12 text-right mt-4">
                <Button onClick={() => dispatch(push('/school-wall'))} className="btn-pill btn-shadow btn-wide btn btn-primary btn-sm">
                  See All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Tiles data={schoolRecords} title='School Records' />
      <Tiles {...form} data={timePeriod} title='During Selected Time Period' onDateChange={onDateChange} />
      {visible && <AddPost onSave={onCreatePost} onClose={() => setVisibility(false)} />}
    </>
  );
};

export default Dashboard;
