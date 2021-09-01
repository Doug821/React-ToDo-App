import React from 'react';
import List from './List';
import Item from './Item';
import { FiPlus } from 'react-icons/fi';

const SAVED_ITEMS = 'savedItems';
const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : { name: 'User' };

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const date = new Date();
const formatedDate = `
    ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} 
    ${months[(date.getMonth())]}  
    ${date.getFullYear()}`;

export default class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = { inputValue: '', item: [], doneTasks: 0 };

        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onItemDeleted = this.onItemDeleted.bind(this);
        this.markItem = this.markItem.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.item !== prevState) {
            localStorage.setItem(SAVED_ITEMS, JSON.stringify(this.state.item));
        }
    }

    componentDidMount() {
        let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS));
        if (savedItems) {
            this.setState({ item: savedItems });
        }
    }

    handleChange(event) {
        let inputText = event.target.value;
        this.setState({ inputValue: inputText })
    }

    addItem(event) {
        event.preventDefault();
        let it = new Item(this.state.inputValue);

        if (this.state.inputValue) {
            this.setState({ item: [...this.state.item, it] });
        }

        this.setState(() => { return { inputValue: '' } })
    }

    onItemDeleted(itemToDelete) {
        let filteredItems = this.state.item.filter(it => it.id !== itemToDelete.id);
        this.setState({ item: filteredItems });
    }

    markItem(itemToMark) {
        let updatedItems = this.state.item.map(it => {
            if (it.id === itemToMark.id) {
                it.done = !it.done;
            }
            return it;
        });
        let doneItems = this.state.item.filter(it => it.done === true);
        this.setState({ doneTasks: doneItems.length });
        this.setState({ item: updatedItems });
    }

    render() {
        return (
            <div className="todoWrapper">
                <header>
                    <div className="userContainer">
                        <img src={user.avatar_url} alt="" />
                        <div className="userName">
                            <h1>{user.name}</h1>
                            <h3>{user.login}</h3>
                        </div>
                    </div>
                    <div className="date">
                        <span>
                            Today,
                        </span>
                        <p>
                            {formatedDate.toString()}
                        </p>
                    </div>
                </header>
                <form action="">
                    <input onChange={this.handleChange} type="text" value={this.state.inputValue} placeholder="Add a new task" />
                    <button onClick={this.addItem}><FiPlus /></button>
                </form>
                <div className="allTasks">
                    {`${this.state.doneTasks}----${this.state.item.length}  `}
                    <div className="percentBar" >
                        <div className="progress" style={{ width: `${parseInt((100 / this.state.item.length) * this.state.doneTasks)}%` }} ></div>
                    </div>
                </div>
                <List
                    list={this.state.item}
                    onItemDeleted={this.onItemDeleted}
                    markItem={this.markItem}
                />
            </div>

        )
    }
}
