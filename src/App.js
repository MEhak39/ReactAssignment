import React, { useState, useEffect } from "react";
import Dropdown from './components/Dropdown';
import KanBanBoard from "./components/KanBanBoard";


const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [groupBy, setGroupBy] = useState(
    localStorage.getItem("kanbanGroupBy") || "status"
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("kanbanSortBy") || "priority"
  );
  const [data, setData] = useState(null);
  const [groupedData, setGroupedData] = useState(null);


  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment ", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Save user's preferences to localStorage
    localStorage.setItem("kanbanGroupBy", groupBy);
    localStorage.setItem("kanbanSortBy", sortBy);

    // Update the Kanban board whenever groupBy or sortBy changes
    if (data) {
      groupAndSortTickets(data, groupBy, sortBy);
    }
  }, [groupBy, sortBy, data]);

  const groupAndSortTickets = (data, groupBy, sortBy) => {
    console.log(data);
    console.log({ groupBy, sortBy });

    // Implement the logic to group and sort tickets based on user's choices
    // You can use JavaScript array methods like map, filter, sort, etc.

    // For simplicity, let's return the tickets without any grouping or sorting

    // Group by logic
    let groupedTickets = groupTicketsBy(data, groupBy);
    

    console.log("groupedTickets", groupedTickets);

    // Sort logic
    const sortedTickets = sortTicketsBy(groupedTickets, sortBy);

    console.log("sortedTickets", sortedTickets);

    return setGroupedData(sortedTickets);
  };

  // Function to group tickets by a specified key
  function groupTicketsBy(data, groupBy) {

    let key = '';
    if (groupBy === "status") {
      key = 'status'
    } else if (groupBy === "user") {
      key = 'userId'
    } else if (groupBy === "priority") {
      key = "priority";
    }

    return data.tickets.reduce((result, ticket) => {
      const groupKey = ticket[key];
      result[groupKey] = result[groupKey] || [];
      result[groupKey].push(ticket);
      return result;
    }, {});
  }

  // Function to sort tickets based on a specified property
  function sortTicketsBy(groupedTickets, sortBy) {
    let key = '';

    if (sortBy === "title") {
      key = "title";

      // Sorting tickets within each group by Title (Ascending)
      for (const grp in groupedTickets) {
        groupedTickets[grp] = groupedTickets[grp].sort((a, b) =>
          a[key].localeCompare(b[key])
        );
      }
    } else if (sortBy = 'priority') {
      key = "priority";

      // Sorting tickets within each group by Priority (Descending)
      for (const grp in groupedTickets) {
        groupedTickets[grp] = groupedTickets[grp].sort(
          (a, b) => b[key] - a[key]
        );
      }
    }

    

    return groupedTickets;
  }


  return (
    <div>
      <button className="display-btn" onClick={() => setIsOpen((prev) => !prev)}>Display</button>

      {/* You can add dropdowns or buttons for users to select grouping and sorting options */}
      {isOpen && (
        <Dropdown
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}

      <div className="kanban-board">
        {/* Kanban board content will be dynamically generated here */}
        {
          groupedData && <KanBanBoard groupedData={groupedData} />
        }
      </div>
    </div>
  );
};

export default App;
