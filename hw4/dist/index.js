"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React = React;
var Component = _React.Component;

var CountDisplay = function (_Component) {
  _inherits(CountDisplay, _Component);

  function CountDisplay(props) {
    _classCallCheck(this, CountDisplay);

    var _this = _possibleConstructorReturn(this, (CountDisplay.__proto__ || Object.getPrototypeOf(CountDisplay)).call(this, props));

    _this.state = {};
    return _this;
  }

  return CountDisplay;
}(Component);

var TodoItem = function (_Component2) {
  _inherits(TodoItem, _Component2);

  function TodoItem(props) {
    _classCallCheck(this, TodoItem);

    var _this2 = _possibleConstructorReturn(this, (TodoItem.__proto__ || Object.getPrototypeOf(TodoItem)).call(this, props));

    _this2.state = {
      value: props.value
    };
    // this.state.value is broken!!
    return _this2;
  }

  _createClass(TodoItem, [{
    key: "render",
    value: function render() {
      // console.log(this.props.value);
      return React.createElement(
        "div",
        { className: this.props.cn },
        React.createElement(
          "div",
          { className: "todoitem", id: this.props.id },
          React.createElement("input", { className: "checkbox", type: "checkbox" }),
          React.createElement(
            "p",
            { className: "content" },
            " ",
            this.props.value,
            " "
          ),
          React.createElement(
            "p",
            { className: "delete", onClick: this.destroy_itself },
            "X"
          )
        )
      );
    }
  }]);

  return TodoItem;
}(Component);

var TodoApp = function (_Component3) {
  _inherits(TodoApp, _Component3);

  function TodoApp() {
    _classCallCheck(this, TodoApp);

    var _this3 = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this));

    _this3.state = {
      todoitems: [],
      done: [],
      displaychoice: ""
    };
    _this3.display = _this3.display.bind(_this3);
    _this3.click = _this3.click.bind(_this3);
    return _this3;
  }

  _createClass(TodoApp, [{
    key: "push",
    value: function push(e) {
      if (e.key !== 'Enter' || e.target.value == "") return;
      this.setState({ done: [].concat(_toConsumableArray(this.state.done), [false]) });
      this.setState({ todoitems: [].concat(_toConsumableArray(this.state.todoitems), [e.target.value]) });
      e.target.value = "";
    }
  }, {
    key: "todoitems_construction",
    value: function todoitems_construction() {
      var _this4 = this;

      var todoitemsbox = [];
      for (var i = 0; i < this.state.todoitems.length; ++i) {
        if (!this.state.done[i]) todoitemsbox.push(React.createElement(TodoItem, { cn: "active", value: this.state.todoitems[i], key: i, id: i }));else todoitemsbox.push(React.createElement(TodoItem, { cn: "completed", value: this.state.todoitems[i], key: i, id: i }));
      }
      if (this.state.displaychoice === "Completed") todoitemsbox = todoitemsbox.filter(function (v, i) {
        return _this4.state.done[i];
      });else if (this.state.displaychoice === "Actived") todoitemsbox = todoitemsbox.filter(function (v, i) {
        return !_this4.state.done[i];
      });
      return React.createElement(
        "div",
        null,
        todoitemsbox
      );

      // return <CountDisplay todoitems={this.todoitems} done={this.done} displaychoice={this.displaychoice}/>


      // return <div>
      //          this.state.todoitems.map(
      //           (v,i) => (<TodoItem value={s}  id={i} destroy={this.delete}/>)
      //          );
      //        </div>;
    }
  }, {
    key: "click",
    value: function click(e) {
      var t = e.target;
      if (t.className === "checkbox") {
        this.state.done[t.parentElement.id] = t.checked;
        this.setState({ done: this.state.done });
      } else if (t.className === "delete") {
        this.state.todoitems.splice(t.parentElement.id, 1);
        this.setState({ todoitems: this.state.todoitems });
        this.state.done.splice(t.parentElement.id, 1);
        this.setState({ done: this.state.done });
        // this.setState({todoitems: this.state.todoitems.filter((v, i) => i !== Number(t.parentElement.id))});
      }
    }
  }, {
    key: "display",
    value: function display(d) {
      // this.setState({done:[...this.done,false]});
      this.setState({ displaychoice: d });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "div",
        null,
        React.createElement("input", { type: "text", onKeyPress: this.push.bind(this) }),
        React.createElement(
          "div",
          { onClick: this.click },
          this.todoitems_construction()
        ),
        React.createElement(
          "button",
          { type: "button", className: "display", onClick: function onClick() {
              return _this5.display("All");
            } },
          "Display All"
        ),
        React.createElement(
          "button",
          { type: "button", className: "display", onClick: function onClick() {
              return _this5.display("Completed");
            } },
          "Completed"
        ),
        React.createElement(
          "button",
          { type: "button", className: "display", onClick: function onClick() {
              return _this5.display("Actived");
            } },
          "Actived"
        )
      );
    }
  }]);

  return TodoApp;
}(Component);

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('root'));