
import React, { Component } from 'react'

// function TaskForm(props) {
class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: false
        };
    }

    // chạy khi component chưa đc kích hoạt
    componentWillMount() {
        if(this.props.task) {
            this.setState(
                {
                    id: this.props.task.id,
                    name: this.props.task.name,
                    status: this.props.task.status
                }
            );
        }
    }

    // khi component đã đc kích hoạt nhưng muốn cập nhật props luôn
    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.task) {
            this.setState(
                {
                    id: nextProps.task.id,
                    name: nextProps.task.name,
                    status: nextProps.task.status
                }
            );
        }else if(nextProps && nextProps.task === null) {
            this.setState(
                {
                    id: "",
                    name: "",
                    status: false        
                }
            );
        }
    }     

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;

        if(name === "status") {
            value = target.value === "true" ? true : false;
        }

        
        this.setState(
            {
                [name]: value
            }
        );
    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);

        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        // setWork(
        //     {
        //         name: "",
        //         status: false
        //     }
        // );
        this.setState(
            {
                name: "",
                status: false
            }
        );
    }

    render() {
        
        let {id} = this.state;

        return (
            <div className="card">
                <div className="card-header pos-relative " style={{backgroundColor: "antiquewhite"}}>
                    {id === "" ? "Them cong viec" : "Cap nhat cong viec"}
                    <i className="fas fa-times-circle icon-close" onClick={this.onCloseForm}></i>
                </div>
                <div className="card-body">
                    <form onSubmit={ this.onHandleSubmit } >
                        <div className="form-group">
                            <label> Ten: </label>
                            <input 
                                type="text" 
                                className="form-control bxShadow-none" 
                                placeholder="" 
                                name="name"
                                value={ this.state.name }
                                onChange= {this.onChange} 
                            />
                        </div>
                            
                        <div className="form-group mt-2">
                            <label> Trang thai: </label>
                            <div style={{position:"relative"}}>
                            <select 
                                className="form-control bxShadow-none" 
                                name="status"
                                value={ this.state.status }
                                onChange= {this.onChange} 
                            > 
                                <option value={true}> Kich hoat </option>
                                <option value={false}> An </option>
                            </select>
                                <i className="fas fa-caret-down"
                                    style={{position: "absolute",
                                            right: "7px",
                                            top: "32%"}}
                                ></i>
                            </div>
                        </div>
    
                        <button type="submit" className="btn btn-warning mt-2 bxShadow-none"> 
                        <i className="fas fa-plus mr-2"></i>
                            Luu lai 
                        </button>
                        <button type="button" className="btn btn-danger mt-2 ml-2 bxShadow-none" onClick={ this.onClear } > 
                            <i className="fas fa-times mr-2"></i>
                            Huy bo 
                        </button>
                    </form>
    
    
                </div>
            </div>
        );
    }

}

export default TaskForm;
