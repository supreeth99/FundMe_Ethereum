import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Popup,
  Form,
  Input,
  Portal
} from 'semantic-ui-react';
import fundShow from '../funds/show';
import { Link } from "../../routes";
import { Router } from "../../routes";

const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */


const HomepageHeading = () => (
  
  <Container text>
    <Header
      as='h1'
      content='FundMe'
      inverted
      style={{
        fontSize:'4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '1.5em',
      }}
    />
    <Header
      as='h2'
      content='Start Your own fund campaign'
      inverted
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '1.5em',
      }}
    />
    <Link route="/fundpage">
    <Button primary size='huge'>
    
      Get Started
      <Icon name='right arrow' />
    </Button>    
    </Link>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class DesktopContainer extends Component {
  state = {}
  // handleClose = () => this.setState({ open: false })
  // handleOpen = () => this.setState({ open: true })
  

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 500, padding: '4em 0em' }}
            vertical
          >
        <HomepageHeading />
          </Segment>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '5em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              We Help Everyone
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Anyone can create a campaign to raise funds. Follow few easy steps to set up your own fund.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Why do we do it?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Helping even one person who is in need will fullfill our goal.
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
              How can you help them?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Go and donate to various funds to help them achive their goal.
            </p>
          </Grid.Column>
          
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
          <Link route="/fundpage">
          <Button size='huge'>Go Donate</Button>
        </Link>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout
