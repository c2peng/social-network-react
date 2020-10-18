import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

export class home extends Component {
	state = {
		screams: null,
	};
	componentDidMount() {
		axios
			.get("/screams")
			.then((result) => {
				console.log(result.data);
				this.setState({
					screams: result.data,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}
	render() {
		let recentScreamsMarkup = this.state.screams ? (
			this.state.screams.map((scream) => {
				return <p>{scream.body}</p>;
			})
		) : (
			<p>Loading...</p>
		);
		return (
			<Grid container spacing={3}>
				<Grid item sm={8} xs={12}>
					{recentScreamsMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					Profile
				</Grid>
			</Grid>
		);
	}
}

export default home;
