import React from 'react'
import T from './T'
import './ListContainer.css'
import StateHub from './StateHub';

export default class ListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.init = false;
        this.state = {
            value: '',
            listOfList: StateHub.titles,
            listLen: StateHub.listLen,
            current: StateHub.current
        };
    }

    render() {
        return (
            <div className='main-layout'>
                <div className='left-sidebar'>
                    <h1 className='main-title'>/bin/list</h1>
                    <div className='title-input-area'>
                        <input
                            id='title-input-bar'
                            className='input input-list-container'
                            placeholder='Input New List Name Here'
                            onChange={ this.handleChange.bind(this) }>
                        </input>
                        <button
                            className='add-new-item add-new-item-list-container'
                            onClick={ this.handleClick.bind(this) }>+
                        </button>
                    </div>
                    <div className='left-sidebar-list'>
                        {this.state.listOfList.map(
                            (item, index) => {
                                return (
                                    <div
                                        key={`list-of-list-item-${index}`}
                                        className={`list-item-area ${this.state.current === index ? 'list-item-area-focus' : null}`}>
                                    <button
                                        key={`list-of-list-${index}`}
                                        className='list-of-list'
                                        onClick={ () => this.setState({current: index}) }>{item} 
                                    </button>
                                    <button
                                        key={`list-of-list-del-${index}`}
                                        className='list-buttons list-buttons-list-container'
                                        onClick={
                                            () => {
                                                var { listOfList, current } = this.state;
                                                if(current + 2 > StateHub.listLen) --current;
                                                listOfList.splice(index, 1);
                                                StateHub.arrayOfArray.splice(index, 1);
                                                StateHub.completeState.splice(index, 1);
                                                --StateHub.listLen;
                                                localStorage.setItem('StateHubInfo', JSON.stringify(StateHub));
                                                this.setState({
                                                    listOfList: listOfList,
                                                    listLen: StateHub.listLen,
                                                    current: current
                                                });
                                            }
                                        }>×
                                    </button>
                                    </div>
                                );
                            }
                        )}
                        <button className='clear-all' onClick={ this.handleClearAll.bind(this) }>Clear</button>
                    </div>
                </div>
                {
                    StateHub.listLen > 0 ?
                    <div
                        key={`listarea`}
                        className='listarea'>
                        <T title={ this.state.listOfList[this.state.current] } arrayIndex={ this.state.current } />
                    </div> : <div className='empty-hint'><span className='first-letter'>E</span>mpty Schedule.</div>
                }
            </div>
        );
    }

    handleChange(e) {
        const { value } = e.target;
        this.setState({
          text: value
        });
        if(this.init === false) this.initEventListener();
    }
    
    handleClick() {
        var { text } = this.state;
        var { length } = StateHub.titles;
        ++StateHub.listLen;
        document.getElementById('title-input-bar').value = '';
        StateHub.titles.push( text ? text : 'untitled' );
        StateHub.arrayOfArray.push([]);
        StateHub.completeState.push([]);
        localStorage.setItem('StateHubInfo', JSON.stringify(StateHub));
        this.setState({
            listOfList: StateHub.titles,
            listLen: StateHub.listLen,
            text: '',
            current: length
        });
    }

    handleClearAll() {
        StateHub.titles = [];
        StateHub.arrayOfArray = [];
        StateHub.completeState = [];
        StateHub.listLen = 0;
        localStorage.setItem('StateHubInfo', JSON.stringify(StateHub));
        this.setState({
            listOfList: StateHub.titles,
            listLen: StateHub.listLen,
            current: 0
        });
    }

    initEventListener() {
        const input = document.getElementById('title-input-bar');
        const that = this;
        this.init = true;
        input.addEventListener('keyup', function(e) {
            if(e.key === 'Enter') {
                that.handleClick();
            }
        })
    }
};