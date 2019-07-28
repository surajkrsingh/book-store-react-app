import React, { Component } from 'react';
class Show extends Component {  
	render () {
	  return (
		<table className="table table-hover table-bordered table-striped mt-3 text-white">
			<thead>
				<th>Key</th>
				<th>Value</th>
			</thead>
			<tr>
				<td>Book ID</td>
				<td>{this.props.book._id}</td>
			</tr>
			<tr>
				<td>Book Title</td>
				<td>{this.props.book.title}</td>
			</tr>
			<tr>
				<td>Book Author</td>
				<td>{this.props.book.author}</td>
			</tr>
			<tr>
				<td>Book Description</td>
				<td>{this.props.book.description}</td>
			</tr>
			<tr>
				<td>Book Publish Year</td>
				<td>{this.props.book.published_year}</td>
			</tr>
			<tr>
				<td>Book Publisher</td>
				<td>{this.props.book.publisher}</td>
			</tr>
			<tr>
				<td>Book Update Time</td>
				<td>{this.props.book.updated_date}</td>
			</tr>
		</table>
	  );
	}
  };
  export default Show;