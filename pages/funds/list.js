import React, { Component } from "react";
import { Card, Button, Portal,Segment,Header,Grid,Form,Input,Container } from "semantic-ui-react";
import factory from "../../ethereum/Factory_instance";
import Layout from "../components/Layout";
import { Link } from "../../routes";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
class FundIndex extends Component {
  state = {
    open: false,
    goal: "",
    description:"",
    cname:"",
    errorMessage: "",
    loading: false, 
  }

  handleClose = () => this.setState({ open: false })
  handleOpen = () => this.setState({ open: true })
  static async getInitialProps() {
    const campaigns = await factory.methods.getActiveFunds().call();
console.log("props");
    return { campaigns };
  }

  renderfunds() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/funds/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }
  onSubmit = async (event) => {
    event.preventDefault();
    
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();  
      await factory.methods
        .createFund(this.state.goal,this.state.cname,this.state.description)
        .send({
          from: accounts[0],
        });
      
        Router.replaceRoute(`/fundpage`);
    } catch (err) {
      console.log("Error:",err);
      this.setState({ errorMessage: err.message });
      alert(this.state.errorMessage);
    }
    this.setState({ loading: false });
    this.setState({ open: false });
    
  };
  render() {
    const { open } = this.state
    return (
      
      <Layout >
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
      <Grid stackable style={{marginLeft:"15px", marginRight:"15px",marginTop:"10px"}}>
           <Grid.Column width={10}>
            <h2>Active Funds</h2> 
            {this.renderfunds()}
            </Grid.Column>
            <Grid.Column width={2} style={{marginLeft:"250px", marginTop:"30px"}}>
        <Button
          content='Create Your Own Fund'
          disabled={open}
          positive
          onClick={this.handleOpen}
        />

        <Portal onClose={this.handleClose} open={open} >
          <Segment
            style={{
              left: '75%',
              position: 'fixed',
              top: '40%',
              zIndex: 1000,
            }}
          >
           <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <lable>Goal</lable>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.goal}
              onChange={(event) =>
                this.setState({ goal: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <lable>Name</lable>
            <Input
              value={this.state.cname}
              onChange={(event) =>
                this.setState({ cname: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <lable>Description</lable>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          
            <Button
              content='Close'
              negative
              onClick={this.handleClose}
            />
            <Button loading={this.state.loading} primary OnClick>
            Create
           </Button>
           </Form>
            </Segment>
           </Portal>
            </Grid.Column>
            </Grid>
            </Layout>
    );
  }
}
export default FundIndex;
