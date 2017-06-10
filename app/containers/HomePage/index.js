/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectTodos, makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos,loadtodos,edittodos,saveEdittodos,deletetodos,canceltodos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import { fromJS } from 'immutable';

// class TodoList extends React.PureComponent{
//   render(){
//     var list;
//     const todos = this.props.todos.toJSON();
//     console.log(todos);
//     for(var i=0;i<todos.length;i++){
//      console.log(todos[i].text);
//      return(
//           <div>
//           <H2>{todos[i].text}</H2>
//           <br/>
//         </div>
//       );
//     }
//   }
// }


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    // if (this.props.username && this.props.username.trim().length > 0) {
    //   this.props.onSubmitForm();
    // }
  }

  edit(index){
    this.props.onEdit(index);
  }

  save(index){
    this.props.onSave(index);
  }

  delete(index){
    this.props.onDelete(index);
  }

  cancel(index){
    this.props.onCancel(index);
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };
    let list;
    const todos = this.props.todos.toJS();
    let _this = this;
    list = todos.map(function(todo,index){
      if(todo.isEditable === false){
        return(
          <tr key={index}>
          <td>{todo.text}</td>
          <td><button onClick={_this.edit.bind(_this,index)} className="btn btn-primary">Edit</button></td>
          <td><button onClick={_this.delete.bind(_this,index)} className="btn btn-success">Delete</button></td>
          </tr>
        );
      } else {
        return(
          <tr key={index}>
          <td><Input type="text" id={'input'+index} defaultValue={todo.text}/></td>
          <td><button onClick={_this.save.bind(_this,index)} className="btn btn-primary">Save</button></td>
          <td><button onClick={_this.cancel.bind(_this,index)} className="btn btn-success">Cancel</button></td>
          </tr>
        );
      }
    })

    return (
        <div>
          <CenteredSection>
            <H2>
              To Do Application
            </H2>
          </CenteredSection>
          <Section className="text-center">
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  ref="username"
                />
              </label>
              <button className="btn btn-success">Create</button>
            </Form>
          </Section>
        <table>
        <tbody>
          {list}
        </tbody>
        </table>
        </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (evt) => {
      console.log("initiated");
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadtodos({ text: evt.target.querySelector('input').value }));
    },
    onEdit: (index,evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(edittodos(index));
    },
    onSave: (index, evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(saveEdittodos(index, document.querySelector('#input'+index).value));
    },
    onDelete: (index, evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(deletetodos(index));
    },
    onCancel: (index, evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(canceltodos(index));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  todos: makeSelectTodos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
