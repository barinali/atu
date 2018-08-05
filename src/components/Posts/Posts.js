import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Post from '../Post/Post';

class Posts extends PureComponent {
  constructor() {
    super();

    this.state = {
      posts: [],
      failed: false,
      loading: false
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.setState({
      loading: true
    });

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        this.setState({
          posts
        });
      })
      .catch(_ => {
        this.setState({
          failed: true
        })
      })
      .finally(_ => {
        this.setState({
          loading: false
        });
      });
  }
  
  render() {
    const {
      loading,
      failed,
      posts
    } = this.state;

    return (
      <Fragment>
        <h2>Posts</h2>

        {loading && <article>
          Posts are loading.
        </article>}

        {!failed && !loading && posts.map(post => <Post excerpt post={post} />)}
      </Fragment>
    );
  }
}

export default Posts;
