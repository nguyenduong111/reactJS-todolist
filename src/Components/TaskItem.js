
import React from 'react'

function TaskList(props) {

    let {task, index} = props;

    let onUpDataStatus = () => {
        props.onUpDataStatus(task.id);
    }

    let onDelete = () => {
        props.onDelete(task.id);
    }

    let onUpDate = () => {
        props.onUpDate(task.id);
    }

	return (
        <tr>
            <td> {index + 1} </td>
            <td> {task.name} </td>
            <td className="text-center">
                <span 
                    className="cursor-pointer" 
                    style={task.status === true ? {backgroundColor:"red", color:"white"} : {backgroundColor:"green", color:"white"}}
                    onClick={onUpDataStatus}
                >
                    {task.status === true ? "Kich hoat" : "An"}
                </span>
            </td>
            <td className="text-center">
            <button type="button" className="btn btn-warning mt-2" onClick={onUpDate} > 
                <i className="fas fa-pen mr-2"></i>
                Sua 
            </button>
            <button type="button" className="btn btn-danger mt-2 ml-2" onClick={onDelete} > 
                <i className="fas fa-trash-alt mr-2"></i>
                Xoa
            </button>
            </td>
        </tr>
  	);
}

export default TaskList;
