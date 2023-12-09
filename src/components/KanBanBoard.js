import React from 'react'
import Card from './Card'
import './kanbanboard.css';

const KanBanBoard = ({groupedData}) => {

    const renderGroups = () => {
        console.log("data to render", groupedData);

       return Object.entries(groupedData)
          .map((grp) => {
            const [key, data] = grp;

            return (
              <div className="kanban-grp" key={key}>
                <div className="kanban-header">{key}</div>
                <div className="kanban-body">
                  {data.map((cardData) => (
                    <Card key={cardData.id} data={cardData} />
                  ))}
                </div>
              </div>
            );
          });

    }

  return <div className="kanban-container">{renderGroups()}</div>;
}

export default KanBanBoard;