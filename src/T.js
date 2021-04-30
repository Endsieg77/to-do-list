import React from 'react'
import './T.css'
import StateHub from './StateHub'

export default class T extends React.Component {
    constructor(props) {
        super(props);
        this.init = false;
        var { arrayIndex } = this.props;
        var { arrayOfArray, completeState } = StateHub;
        arrayIndex = parseInt(arrayIndex);
        this.state = {
            value: '',
            todoArr: arrayOfArray[arrayIndex],
            hasCompleted: completeState[arrayIndex]
        };
    }
  
    render() {
        return(
            <div>
            <div className='to-do-list'>
                <h1 className='to-do-list-title'>{ this.props.title ? `- ${ this.props.title } -` : '- TO DO LIST -' }</h1>
                <h2>---------------------------------------------------------------</h2>
                <div className='list-container'>
                <input
                    className='input'
                    id={ `list` }
                    placeholder='Things u Will Pigeon'
                    onChange = { this.handleChange.bind(this) }>
                </input>
                <button
                    onClick = { this.handleClick.bind(this) }
                    className='add-new-item add-new-item-t'>+
                </button>
                {
                    StateHub.arrayOfArray[this.props.arrayIndex].length > 0 ?
                    StateHub.arrayOfArray[this.props.arrayIndex].map((item, index) => {
                        return (
                            <li key={ `list-item-${ index }-${ this.arrayIndex }`}
                                className={ StateHub.completeState[this.props.arrayIndex][index] ? 'list-items list-items-completed': 'list-items'}>
                            {item}
                            <button
                                className={ StateHub.completeState[this.props.arrayIndex][index] === false ? 'tick-button' : 'tick-button tick-button-focus' }
                                onClick={
                                    () => {
                                        StateHub.completeState[this.props.arrayIndex][index] = Math.abs(StateHub.completeState[this.props.arrayIndex][index] - 1);
                                        localStorage.setItem('StateHubInfo', JSON.stringify(StateHub));
                                        this.setState({ hasCompleted: StateHub.completeState[this.props.arrayIndex] })
                                    }
                                }>✔
                            </button>  
                            <button
                                onClick={
                                    () => {
                                        var { todoArr, hasCompleted } = this.state;
                                        todoArr.splice(index, 1);
                                        hasCompleted.splice(index, 1);
                                        localStorage.setItem('StateHubInfo', JSON.stringify(StateHub));
                                        this.setState({ todoArr: todoArr, hasCompleted: hasCompleted });
                                    }
                                }
                                className='list-buttons list-buttons-t'>×
                            </button>
                            </li>
                        );
                    }) : <div className='list-items'>明天该鸽什么好呢？</div>
                }
            </div>
          </div>
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
        document.getElementById('list').value = '';
        if(this.state.text) {
            var { text } = this.state;
            var { arrayIndex } = this.props;
            StateHub.arrayOfArray[arrayIndex].push(text);
            StateHub.completeState[arrayIndex].push(false);
            localStorage.setItem('StateHubInfo', JSON.stringify(StateHub));
            this.setState({
                todoArr: StateHub.arrayOfArray[arrayIndex],
                hasCompleted: StateHub.completeState[arrayIndex]
            });
        }
        this.setState({
            text: ''
        });
    }

    initEventListener() {
        const input = document.getElementById('list');
        const that = this;
        this.init = true;
        input.addEventListener('keyup', function(e) {
            if(e.key === 'Enter')
                that.handleClick();
        })
    }
  }