import React from "react";
import "./App.css"

import ErrorBoundary from "./errorboundary";

import SearchBox from "./searchbox";
import CardList from "./cardlist";
import Scroll from "./scroll";

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchField: ""
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response=>response.json())
        .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
        
    }

    render(){
        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchField.toLowerCase());
        })
        if(this.state.robots.length === 0){
            return <h1>LOADING....</h1>
        }
        else{
            return(
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = {filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    } 
}

export default App;
