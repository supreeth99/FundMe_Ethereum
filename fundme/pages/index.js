import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../../ethereum/Factory_instance";
//import Layout from "../components/Layout";
//import { Link } from "../routes";
class FundIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getActiveFunds().call();

    return { campaigns };
  }

  renderfunds() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (""
        //   <Link route={`/campaigns/${address}`}>
        //     <a>View Campaign</a>
        //   </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      
        <div>
          <h3>Active Funds</h3>
          {this.renderfunds()}
        </div>
    );
  }
}
export default FundIndex;
