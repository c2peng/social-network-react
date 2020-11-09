import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import Profile from "../components/profile/Profile";
import StaticProfile from "../components/profile/StaticProfile";

class user extends Component {
  state = {
    profile: null,
  };

  async componentDidMount() {
    const handle = this.props.match.params.handle;
    console.log(this.props.match);
    this.props.getUserData(handle);
    try {
      const res = await axios.get(`/user/${handle}`);
      this.setState({ profile: res.data.user });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { screams, loading } = this.props.data;
    const screamsMarkup = loading ? (
      <p>Loading data ...</p>
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <p>Loading profile...</p>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(user);
