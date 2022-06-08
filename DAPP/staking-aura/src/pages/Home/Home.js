import React from "react";
import "./Home.css";

import coin from "../../assets/coin.gif";

const Home = () => {
	return (
		<>
			<div className="home-bg pt-20 md:pt-20 px-5 md:px-0">
				{/* <div className="container mx-auto mt-40"> */}
				{/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-20 text-white"> */}
				<div className="flex flex-col px-0 items-center justify-center py-20 text-white h-full lg:flex-row md:px-36">
					<div className="w-full lg:w-1/2">
						<h1 className="text-5xl">
							The <span className="text-primary">digital currency</span> that
							aims to revolutionize
						</h1>
						<p className="pr-20">
							The governance token is a cryptocurrency that allows users to vote
							on changes that they want to see in the projects that are governed
							by the token. Governance tokens allow users to steer the evolution
							of the blockchain architecture as it evolves, in addition to
							directing the establishment of future rules and objectives.
						</p>
						<br />
						<h4>
							The total amount of{" "}
							<span className="text-primary">$AURA is 100,000,000</span>
							<br />
							<span className="text-primary">11,335,135 $AURA</span> were issued
							in the initial circulating supply.
						</h4>
						<div className="flex mt-10 gap-5">
							<div
								onClick={() =>
									window.open(
										"https://www.dextools.io/app/ether/pair-explorer/0xbddd3a50bd2afd27aed05cc9fe1c8d67fcaa3218"
									)
								}
								className="cursor-pointer flex items-center justify-center border border-primary w-3/12 py-2 rounded-md bg-primary text-black transition-all"
							>
								Buy Now
							</div>
							<div
								onClick={() =>
									window.open(
										"https://cloud-pipe-c9a.notion.site/4887ab43a3c44805a60f2c247c690a76"
									)
								}
								className="cursor-pointer flex items-center justify-center border border-primary w-3/12 py-2 text-primary rounded-md hover:bg-primary hover:text-black transition-all"
							>
								Whitepaper
							</div>
						</div>
					</div>
					<div className="mt-10 px-10 md:px-20 md:text-xl text-white">
						<img src={coin} className="h-100 w-100" />
					</div>
				</div>
				{/* </div> */}
			</div>
		</>
	);
};

export default Home;
