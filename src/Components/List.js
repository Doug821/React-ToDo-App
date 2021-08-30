import React from 'react';

export default class List extends React.Component {
    render() {
        return (
            <ul>
                {this.props.list ?
                    this.props.list.map((e) => (
                        <li className={e.done ? 'blue' : 'red'} key={e.id}>
                            <button onClick={() => this.props.markItem(e)}><span>✔️</span></button>
                            {e.text}
                            <button onClick={() => this.props.onItemDeleted(e)}>Delete</button>
                        </li>
                    )) :
                    ''
                }
            </ul>
        )
    }
}