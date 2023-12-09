import React from 'react';
import './Dropdown.css';

const Dropdown =(props)=>{
    const { groupBy, setGroupBy, sortBy, setSortBy } = props;
    

   
    return (
      <div className="dropdown">
        <div className='hehe'>
          Group By:
          <select className='grpBy' onChange={(e) => setGroupBy(e.target.value)} value={groupBy}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
          </div>
          <div>
          Sort By:
          <select className="sortBy" onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    );
};
export default Dropdown;