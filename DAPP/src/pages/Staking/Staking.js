import "./Staking.css";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
// import Pool from "./Pool";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import StakingAbi from "../../StakingAbi.json";
import axios from "axios";
const abiDecoder = require("abi-decoder");
const {
	REACT_APP_AURA_CONTRACT_ADDRESS,
	REACT_APP_STAKING_CONTRACT_ADDRESS,
	REACT_APP_TESTNET_API,
	REACT_APP_OPENSEA_API,
} = process.env;
// import { useState } from "react";
// import Web3 from "web3";
// import { useState } from "react";
// const { REACT_APP_AURA_CONTRACT_ADDRESS, REACT_APP_STAKING_CONTRACT_ADDRESS } =
// 	process.env;

export default function Staking() {
	const Context = useContext(AppContext);
	const Navigate = useNavigate();
	const [transactions, setTransactions] = useState(null);
	const [success, setSuccess] = useState(true);

	useEffect(() => {
		decode();
	}, []);

	// function stakemodal() {
	// 	const navbtn = document.getElementById("popup-stake");
	// 	navbtn.classList.toggle("hidden");
	// }
	async function unStake() {
		await Context.StakingContract.methods
			.UnStake()
			.send({ from: Context.connectedAccount });
	}
	async function Withdrawal() {
		await Context.StakingContract.methods
			.Withdraw()
			.send({ from: Context.connectedAccount });
	}
	async function ClaimReward() {
		await Context.StakingContract.methods
			.Claim()
			.send({ from: Context.connectedAccount });
	}
	async function decode() {
		abiDecoder.addABI(StakingAbi);
		let transaction = [];
		axios
			.get(
				`${REACT_APP_TESTNET_API}/api?module=account&action=txlist&address=${REACT_APP_STAKING_CONTRACT_ADDRESS}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${REACT_APP_OPENSEA_API}`
			)
			.then((resp) => {
				// console.log(resp, "tx details");
				for (let i = 0; i < resp.data.result.length; i++) {
					let temp = {};
					const decodedData = abiDecoder.decodeMethod(
						resp.data.result[i].input
					);
					console.log(decodedData);
					temp.hash = resp.data.result[i].hash;
					temp.from = resp.data.result[i].from;
					temp.time = resp.data.result[i].timeStamp;
					temp.time = new Date(temp.time * 1000).toLocaleString();
					// console.log(first);
					temp.input = decodedData;
					transaction.push(temp);
				}
				console.log(transaction);
				setTransactions(transaction);
			});
	}
	// const txdata = transactions.hash;
	// console.log(txdata, "tx data output");
	return (
		<>
			<div className="bg-black pt-20" id="reward">
				<div className="container mx-auto ">
					<div className="py-20">
						<h1 className="text-center text-primary text-4xl">$Aura Staking</h1>
						<p className="text-center text-white bold mt-5">
							Stake your $AURA to earn extra $AURA
						</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<div className="">
							<div className="border border-primary mx-5 md:mx-20 ">
								<h1 className="text-primary text-center text-4xl mt-20">
									{Context.AuraBalance} AURA
								</h1>
								<p className="text-center text-white bold py-10">
									Available in your Wallet
								</p>
								<div className="px-5 mt-5">
									<div className="flex justify-evenly ">
										<button
											className="border border-primary w-5/12 py-2 rounded-md bg-primary text-black transition-all"
											onClick={() => Navigate("/stake-pool")}
											// onClick={stakemodal}
										>
											Stake
										</button>
										<button
											className="border border-primary w-5/12 py-2 text-primary rounded-md hover:bg-primary hover:text-black transition-all"
											onClick={() => Navigate("/stake-pool")}
										>
											Re-Stake
										</button>
									</div>
								</div>
								<div className="px-5 mt-5">
									<div className="flex justify-evenly">
										<button
											className="border border-primary w-5/12 py-2 text-primary rounded-md hover:bg-primary hover:text-black transition-all"
											onClick={() => {
												unStake();
											}}
										>
											Unstake
										</button>
										<button
											className="border border-primary w-5/12 py-2 text-primary rounded-md hover:bg-primary hover:text-black transition-all"
											onClick={() => {
												Withdrawal();
											}}
										>
											Withdrawal
										</button>
									</div>
								</div>
								<div className="px-2 mt-5 mb-10">
									<div className="flex justify-center">
										<button
											className="border border-primary w-10/12 py-2 text-primary rounded-md hover:bg-primary hover:text-black transition-all"
											onClick={() => {
												ClaimReward();
											}}
										>
											Claim Rewards
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="px-10 md:px-20 md:text-xl text-white ">
							<div>
								<div className="flex justify-between">
									<p>Total Accumulated reward</p>
									<p>{Context.AccumulatedReward}</p>
								</div>
								<div className="flex justify-between mt-10">
									<p>Total Pending Reward</p>
									<p>{Context.PendingReward}</p>
								</div>
								<div className="flex justify-between mt-10">
									<p>Total Staked</p>
									<p>{Context.currentlyStaked}</p>
								</div>
								<div className="flex justify-between mt-10">
									<p>Total withdrawal</p>
									<p>{Context.totalWithdrawal}</p>
								</div>
								<div className="flex justify-between mt-10">
									<p>Total Delegate</p>
									<p>{Context.totaldelegates}</p>
								</div>
								<div className="flex justify-between mt-10">
									<p>Total Staked in Pool</p>
									<p>{Context.inpool}</p>
								</div>
							</div>
						</div>
					</div>
					<br />
					<br />
					<div className=" lg:grid grid-cols-12 gap-2 py-10">
						<div className="col-span-12">
							<div className="px-5 relative overflow-x-auto shadow-md sm:rounded-lg ">
								<p className="text-primary font-bold py-5 px-5">
									Staking History
								</p>
								<table className="w-full text-sm text-left text-gray-500">
									<thead className="text-xs text-gray-700 uppercase">
										<tr>
											<th scope="col" className="px-6 py-3 text-white">
												TX Hash
											</th>
											<th scope="col" className="px-6 py-3 text-white">
												Account Address
											</th>
											<th scope="col" className="px-6 py-3 text-white">
												Type
											</th>
											{/* <th scope="col" className="px-6 py-3 text-white">
												Amount
											</th> */}
											<th scope="col" className="px-6 py-3 text-white">
												Date
											</th>
										</tr>
									</thead>
									<tbody>
										{transactions != null
											? transactions.map((tx, index) => (
													<tr key={index} className="border-b border-dashed">
														<th
															scope="row"
															className="px-6 py-4 font-medium text-primary whitespace-nowrap cursor-pointer"
														>
															<a
																href={`https://etherscan.io/tx/${tx.hash}`}
																target="_blank"
															>
																{tx.hash.substring(0, 4) +
																	"...." +
																	tx.hash.substring(
																		tx.hash.length - 4,
																		tx.hash.length
																	)}
															</a>
														</th>
														<td className="px-6 py-4 text-primary cursor-pointer">
															<a
																href={`https://etherscan.io/address/${tx.from}`}
																target="_blank"
															>
																{tx.from.substring(0, 4) +
																	"...." +
																	tx.from.substring(
																		tx.from.length - 4,
																		tx.from.length
																	)}
															</a>
														</td>
														<td className="px-6 py-4">
															{tx.input != undefined ? tx.input.name : null}
															{tx.from.name}
														</td>
														{/* <td className="px-6 py-4">2661.19 AURA</td> */}
														<td className="px-6 py-4">{tx.time}</td>
													</tr>
											  ))
											: null}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
