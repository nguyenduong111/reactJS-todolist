
import React, {Component} from 'react'

// function Sort(props) {
class Sort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortSet: {
                name: "",
                value: 1
            }
        };
    }

    onClick = async(sortName, sortValue) => {
        // let name = sortName;
        // let value = sortValue;
        await this.setState(
            {
                sortSet: {
                    name: sortName,
                    value: sortValue
                }
            }
        );

        // console.log(this.state);

        this.props.onSort(sortName, sortValue);
        
    }   

    
    render() {

        return (
            <div className="col-xs-6 col-lg-6 col-md-6 col-sm-6">
                <div className="dropdown mt-2">
                    <button 
                        className="btn btn-primary dropdown-toggle bxShadow-none" 
                        type="button" 
                        id="dropdownMenuButton1" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false" 
                    >
                                Sap xep
                    </button>
                    
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li className="pos-relative" onClick={() => this.onClick("name", 1) } ><a className="dropdown-item" href="#">
                            <i className="fas fa-sort-alpha-down mr-2"></i>
                            A-Z
                            <i className= {(this.state.sortSet.name === "name" && this.state.sortSet.value === 1) ? "fas fa-check icon-check" : ""} > </i>
                        </a></li><hr />
                        <li className="pos-relative" onClick={() => this.onClick("name", -1) } ><a className="dropdown-item" href="#">
                            <i className="fas fa-sort-alpha-down-alt mr-2"></i>
                            Z-A
                            <i className= {(this.state.sortSet.name === "name" && this.state.sortSet.value === -1) ? "fas fa-check icon-check" : ""} > </i>
                        </a></li><hr />
                        <li className="pos-relative" onClick={() => this.onClick("status", 1) } ><a className="dropdown-item" href="#">
                            Kich hoat
                            <i className= {(this.state.sortSet.name === "status" && this.state.sortSet.value === 1) ? "fas fa-check icon-check" : ""} > </i>
                        </a></li><hr />
                        <li className="pos-relative" onClick={() => this.onClick("status", -1) } ><a className="dropdown-item" href="#">
                            An
                            <i className= {(this.state.sortSet.name === "status" && this.state.sortSet.value === -1) ? "fas fa-check icon-check" : ""} > </i>
                        </a></li>
                    </ul>
                </div>
            </div>
          );
    }

}

export default Sort;
