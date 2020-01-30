import React, { Component } from "react";
import Product from "./Product";
import axios from "axios";
import { connect } from "react-redux"; //to connect react&redux
import * as cartAction from "../actions/cartAction";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      addedlist: [],
      imageData: [],
      updatedList: [],
      searchBoxValue: ""
    };
  }
  componentDidMount() {
    axios
      .get("https://nodesense.github.io/api/products.json")
      .then(response => {
        const responseData = response && response.data;
        for (var i = 0; i < responseData.length; i++) {
          Object.assign(responseData[i], { Action: "" });
        }
        this.setState({ list: responseData });
      });
    this.setState({ addedlist: this.props.addlist });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ addedlist: nextProps.addlist });
  }

  cartSelected = productSelected => {
    //productSelected.uniqueId = Math.floor(Math.random() * 1000);
    const updatedIdobj = {...productSelected, uniqueId: Math.floor(Math.random() * 1000)};
    this.props.actions(updatedIdobj);
    alert(`${updatedIdobj.name} is added to your wish-list         ${JSON.stringify(updatedIdobj)}`);
  };

  handleInputChanged = event => {
    let itemSearch = event.target.value;
    let { list } = this.state;

    list = list.filter(item => {
      return item.name.toLowerCase().search(itemSearch.toLowerCase()) !== -1;
    });
    this.setState({ updatedList: list });
    this.setState({ searchBoxValue: event.target.value });
  };

  render() {
    let arr1;
    if (
      this.state.updatedList.length === 0 &&
      this.state.searchBoxValue === ""
    ) {
      arr1 = this.state.list;
      arr1.push(...this.state.addedlist);
    } else if (
      this.state.updatedList.length === 0 &&
      this.state.searchBoxValue !== ""
    ) {
      arr1 = "Sorry..... Out of Stock or Item not found -__-";
    } else {
      arr1 = this.state.updatedList;
    }

    return (
      <div>
        <Product
          list={arr1}
          handleInputChanged={this.handleInputChanged}
          cartSelected={this.cartSelected}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addlist: state.cart.productItems
  };
};

const mapDispatchToProps = {
  actions: cartAction.addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
