import React from 'react';
import { ImRadioUnchecked, ImRadioChecked2, ImBin2 } from 'react-icons/im';

export default class List extends React.Component {
    render() {
        return (
            <ul>
                {this.props.list ?
                    this.props.list.map((e) => (
                        <li key={e.id}>
                            <div className="task">
                                <button onClick={() => this.props.markItem(e)}>
                                    {e.done ? (
                                        <span><ImRadioChecked2 /></span>
                                    ) :
                                        (
                                            <span><ImRadioUnchecked /></span>
                                        )}
                                </button>
                                <span>{e.text}</span>
                            </div>
                            <button onClick={() => this.props.onItemDeleted(e)}><ImBin2 /></button>
                        </li>
                    )) :
                    <li>No tasks to do</li>
                }
            </ul>
        )
    }
}