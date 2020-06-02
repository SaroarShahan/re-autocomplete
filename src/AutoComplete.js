import React, { Component, createRef } from 'react';
import PropTypes from "prop-types"
import "./autocomplete.scss"

class AutoComplete extends Component {
  state = {
    text: "",
    selected: [],
    suggestions: [],
    data: []
  }
  myRef = createRef()

  componentDidMount() {
    this.setState({ data: this.props.items })
    document.addEventListener("mousedown", this._handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this._handleClickOutside);
  }

  _handleClickOutside = (e) => {
    const { current } = this.myRef
    
    if (current && !current.contains(e.target)) {
      this.setState({ display: false})
    }
  }

  _handleDispaly = () => {
    this.setState({display: true})
  }

  _handleSearch = (e) => {
    const { value } = e.target
    let suggestions = []
    if (value.length > 0) {
      const {data} = this.state
      const regex = new RegExp(`^${value}`, 'i')

      suggestions = data.filter(v => regex.test(v))
    }
    this.setState({ suggestions, text: value })
  }

  _handleSelected = selected => {
    const { data } = this.state
    const index = data.indexOf(selected)
    const newSelected = data.splice(index, 1)

    this.setState(prevState => {
      return { selected: [...prevState.selected, ...newSelected], suggestions: [], text: '', display: false }
    })
  }
  
  renderListItem = () => {
    const { suggestions } = this.state
    
    if (suggestions.length === 0) {
      return (
        <div className="no-items">
          <span>No Search found</span>
        </div>
      )
    }

    return (
      <ul className="suggestionsWrapper">
        {suggestions.map((item) => (
          <li key={`suggestion-${item}`} onClick={() => this._handleSelected(item)}>{item}</li>
        ))}
      </ul>
    )
  }

  renderSeletedItem = () => {
    const { selected } = this.state
    if (selected.length === 0) return null;

    return (
      <ul className="selectedWrapper">
        {selected.map((item) => (
          <li key={`selected-${item}`}>{item}</li>
        ))}
      </ul>
    )
  }


  render() {
    const { text, display } = this.state
  
    return (
      <div className="autoCompleteOuter">
        <div ref={this.myRef} className="autoCompleteInner">
          <input placeholder="Search here..." value={text} onClick={this._handleDispaly} onChange={this._handleSearch} />
          {display && this.renderListItem()}
        </div>
        {this.renderSeletedItem()}
      </div>
    );
  }
}

AutoComplete.propTypes = {
  items: PropTypes.array.isRequired
}

export default AutoComplete;