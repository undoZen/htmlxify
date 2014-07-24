console.log('Hello, World!');
var tpl = require('./templates/sayhello.htmlx');

var React = require('react');

var Hello = React.createClass({
  render: function () {
    return tpl(this)();
  }
});

React.renderComponent(Hello({name: '@undoZen', age: 25, email: 'opensource@undozen.com'}), document.getElementById('root'));
