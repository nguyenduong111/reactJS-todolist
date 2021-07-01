
import React, {useState} from 'react' 

function Search(props) {

    let [searchKeyWord, setSearchKeyWord] = useState(
        {
            keyWord: ""
        }
    );
    
    let {keyWord} = searchKeyWord;

    const onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;

        setSearchKeyWord(
            {
                ...searchKeyWord,
                [name]: value
            }
        );
    }

    const onSearch = () => {
        props.onSearch(searchKeyWord.keyWord);
    }

	return (
        <div className="col-xs-6 col-lg-6 col-md-6 col-sm-6">
            <div className="search input-group">
                <input 
                    type="text" 
                    name="keyWord" 
                    className="bxShadow-none mt-2 form-control" 
                    placeholder="Nhap tu khoa..."
                    value={keyWord} 
                    onChange={onChange}
                />
                <span className="input-group-btn mt-2">
                    <button type="button" className="btn btn-primary bxShadow-none" onClick={onSearch}>
                        <i className="fas fa-search mr-2"></i>
                        Tim
                    </button>
                </span>
            </div>
        </div>
    );
}

export default Search;
