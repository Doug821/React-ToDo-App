import React, { useEffect, useState } from 'react';
import List from './List';
import Item from './Item';
import { FiPlus } from 'react-icons/fi';

const SAVED_ITEMS = 'savedItems';

export default function Todo() {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);
    const [doneTasks, setDoneTasks] = useState(0)

    const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : { name: 'User' };

    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const date = new Date();
    const formatedDate = `
    ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} 
    ${months[(date.getMonth())]}  
    ${date.getFullYear()}`;

    useEffect(() => {
        let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS));
        if (savedItems) {
            setItems(savedItems);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(SAVED_ITEMS, JSON.stringify(items));
    }, [items]);

    function addItem(e) {
        e.preventDefault();
        let it = new Item(inputValue);

        if (inputValue) {
            setItems([...items, it]);
        }
        setInputValue('');
    }

    function onItemDeleted(itemToDelete) {
        let filteredItems = items.filter(it => it.id !== itemToDelete.id);
        setItems(filteredItems);
    }

    function markItem(itemToMark) {
        let updatedItems = items.map(it => {
            if (it.id === itemToMark.id) {
                it.done = !it.done;
            }
            return it;
        });

        setItems(updatedItems);
        let doneItems = items.filter(it => it.done === true);
        setDoneTasks(doneItems.length);
    }

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
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={inputValue}
                    onChange={(e) => { setInputValue(e.target.value) }}
                />
                <button onClick={addItem}><FiPlus /></button>
            </form>
            <div className={items.length === 0 ? "hide" : "allTasks"}>
                <p>All the tasks</p>
                <div className="taskCount">
                    <span>{`${doneTasks} / ${items.length}`}</span>
                    <div className="percentBar" >
                        <div className="progress" style={{ width: `${parseInt((100 / items.length) * doneTasks)}%` }} ></div>
                    </div>
                </div>
            </div>
            <List
                list={items}
                onItemDeleted={onItemDeleted}
                markItem={markItem}
            />
        </div>
    )
}