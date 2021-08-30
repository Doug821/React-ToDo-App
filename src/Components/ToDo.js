import React from 'react';
import List from './List';
import Item from './Item';

export default class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = { inputValue: '', item: [], }

        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onItemDeleted = this.onItemDeleted.bind(this);
        this.markItem = this.markItem.bind(this);
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
        console.log(itemToMark);
        let updatedItems = this.state.item.map(it => {
            if (it.id === itemToMark.id) {
                it.done = !it.done;
            }
            return it;
        });
        this.setState({ item: updatedItems });
    }

    render() {
        return (
            <>
                <h1>Lista de tarefas</h1>
                <form action="">
                    <input onChange={this.handleChange} type="text" value={this.state.inputValue} />
                    <button onClick={this.addItem}>Add</button>
                </form>
                <List
                    list={this.state.item}
                    onItemDeleted={this.onItemDeleted}
                    markItem={this.markItem}
                />
            </>
        )
    }
}
