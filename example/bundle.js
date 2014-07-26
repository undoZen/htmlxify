var React = require('react');

var Hello = React.createClass({
  render: require('./templates/sayhello.htmlx')
});

React.renderComponent(Hello({name: '@undoZen', age: 25, email: 'opensource@undozen.com'}), document.getElementById('root'));
