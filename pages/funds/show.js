import React, { Component } from "react";
import web3 from "../../ethereum/web3";
import Layout from "../components/Layout";
import Fund from "../../ethereum/compiled-fund";
import { Card, Grid, Button,Header,Container,Segment,Divider,Portal,Form,Input } from "semantic-ui-react";
import Contribute from "../components/donate";
import { Link } from "../../routes";
import { Router } from "../../routes";

class fundShow extends Component {

  state = {
    open: false,
    transferAmount:"",
    errorMessage1: "",
    loading: false,
    errorMessage2:"", 
  }
  static async getInitialProps(props) {
    const fund = Fund(props.query.address); //actual address of the con
    const summary = await fund.methods.getDetails().call();
    const donators = await fund.methods.getDonaterDetails().call();

    return {
      address: props.query.address,
      createrAddress: summary[3],
      balance: summary[2],
      totalContributors: summary[1],
      goal: summary[0],
      creater: summary[5],
      description: summary[4],
      totalContribution: summary[6],
      donators,
    };
  }

  renderdonators(){
    const item = this.props.donators.map((name) => {
      return {
        header: name,
        fluid: true,
      };
    });
    return <Card.Group items={item} />;
  }

  renderCards() {
    const {
      balance,
      creater,
      totalContributors,
      createrAddress,
      description,
      goal,
      address,
      totalContribution
    } = this.props;

    const items = [
      {
        header: creater,
        meta:  "",
        description:"Name of the creater."
         ,
        style: { overflowWrap: "break-word" },
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Balance (wei)",
        description:
          "Current balance of the contract.",
      },
      {
        header: web3.utils.fromWei(totalContribution, "ether"),
        meta: "Total Contribution(wei)",
        description:
          "Total donation recived till date.",
      },
      {
        header: totalContributors,
        meta: "Number of contibutrs",
        description:
          "Total number of donations of donations done so far.",
      },
      
      {
        header: description,
        meta: "Description",
        description: "The Fund objective/description",
      },
      {
        header: goal,
        meta: "Goal",
        description: "The fund goal",
      },
    ];
    return <Card.Group items={items} />;
  }
  handleClose = () => this.setState({ open: false })
  handleOpen = () => this.setState({ open: true })

  onSubmit = async (event) => {
    event.preventDefault();
    const fund = Fund(this.props.address); 
    this.setState({ loading: true, errorMessage2: "" });

    try {
      const accounts = await web3.eth.getAccounts();  
      await fund.methods
        .checkout(this.state.transferAmount)
        .send({
          from: accounts[0],
        });      
        Router.replaceRoute(`/funds/${this.props.address}`);
    } catch (err) {
      console.log("Error:",err);
      this.setState({ errorMessage2: err.message });
      alert(this.state.errorMessage2);
    }
    this.setState({ loading: false });
    this.setState({ open: false });
  };
  render() {
    const { open } = this.state
   
    return (
      <div>
         <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          /> 
      <Container fluid>
      <Segment
            raised
            size="big"
            attached="top"
            inverted
            textAlign='center'
            style={{ minHeight: 120,marginLeft:"0px",marginRight:"0px", padding: '0em',minWidth:"300" }}
          > 
        <Header
          as='h1'
          content='FundMe'
          style={{
            fontSize:'4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '.5em',
          }}
        /> 
        </Segment>
          
    </Container>
        <h3 style={{marginLeft:"15px", marginRight:"15px"}}>fund Details</h3>
        <Grid stackable style={{marginLeft:"15px", marginRight:"15px"}}>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <Contribute address={this.props.address}/>
              <Button
          content='Transfer Funds'
          disabled={open}
          positive
          onClick={this.handleOpen}
          style = {{marginTop:"10px"}}
        />
          <Portal onClose={this.handleClose} open={open} >
          <Segment
            style={{
              left: '75%',
              position: 'fixed',
              top: '38%',
              zIndex: 1000,
            }}
          >
            <h4>Checkout(can be called by the owner [{this.props.creater}])</h4>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <lable>amount to transfer</lable>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.transferAmount}
              onChange={(event) =>
                this.setState({ transferAmount: event.target.value })
              }
            />
          </Form.Field>
          <Button loading={this.state.loading} primary OnClick>
            transfer!
           </Button>
          </Form>
            </Segment>
            </Portal>
            </Grid.Column> 
          </Grid.Row>
          <Divider horizontal>Donators</Divider>
          <Grid.Row>
          {this.renderdonators()}
          </Grid.Row>
 
          
        </Grid>
      </div>
    );
  }
}
export default fundShow;