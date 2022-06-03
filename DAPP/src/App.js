import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComingSoon from "./pages/coming soon/ComingSoon";
import Nav from "./pages/Shared/Nav";
// import Pool from "./pages/Staking/Pool";
import Web3 from "web3";
import Staking from "./pages/Staking/Staking";
import Reward from "./pages/Staking/Reward";

import { AppContext } from "./context/AppContext";
import LoadingOverlay from "react-loading-overlay";
import Home from "./pages/Home/Home";
require("dotenv").config();

// const { REACT_APP_STAKING_CONTRACT_ADDRESS } = process.env;

function App() {
	const scrollRef = React.createRef();
	const Context = useContext(AppContext);

	useEffect(() => {
		console.log(Context.connected, Context.connectedAccount, Context.isLoading);
		if (Context.connected && !Context.isLoading) {
			Context.getData();
		}
	}, [Context.isLoading, Context.connected]);

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", async (metaMaskAccount) => {
				if (metaMaskAccount.length > 0) {
					console.log(metaMaskAccount);
					window.web3 = new Web3(window.ethereum);
					await window.ethereum.enable();
					const web3 = window.web3;
					let splitedMetaMaskAddress;
					if (metaMaskAccount) {
						splitedMetaMaskAddress =
							metaMaskAccount[0].substring(0, 6) +
							"......" +
							metaMaskAccount[0].substring(
								metaMaskAccount[0].length - 4,
								metaMaskAccount[0].length
							);
					}
					// const chainIdDec = await web3.eth.getChainId();
					// if (chainIdDec != 1) {
					// 	await web3.currentProvider.request({
					// 		method: "wallet_switchEthereumChain",
					// 		params: [{ chainId: "0x1" }],
					// 	});
					// }

					console.log(metaMaskAccount[0]);

					Context.setConnectedAccount(metaMaskAccount[0]);
					Context.setspilittedAccount(splitedMetaMaskAddress);
					Context.setConnected(true);
					// Context.getData();
				} else {
					Context.setspilittedAccount("Connect");
					Context.setConnectedAccount("Connect");
					Context.setConnected(false);
				}
			});
		}
	}, []);

	// async function getData() {
	// 	console.log("GET USER BALANCE");
	// 	window.web3 = new Web3(window.ethereum);
	// 	const web3 = window.web3;
	// 	console.log("staking page ", Context.connectedAccount);
	// 	console.log(Context.AuraContract);
	// 	const balance = await Context.AuraContract.methods
	// 		.balanceOf(Context.connectedAccount)
	// 		.call();
	// 	console.log(balance, "balance");
	// 	const format = web3.utils.fromWei(balance);
	// 	Context.setAuraBalance(format);
	// 	const allowance = await Context.AuraContract.methods
	// 		.allowance(Context.connectedAccount, REACT_APP_STAKING_CONTRACT_ADDRESS)
	// 		.call();
	// 	let aprvamount = web3.utils.fromWei(allowance);
	// 	Context.setApprovedAmount(aprvamount);
	// 	console.log(allowance, "approved tokens");
	// 	const apr = await Context.StakingContract.methods.CurrentAPR().call();
	// 	console.log(apr);
	// 	Context.setAPR(apr);
	// 	const isstaked = await Context.StakingContract.methods
	// 		.HasStake(Context.connectedAccount)
	// 		.call();
	// 	Context.setStaked(isstaked);
	// 	console.log(isstaked);
	// 	const accreward = await Context.StakingContract.methods
	// 		.TotalAccumulatedReward(Context.connectedAccount)
	// 		.call();
	// 	Context.setAccumulatedReward(accreward);
	// 	const pendingreward = await Context.StakingContract.methods
	// 		.TotalPendingReward(Context.connectedAccount)
	// 		.call();
	// 	let pendingrwd = Web3.utils.fromWei(pendingreward);
	// 	let pendingdprecise = Number(pendingrwd).toFixed(2);
	// 	console.log(pendingdprecise, "pending reward");
	// 	Context.setPendingReward(pendingdprecise);
	// 	let currentstake = await Context.StakingContract.methods
	// 		.CurrentlyStaked(Context.connectedAccount)
	// 		.call();
	// 	currentstake = web3.utils.fromWei(currentstake);
	// 	Context.setCurrentlyStaked(currentstake);

	// 	let Withdrawal = await Context.StakingContract.methods
	// 		.TotalWithdrawal(Context.connectedAccount)
	// 		.call();
	// 	Withdrawal = web3.utils.fromWei(Withdrawal);
	// 	Context.settotalWithdrawal(Withdrawal);
	// }

	return (
		<div
			ref={scrollRef}
			data-scroll-position="top"
			className="App"
			data-scroll-section
		>
			<BrowserRouter>
				<Nav></Nav>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route
						path="/Stake-pool"
						element={
							<LoadingOverlay
								active={Context.showOverlay}
								spinner
								text={Context.overlayMessage}
							>
								<Reward />
							</LoadingOverlay>
						}
					></Route>
					<Route
						path="/Staking"
						element={
							<LoadingOverlay
								active={Context.showOverlay}
								spinner
								text={Context.overlayMessage}
							>
								<Staking />
							</LoadingOverlay>
						}
					></Route>
					{/* <Route path="/Staking" element={<Pool />}></Route> */}
					<Route path="/ComingSoon" element={<ComingSoon />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
