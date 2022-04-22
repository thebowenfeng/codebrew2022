import "../Styles/Market.css";

import Listing from "../Components/Listing";
import { List } from "@mui/material";

function Market() {
    return (
		<div>
			<div className="search-bar-container">
				<form role="search" action="/" method="get">
					<label htmlFor="header-search">
						<span className="prompt">I'm looking for</span>
					</label>
					<input
						type="text"
						id="header-search"
						placeholder="Items"
						name="s"
					/>
					<button type="submit">Search</button>
				</form>
			</div>
			<div className="content">
				<div className="categories"></div>
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