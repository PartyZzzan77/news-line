import React, { Component } from 'react';
import './App.css';
import { Add } from './components/Add';
import { News } from './components/News';
class App extends Component {

  state = {
    news: null,
    isLoading: false,
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('http://localhost:3000/data/newsData.json')
      .then(response => response.json())
      .then(data => this.setState({ news: data }));
    this.setState({ isLoading: false });

  }

  handleAddNews = (data) => {
    const nextNews = [data, ...this.state.news];
    this.setState({ news: nextNews })
  }
  render() {
    const { news, isLoading } = this.state;

    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загружа...</p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    );
  }
}

export default App;
