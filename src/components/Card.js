import "./Card.css";
function Card({data}){
    
    return (
      <div className="cards">
        <div>
          <h5 className="heading">{data.id}</h5>
          
        </div>
        <div>
          <h3 className="title">Conduct Security Vulnerability Assessment</h3>
        </div>
        <span>... </span>
        <span>o </span>
        <span className="subtext">Feature Request</span>
      </div>
    );
}
export default Card;