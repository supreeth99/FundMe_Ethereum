import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/Factory_instance";
import Layout from "./components/Layout";
import { Link } from "../routes";
import HomePage from "./components/HomePage";

class FundIndex extends Component {
  render() {
    return (
      <Layout>
        <HomePage />
      </Layout>
    );
  }
}

export default FundIndex;