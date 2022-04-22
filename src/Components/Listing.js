import "../Styles/Listing.css";

function Listing(props) {
	return (
		<div className="listing-container">
			<img
				className="listing-image"
				src={props.src}
			/>
			<div className="description-container">
                <h1 className="description-title">{props.title}</h1>
				<p className="description-body">
					{props.description}
				</p>
			</div>
            <div className="info-container">
                <h2 className="info-price">${props.price}</h2>
                <p className="distance">{props.location}</p>
            </div>
		</div>
	);
}

export default Listing;
