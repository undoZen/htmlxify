htmlxify
========

I don't like JSX and I want to work with designers, so I created this browserify tramsformer to let you write react templates in separate `*.htmlx` files.

##Installation

    npm install htmlxify

##Usage

This is a simple JSX example from React homepage:

    /** @jsx React.DOM */
    var HelloMessage = React.createClass({
      render: function() {
        return <div>Hello {this.props.name}</div>;
      }
    });

    React.renderComponent(<HelloMessage name="John" />, mountNode);

Using browserify and htmlxify, you can change this example into two files:

hello.js:

    var HelloMessage = React.createClass({
      render: require('./hello.htmlx')
    });

    React.renderComponent(HelloMessage({name: "John"}), mountNode);

hello.htmlx

    return 'htmlx below', // don't forget this line, it indicates codes below will be transformed to react dom dsl.
    <div>Hello {props.name}</div>

htmlxify will give you two local variables: `state` and `props`, which are just `this.state` and `this.props` shortcuts.

You can require other htmlx files as partial, they share the same context as you pass to them.

    var chinese = require('./chinese.htmlx').bind(this); //bind call is require
    var Profile = require('../components/profile.js');
    return 'htmlx below', //don't forget this line, it separate requires and output
    <div>
      <p>Hello, {props.name}</p>
      <chinese/> {/* partials should not hav children */}
      <Profile age={props.age} email={props.email}/> {/* use react components as usual */}
    </div>

[Here's the full example](https://github.com/undoZen/htmlxify/tree/master/example).

##Todo

* TODO: server-side (node) require support
* TODO: source maps

##Lisence
MIT
