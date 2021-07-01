
import React from 'react'
import Search from './Search'
import Sort from './Sort'

function Control(props) {
	return (
        <div className="row mt-10">
            
            <Search onSearch={props.onSearch} />
                    
            <Sort 
                onSort={props.onSort} 
                sortBy={props.sortBy}
				ortValue={props.sortValue} />

        </div>
  	);
}

export default Control;
