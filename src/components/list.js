import React, {Component} from 'react';

class List extends Component{
    constructor(props){
        super(props);
        this.renderList = this.renderList.bind(this);
        this.clickedDropdown = this.clickedDropdown.bind(this);
    }
    clickedDropdown(event,id){
        this.props.openDropdown(id);
    }
    renderList(value){
        let classValue = "listed";
        if(value.parentID == 0 ||value.parentID == null || value.open)
            classValue += " active";
        
        const result = this.props.listData.filter(val => val.parentID == value.ID);
        let dropdownButtonClass = result.length > 0 ? '<span class="action-button"></span>' : '';

        let onClick = (event)=>this.clickedDropdown(event,value.ID);
        return (
            <tr
                className={classValue} 
                key={value.ID}
                data-id={value.ID}
                data-parentid={value.parentID}
            >
                <td>{value.ID}</td>
                <td>{value.City}</td>
                <td>{value.Name}</td>
                <td>{value.Phone}</td>
                <td>{value.parentID}</td>
                <td>
                    <div dangerouslySetInnerHTML={{ __html: dropdownButtonClass }} onClick={onClick} />
                </td>
            </tr>
        );
    }
    render(){
        if(this.props.listData.length == 0){
            return(
                <div className="loader-area">Loading</div>
            )
        }
        return(
            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>City</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Parent ID</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.props.listData.map(this.renderList)}
                </tbody>
            </table>
        );
    }
}


export default List;