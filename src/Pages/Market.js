import "../Styles/Market.css";

import Listing from "../Components/Listing";
import { List } from "@mui/material";

function Market() {
    return (
		<div className="market-page">
			<div className="search-bar-container">
				<form role="search" action="/" method="get">
					<label htmlFor="header-search">
						<p id="search-label">I'm looking for</p>
					</label>
					<input
						type="text"
						id="header-search"
						placeholder="Items"
						name="s"
					/>
					<button id="submit-button" type="submit">
						<p>GO</p>
					</button>
				</form>
			</div>
			<div className="content">
				<div className="categories">
                    <h1>Some categories</h1>
                </div>
				<div className="listings">
					<Listing />
					<Listing />
					<Listing />
					<Listing />
					<Listing />
					<Listing />
					<Listing />
					<Listing />
					<Listing />
				</div>
			</div>
		</div>
	);
}

export default Market;