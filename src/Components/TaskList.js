
import React, {useState} from 'react'
import TaskItem from './TaskItem'

function TaskList(props) {
    
    let [filter, setFilter] = useState(
        {
            filterName: "",
            filterStatus: -1   // -1: all, 1: kich hoat, 0: an
        }
    );

    let {tasks} = props;
    let {filterName, filterStatus} = filter;

    let elems = tasks.map((task, index) => {
        return <TaskItem 
                    key={task.id} 
                    index={index} 
                    task={task}
                    onUpDataStatus = {props.onUpDataStatus} 
                    onDelete={props.onDelete}
                    onUpDate={props.onUpDate}
                />
    });

    const onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;

        props.onFilter(
            name === "filterName" ? value : filter.filterName,
            name === "filterStatus" ? value : filter.filterStatus
        );

        setFilter(
            {
                ...filter,
                [name]: value
            }
        );


    }

	return (
        <table className="table table-striped table-inverse table-responsive table-bordered table-hover">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Ten</th>
                    <th>Trang thai</th>
                    <th>Hanh dong</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                        <input	type="text"
                                className="form-control bxShadow-none" 
                                name="filterName" 
                                placeholder="Tim theo ten"
                                value={filterName}
                                onChange={onChange}
                        />
                        </td>
                        <td>
                            <div style={{position:"relative"}}>
                                <select 
                                    className="form-control bxShadow-none" 
                                    name="filterStatus" 
                                    id=""
                                    value={filterStatus}
                                    onChange={onChange}
                                >
                                    <option value={-1}>Tat ca</option>
                                    <option value={0}>An</option>
                                    <option value={1}>Kich hoat</option>
                                </select>
                                <i className="fas fa-caret-down"
                                    style={{position: "absolute",
                                            right: "7px",
                                            top: "32%"}}
                                ></i>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    
                    {/* <TaskItem /> */}
                    {elems}

                </tbody>
        </table>
  	);
}

export default TaskList;
