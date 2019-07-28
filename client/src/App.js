import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Query, Mutation } from 'react-apollo';
import * as FontAwesome from 'react-icons/fa'
import Header from './components/Header';
import Show from './components/Show';
import Create from './components/Create';
import Edit from './components/Edit';

const GET_BOOKS = gql`
  {
    books {
      _id
      isbn
      title
      author
      description
      published_year
      publisher
      updated_date
    }
  }
`;

const DELETE_BOOK = gql`
  mutation removeBook($id: String!) {
    removeBook(id:$id) {
      _id
    }
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        book: false,
        status : false,
      };
  }

  getComponent( ) {
    if ( 'show' === this.state.status ) {
      return <Show book={this.state.book}/>;
    } else if ( 'edit' === this.state.status ) {
      return <Edit book={this.state.book} />;
    } else {
      return <Create/>;
    }
  }

  getRandomColor( ) {
    const colorStack = [ 'primary', 'success', 'info', 'warning', 'danger', 'secondary', 'dark' ];
    var random = Math.floor(Math.random() * 6 ); 
    return colorStack[random];
  }

  render() {
    return (
      <Query pollInterval={500} query={GET_BOOKS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
              <div className="container-fluid h-100">
                <div className="row h-100"> 
                  <div className="col-8 bg-dark">
                      {data.books.map((book, index) => (
                        <div key={index} className={ 'm-2 btn btn-' + this.getRandomColor() } >
                           <Mutation mutation={DELETE_BOOK} key={book._id}>
                              {(removeBook, { loading, error }) => (
                                <Link className="text-white p-2 "  onClick={(e)=>{
                                      e.preventDefault();
                                      removeBook({ variables: { id: book._id } });
                                }}>
                                <FontAwesome.FaTrash/>     
                                  {loading && <p>Loading...</p>}
                                  {error && <p>Error :( Please try again</p>}
                                </Link>
                              )}
                            </Mutation>
                          <Link className="text-white text-decoration-none p-2" title="click to show" onClick={ ()=>{
                            this.setState({
                              book: book,
                              status: 'show'
                            });
                          }}>
                            {book.title}
                          </Link>
                          <Link  className="text-white p-2" onClick={ () => {
                            this.setState({
                              book: book,
                              status: 'edit'
                            });
                          }}>
                            <FontAwesome.FaEdit />  
                          </Link>
                        </div>
                      ))}
                       <Link className="ml-5 mb-5" id="addNew" onClick={ () => {
                           this.setState( { 
                             book:false,
                             status : false,
                           })
                         }
                       }>
                        <FontAwesome.FaPlus />   
                       </Link>

                      </div>
                      <div className="col-4 bg-info">
                      <Header headerTitle={ this.state.status}/>
                        { this.getComponent() } 
                      </div>          
                </div>
              </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
