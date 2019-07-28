/**
 * This header file is for operation heading title.
 */
import React, { Component } from 'react';

// Header component.
class Header extends React.Component {
	/**
	 * This function get operation name and set header title according. 
	 * @param {*} operation 
	 */
	setHeader ( operation ){
		if ( 'show' === operation) {
			return "DISPLAY BOOK DETAILS";
		} else if( 'edit' === operation ) {
			return 'EDIT BOOK INFORMATION';
		} else {
			return "ADD NEW BOOK";
		}
	}

	//Render the actual header with given title.
	render() {
		return (
		<nav className="navbar navbar-expand-sm bg-light">
			{ this.setHeader( this.props.headerTitle ) }
		</nav>
	  );
	}
}

export default Header;
