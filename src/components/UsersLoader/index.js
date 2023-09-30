import React, { Component } from 'react';
import styles from './index.module.scss';
import Spinner from '../Spinner';
import RadioGroup from '../RadioButtons/RadioGroup';
import RadioButton from '../RadioButtons/RadioButton';
import * as API from '../../api';

const ListUsers = ({ users }) => {
  const renderUser = ({ login: { uuid }, name: { first: firstName, last: lastName }, gender }) => {
    return <li key={uuid}>{firstName} {lastName} ({gender})</li>
  }
  return (
    <ul>
      {users.map(renderUser)}
    </ul>
  );
}
class UsersLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      page: 1,
      isError: false,
      gender: 'all',
    }
    // console.log('constructor');
  }

  load(seed) {
    this.setState({ isLoading: true });
    const { page, gender } = this.state;
    API.getUsers({ page, results: 5, gender, seed })
      .then(data => this.setState({
        users: data.results,
      }))
      .catch(error => this.setState({
        isError: true,
      }))
      .finally(() => this.setState({
        isLoading: false
      }));
  }

  componentDidMount() {
    // console.log('componentDidMount');
    this.load();
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate');
    if (this.state.page === prevState.page) {
      return;
    }
    this.load();

  }
  prevPage = () => {
    this.setState({ page: this.state.page - 1 })
  }
  nextPage = () => {
    this.setState({ page: this.state.page + 1 })
  }

  handleGenderChange = (event) => {
    this.setState({ gender: event.target.value, page: 1 }, () => {
      this.load();
    });
  };

  render() {
    // console.log('render');
    const { users, isLoading, page, isError, gender } = this.state;
    if (isError) {
      return <p>Error...</p>
    }
    return (
      <section className={styles.userList}>
        <h2>Users List</h2>
        <hr />

        <div>
          <RadioGroup
            value={gender}
            onChange={this.handleGenderChange}
          >
            <RadioButton value="all" label="All" />
            <RadioButton value="male" label="Male" />
            <RadioButton value="female" label="Female" />
          </RadioGroup>
        </div>

        <button disabled={page === 1} onClick={this.prevPage}>{"<"}</button>
        <span className={styles.currPage}> {page} </span>
        <button onClick={this.nextPage}>{">"}</button>

        <ListUsers users={users} gender={gender} />
        {isLoading && <Spinner />}
      </section>
    );
  }
}

export default UsersLoader;
