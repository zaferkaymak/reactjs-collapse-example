import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; // request

import {editListData,openClose} from './components/general-function';
import Head from './components/head';
import List from './components/list';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            list : []
        }
        const dataListURL = "https://gist.githubusercontent.com/burakcan/ca77e8fc11a1455cc1962ad7318b8fbc/raw/b446a09888882df7273f17d2ff7ebf4820de4152/dataset.json"; 
        this.getDataList(dataListURL);
    }
    getDataList(dataListURL){
        const self = this;
        const newData = [];
        axios.get(dataListURL, {
            firstName: 'Fred',
        })
        .then(function (response) {
            const requestData = response.data;
            const selectedData = editListData(requestData);
            self.setState({list: selectedData});
        })
        .catch(function (error) {
            console.log(error);
        });        
    }

    render(){
        return (
            <div className="render-container">
                <Head />
                <List listData={this.state.list} openDropdown={(id)=>openClose(id)} />
            </div>
        )
    }
}
ReactDOM.render(<Main />, document.querySelector('#root'));
