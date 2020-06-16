import React, { Component } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Fundme from "../../ethereum/compiled-fund";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
class ContributeForm extends Component {
  state = {
    value: "",
    loading: false,
    errorMessage: "",
    name:"",
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const Fund = Fundme(this.props.address);
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await Fund.methods.donate(this.state.name).send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });

      Router.replaceRoute(`/funds/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    
    }

    this.setState({ loading: false, value: "" ,name:""});
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <h2><u>Donate</u></h2>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <Input
            value={this.state.name}
            onChange={(event) => this.setState({ name: event.target.value })}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
