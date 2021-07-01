
import React, { Component } from 'react'
import './App.css';
import TaskForm from './Components/TaskForm';
import Control from './Components/Control'
import TaskList from './Components/TaskList'

// function App() {
class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tasks: [], // id(unique), name, status
			isDisplayForm: false,
			taskEditing: null,
			filter: {
				name: "",
				status: -1
			},
			keyWord: "",
			sortBy: "",
			sortValue: 1
		};
	}

	// đc gọi 1 lần khi refresh (f5) trang web
	componentWillMount() {
		if(localStorage && localStorage.getItem("tasks")) {
			let tasks = JSON.parse(localStorage.getItem("tasks"));
			this.setState({
				tasks: tasks
			});
		}
		
	}


	// tạo random id cho task----------------------------------
	randomString = () => {
		return Math.floor((1+ Math.random()) * 0x1000).toString(16).substring(1);
	}

	generateID = () => {
		return this.randomString() + this.randomString() + "-" + this.randomString() + "-" + this.randomString() + "-" + this.randomString() + this.randomString() + this.randomString();
	}
	// có thể add thư viện ngoài
	// --------------------------------------------------------

	onToggleForm = () => {
		if(this.state.isDisplayForm && this.state.taskEditing !== null) {
			this.setState(
				{
					isDisplayForm: true, 
					taskEditing: null
				}
			);
		}else {
			this.setState(
				{
					isDisplayForm: !this.state.isDisplayForm, 
					taskEditing: null
				}
			);
		}
	}
	
	onCloseForm = () => {
		this.setState(
			{
				isDisplayForm: false
			}
		);
	}

	onOpenForm = () => {
		this.setState(
			{
				isDisplayForm: true
			}
		);
	}

	onSubmit = (data) => {
		let {tasks} = this.state;
		
		if(data.id === "") {
			data.id = this.generateID();
			tasks.push(data);
		} else {
			let index = this.findIndex(data.id);
			tasks[index] = data;
		}
		
		this.setState(
			{
				tasks: tasks,
				taskEditing: null
			}
		);
		localStorage.setItem("tasks", JSON.stringify(tasks))
	}

	onUpDataStatus = (id) => {
		let {tasks} = this.state;
		let index = this.findIndex(id);
		if(index !== -1) {
			tasks[index].status = !tasks[index].status;
			this.setState({
				tasks: tasks
			});
			localStorage.setItem("tasks", JSON.stringify(tasks));
		}
	}

	onDelete = (id) => {
		let {tasks} = this.state;
		let index = this.findIndex(id);
		if(index !== -1) {
			tasks.splice(index, 1);    // hàm xóa phần tử trong arr
			this.setState({
				tasks: tasks
			});
			localStorage.setItem("tasks", JSON.stringify(tasks));
		}
		this.onCloseForm();

	}

	onUpDate = (id) => {
		let {tasks} = this.state;
		let index = this.findIndex(id);
		let taskEditing = tasks[index];
		this.setState(
			{
				taskEditing: taskEditing
			}
		);
		this.onOpenForm();	
	}

	findIndex = (id) => {
		let {tasks} = this.state;
		let result = -1;
		tasks.forEach((task, index) => {
			if(task.id === id) {
				result = index;
			}
		});
		return result;
	}

	onFilter = (filterName, filterStatus) => {
		filterStatus = parseInt(filterStatus, 10);
		this.setState(
			{
				filter: {
					name: filterName.toLowerCase(),
					status: filterStatus
				}
			}
		);
	}

	onSearch = (keyWord) => {
		this.setState(
			{
				keyWord: keyWord.toLowerCase()
			}
		);
	}

	onSort = async(name, value) => {      // do bất đồng bộ trong JS, console.log đc thực hiện trước setState, nên nếu ko xử 
										  //lý bằng async-await thì log sẽ luôn in ra giá trị trước(giá trị chưa cập nhật) khi setState chạy
		await this.setState(
			{
				sortBy: name,
				sortValue: value
			}
		);

		// console.log(this.state.sortBy, " ", this.state.sortValue);
	}

	render() {

		let {tasks, isDisplayForm, taskEditing, filter, keyWord, sortBy, sortValue} = this.state;
		
		if(filter) {
			if(filter.name) {
				tasks = tasks.filter((task) => {
					return task.name.toLowerCase().indexOf(filter.name) !== -1;
				});
			}
			tasks = tasks.filter((task) => {
				if(filter.status === -1) {
					return tasks;
				} else {
					return task.status === (filter.status === 1 ? true : false);
				}
			});
		}

		if(keyWord) {
			tasks = tasks.filter((task) => {
				return task.name.toLowerCase().indexOf(keyWord) !== -1;
			});
		}

		let elemTaskForm = isDisplayForm ? 
											<TaskForm 
												onSubmit={this.onSubmit} 
												onCloseForm={this.onCloseForm} 
												task={taskEditing}
											/> 
										 : "";

		if(sortBy === "name") {
			tasks.sort((a, b) => {
				if(a.name > b.name) return sortValue;
				else if(a.name < b.name) return -sortValue;
				else return 0;
			});
		} else if(sortBy === "status") {
			tasks.sort((a, b) => {
				if(a.status > b.status) return -sortValue;
				else if(a.status < b.status) return sortValue;
				else return 0;
			});
		}
			

		return (
			<div className="container">
				
				<div className="text-center mt-5">
					<h1>Quan ly công viec (them-sua-xoa)</h1>
					<hr />
				</div>
	
				<div className="row">
	
					<div className={isDisplayForm ? "col-xs-4 col-lg-4 col-md-4 col-sm-4" : "col-xs-0 col-lg-0 col-md-0 col-sm-0"}>
						
						{/* <TaskForm /> */}
						{elemTaskForm}
					
					</div>
	
					<div className={isDisplayForm ? "col-xs-8 col-lg-8 col-md-8 col-sm-8" : "col-xs-12 col-lg-12 col-md-12 col-sm-12"}>
						
						<button type="button" className="btn btn-primary bxShadow-none" onClick={this.onToggleForm}>
							<i className="fas fa-plus mr-2 ml-2"></i>
							Them cong viec
						</button>
							
						<Control 
							onSearch={this.onSearch}
							onSort={this.onSort}
							sortBy={sortBy}
							sortValue={sortValue}
						/>
	
						<div className="row mt-2">
							<div className="col-xs-12 col-lg-12 col-md-12 col-sm-12">
								
								<TaskList 
									onUpDataStatus={this.onUpDataStatus} 
									tasks={tasks} 
									onDelete={this.onDelete}
									onUpDate={this.onUpDate}
									onFilter={this.onFilter}
								/>
	
							</div>
						</div>
	
					</div>
	
				</div>
	
			</div>
		);
	}
}

export default App;
