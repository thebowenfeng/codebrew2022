import "../Styles/Listing.css";

import Bowen from "../Photos/bowen.png";

function Listing() {
	return (
		<div className="listing-container">
			<img
				className="listing-image"
				src={Bowen}
				alt="handsome pic of bowen feng"
			></img>
			<div className="description-container">
                <h1 className="description-title">Bowen Feng</h1>
				<p className="description-body">
					Description of the handsome pic on the right. As you can
					see, shown in the pic on the left is to be auctioned and
					sold.
				</p>
			</div>
            <div className="info-container">
                <h2 className="info-price">$0.53</h2>
                <p className="distance">Located on Mars</p>
            </div>
		</div>
	);
}

export default Listing;
