var React = require('react');
module.exports = React.createClass({
  render: function () {
    return require('./profile.htmlx')(this)();
  }
});
