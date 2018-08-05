import React from 'react';
import { shallow } from 'enzyme';

jest.mock('react-router-dom', () => ({ Link: (props) => <a {...props}>children</a> }));

import Post from './Post';

const postData = {
  'userId': 1,
  'id': 1,
  'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
};

it('renders the component without crashing', () => {
  shallow(<Post />);
});

it('renders a title', () => {
  const post = shallow(<Post post={postData} />);

  expect(post.find('[data-test="postTitle"]').length).toBe(1);
  expect(post.find('[data-test="postTitle"]').text()).toBe(postData.title);
});

it('renders a post body', () => {
  const post = shallow(<Post post={postData} />);

  expect(post.find('[data-test="postBody"]').length).toBe(1);
  expect(post.find('[data-test="postBody"]').text()).toBe(postData.body);
});
