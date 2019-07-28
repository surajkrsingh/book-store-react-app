import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const UPDATE_BOOK = gql`
    mutation updateBook(
        $id: String!,
        $isbn: String!,
        $title: String!,
        $author: String!,
        $description: String!,
        $publisher: String!,
        $published_year: Int!) {
        updateBook(
        id: $id,
        isbn: $isbn,
        title: $title,
        author: $author,
        description: $description,
        publisher: $publisher,
        published_year: $published_year) {
            updated_date
        }
    }
`;

class Edit extends Component {

	render() {
	  let isbn, title, author, description, published_year, publisher;
	  return (
			<Mutation mutation={UPDATE_BOOK} key={ this.props.book._id }>
				{(updateBook, { loading, error }) => (
					<div className="container mt-3">
						<div className="panel panel-default">
							<div className="panel-body">
								<form onSubmit={e => {
									e.preventDefault();
									updateBook({ variables: { id: this.props.book._id, isbn: isbn.value, title: title.value, author: author.value, description: description.value, publisher: publisher.value, published_year: parseInt(published_year.value) } });
									isbn.value = "";
									title.value = "";
									author.value = "";
									description.value = "";
									publisher.value = null;
									published_year.value = "";
								}}>
									<div className="form-group">
										<label htmlFor="isbn">ISBN:</label>
										<input type="text" className="form-control" name="isbn" ref={node => {
											isbn = node;
										}} placeholder="ISBN" defaultValue={this.props.book.isbn} />
									</div>
									<div className="form-group">
										<label htmlFor="title">Title:</label>
										<input type="text" className="form-control" name="title" ref={node => {
											title = node;
										}} placeholder="Title" defaultValue={this.props.book.title} />
									</div>
									<div className="form-group">
										<label htmlFor="author">Author:</label>
										<input type="text" className="form-control" name="author" ref={node => {
											author = node;
										}} placeholder="Author" defaultValue={this.props.book.author} />
									</div>
									<div className="form-group">
										<label htmlFor="description">Description:</label>
										<textarea className="form-control" name="description" ref={node => {
											description = node;
										}} placeholder="Description" cols="80" rows="3" defaultValue={this.props.book.description} />
									</div>
									<div className="form-group">
										<label htmlFor="author">Publisher:</label>
										<input type="text" className="form-control" name="publisher" ref={node => {
											publisher = node;
										}} placeholder="Publisher" defaultValue={this.props.book.publisher} />
									</div>
									<div className="form-group">
										<label htmlFor="author">Published Year:</label>
										<input type="number" className="form-control" name="published_year" ref={node => {
											published_year = node;
										}} placeholder="Published Year" defaultValue={this.props.book.published_year} />
									</div>
									<button type="submit" className="btn btn-dark">Submit</button>
								</form>
								{loading && <p>Loading...</p>}
								{error && <p>Error :( Please try again</p>}
							</div>
						</div>
					</div>
				)}
			</Mutation>
	  );
	}
  }

export default Edit;
