import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Post.css';

class Post extends PureComponent {
  static defaultProps = {
    post: {},
    user: {},
    excerpt: false
  }

  static propTypes = {
    post: PropTypes.object,
    user: PropTypes.object,
    excerpt: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.fetchPost = this.fetchPost.bind(this);

    this.state = {
      post: props.post,
      user: props.user
    };
  }

  componentDidMount() {
    const postId = this.props.match && this.props.match.params.id;
    const userId = this.state.user.id;

    if (postId) {
      this.fetchPost(postId);
    }

    if (userId) {
      this.fetchUser(userId);
    }

  }

  fetchPost(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        this.setState({
          post
        });

        this.fetchUser(post.userId);
      });
  }

  fetchUser(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(user => {
        this.setState({
          user
        });
      });
  }

  renderUser(user) {
    if (user.website) {
      return (
        <div data-test='postUser'>Author: <a href={`http://${user.website}`} target='_blank'>{user.name}</a></div>
      );
    }

    return (<div data-test='postUser'>Author: {user.name}</div>);
  }

  render() {
    const {
      post,
      user
    } = this.state;

    const {
      excerpt
    } = this.props;

    return (
      <div className={styles.post}>
        {!excerpt && <Link className={styles.goBack} to='/'><span aria-label='Go back' role='img'>🔙</span></Link>}
        <Link className={styles.titleLink} to={`/${post.id}`}>
          <h3 data-test='postTitle' className={styles.title}>{post.title}</h3>
        </Link>

        {!excerpt && <div data-test='postContent' className={styles.content}>
          {user.name && this.renderUser(user)}

          {post.body && <p data-test='postBody'>{post.body}</p>}
        </div>}
      </div>
    );
  }
}

export default Post;
