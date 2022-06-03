import React from "react";
import "./Reward.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import Web3 from "web3";
// import { TailSpin } from "react-loader-spinner";

const { REACT_APP_STAKING_CONTRACT_ADDRESS } = process.env;

const Reward = () => {
	const Context = useContext(AppContext);
	const [reward, setReward] = useState(10);
	const [isapproved, setApproved] = useState(false);
	const [success, setSuccess] = useState(false);
	setTimeout(() => {
		document.getElementById("range-input").oninput = function () {
			var value = ((this.value - this.min) / (this.max - this.min)) * 100;
			this.style.background =
				"linear-gradient(to right, #f5af04 0%, #f5af04 " +
				value +
				"%, #fff " +
				value +
				"%, white 100%)";
		};
		document.getElementById("range-input-two").oninput = function () {
			var value = ((this.value - this.min) / (this.max - this.min)) * 100;
			this.style.background =
				"linear-gradient(to right, #f5af04 0%, #f5af04 " +
				value +
				"%, #fff " +
				value +
				"%, white 100%)";
		};
	}, 100);
	// function ShowmodalCalculate() {
	// 	const navbtn = document.getElementById("popup-modal");
	// 	navbtn.classList.toggle("hidden");
	// }
	// function stakemodal() {
	// 	const navbtn = document.getElementById("popup-stake");
	// 	navbtn.classList.toggle("hidden");
	// }
	useEffect(() => {
		const time = Context.stakeTime * 24 * 60 * 60;
		// console.log(time, Context.stakeAmount, Context.CurrentAPR);
		const calculatedReward =
			(time * parseInt(Context.stakeAmount) * parseInt(Context.CurrentAPR)) /
			31536000 /
			100;
		const preciseReward = calculatedReward.toPrecision(3);
		console.log(calculatedReward);
		setReward(preciseReward);

		Math.abs(Number(preciseReward)) >= 1.0e9
			? setReward(Math.abs(Number(preciseReward)) / 1.0e9 + "B")
			: // Six Zeroes for Millions
			Math.abs(Number(preciseReward)) >= 1.0e6
			? setReward(Math.abs(Number(preciseReward)) / 1.0e6 + "M")
			: // Three Zeroes for Thousands
			Math.abs(Number(preciseReward)) >= 1.0e3
			? setReward(Math.abs(Number(preciseReward)) / 1.0e3 + "K")
			: setReward(Math.abs(Number(preciseReward)));
	}, [Context.stakeAmount, Context.stakeTime]);

	useEffect(() => {
		let slider2 = document.getElementById("range-input-two");
		var value =
			((slider2.value - slider2.min) / (slider2.max - slider2.min)) * 100;
		slider2.style.background =
			"linear-gradient(to right, #f5af04 0%, #f5af04 " +
			value +
			"%, #fff " +
			value +
			"%, white 100%)";
	}, [Context.stakeAmount, Context.stakeTime]);

	useEffect(() => {
		let slider2 = document.getElementById("range-input");
		var value =
			((slider2.value - slider2.min) / (slider2.max - slider2.min)) * 100;
		slider2.style.background =
			"linear-gradient(to right, #f5af04 0%, #f5af04 " +
			value +
			"%, #fff " +
			value +
			"%, white 100%)";
	}, [Context.stakeAmount, Context.stakeTime]);

	async function approve() {
		setSuccess(true);
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
		const web3 = window.web3;
		// const metaMaskAccount = await web3.eth.getAccounts();
		// console.log(Context.connectedAccount);
		await Context.AuraContract.methods
			.approve(
				REACT_APP_STAKING_CONTRACT_ADDRESS,
				web3.utils.toWei(`${Context.stakeAmount}`)
			)
			.send({ from: Context.connectedAccount })
			.on("error", function (error) {
				setSuccess(false);
			})
			.on(
				"confirmation",
				async function (confNumber, receipt, latestBlockHash) {
					const allowance = await Context.AuraContract.methods
						.allowance(
							Context.connectedAccount,
							REACT_APP_STAKING_CONTRACT_ADDRESS
						)
						.call();
					let aprvamount = web3.utils.fromWei(allowance);
					// aprvamount = Number(aprvamount).toFixed(2);
					Context.setApprovedAmount(aprvamount);
					console.log(allowance, "New approved tokens");
					setSuccess(false);
				}
			);

		setApproved(true);
	}

	async function stake() {
		setSuccess(true);
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
		const web3 = window.web3;
		const time = Context.stakeTime * 24 * 60 * 60;
		// const metaMaskAccount = await web3.eth.getAccounts();
		// console.log(Context.connectedAccount);
		await Context.StakingContract.methods
			.Stake(`${Context.stakeAmount}`, time)
			.send({ from: Context.connectedAccount })
			.on("error", function (error) {
				setSuccess(false);
			})
			.on("confirmation", function (confNumber, receipt, latestBlockHash) {
				setSuccess(false);
			});
	}
	async function reStake() {
		setSuccess(true);
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
		const web3 = window.web3;
		const time = Context.stakeTime * 24 * 60 * 60;
		// const metaMaskAccount = await web3.eth.getAccounts();
		// console.log(Context.connectedAccount);
		await Context.StakingContract.methods
			.ReStake(`${Context.stakeAmount}`, time)
			.send({ from: Context.connectedAccount })
			.on("error", function (error) {
				setSuccess(false);
			})
			.on("confirmation", function (confNumber, receipt, latestBlockHash) {
				setSuccess(false);
			});
	}
	return (
		<>
			<div>
				<div className="py-20 h-100 pt-40" id="reward">
					<h1 className="heading text-6xl text-center text-primary">
						STAKING POOLS
					</h1>
					{/* <TailSpin type="TailSpin" color="#F5AF04" height={80} width={80} /> */}
					<p className="text-2xl text-center text-white">
						Stake $AURA & Earn $AURA
					</p>
					<div className="relative p-4 w-full max-w-xl  mx-auto mt-10">
						<div className="relative border-primary border  shadow bg-card">
							<div className="p-6 text-white">
								<h3 className="text-primary text-center py-5">
									Estimate your rewards
								</h3>
								<div className="flex justify-between">
									<p className="py-2 text-white text-sm">
										You stake{" "}
										<span className="text-xl text-primary">
											{Context.stakeAmount} $AURA
										</span>{" "}
									</p>
									<p className="py-2 text-white text-sm">
										Approved Tokens
										<span className="text-xl text-primary">
											&nbsp;{Context.approvedAmount} $AURA
										</span>{" "}
									</p>
								</div>
								<div className="flex items-center border border-gray-400">
									<div className="relative w-full ">
										<input
											type="number"
											className="  text-sm text-white block w-full  p-2.5 bg-transparent focus:border-transparent focus:outline-none"
											placeholder="Aura Amount"
											required=""
											// min={10}
											max={
												Context.AuraBalance < Context.minStake
													? Context.AllocatedRewards
													: Context.AuraBalance
											}
											value={Context.stakeAmount}
											onChange={(e) => {
												if (Context.AuraBalance > Context.minStake) {
													if (!(e.target.value > Context.AuraBalance)) {
														Context.setStakeAmount(e.target.value);
														console.log(e.target.value, "input value");
													}
												}
											}}
										/>

										<button
											type="button"
											className="flex absolute inset-y-0 right-0 items-center "
										></button>
									</div>

									<button
										type="submit"
										className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white rounded-lg "
									>
										AURA
									</button>
								</div>
								<div className="py-5">
									<input
										type="range"
										className="w-full"
										id="range-input"
										name="vol"
										min="10"
										max={
											Context.AuraBalance < Context.minStake
												? Context.AllocatedRewards
												: Context.AuraBalance
										}
										onChange={(e) => {
											Context.setStakeAmount(e.target.value);
										}}
										value={Context.stakeAmount}
									></input>
									<div className="flex justify-between text-sm">
										<div>
											<p>{Context.minStake}</p>
										</div>
										<div>
											<p>
												{Context.AuraBalance < 10
													? Context.AllocatedRewards
													: Context.AuraBalance}
											</p>
										</div>
									</div>
								</div>
								<p className="py-2 text-white text-sm">
									Locking it for
									<span className="text-xl text-primary">
										{Context.stakeTime} days
									</span>{" "}
								</p>
								<div className="flex items-center border border-gray-400">
									<div className="relative w-full ">
										<input
											type="number"
											className="  text-sm text-white block w-full disabled  p-2.5 bg-transparent focus:border-transparent focus:outline-none"
											placeholder="346"
											min={14}
											max={365}
											value={Context.stakeTime}
											onChange={(e) => {
												if (e.target.value > 365) {
												} else {
													Context.setStakeTime(e.target.value);
												}
											}}
											// required=""
										/>
										<button
											type="button"
											className="flex absolute inset-y-0 right-0 items-center "
										></button>
									</div>
								</div>
								<div className="py-5 range">
									<input
										type="range"
										className="w-full"
										name="vol"
										id="range-input-two"
										min="14"
										max="365"
										// defaultValue={0}
										value={Context.stakeTime}
										onChange={(e) => {
											Context.setStakeTime(e.target.value);
										}}
									></input>
									<div className="flex justify-between text-sm">
										<div>
											<p>Min Lock</p>
										</div>
										<div>
											<p>Max Lock</p>
										</div>
									</div>
								</div>

								<div className="flex py-3 justify-between">
									<div>
										<p className="text-sm">Your estimated rewards </p>
										<p className="text-xl text-primary">
											{reward ? <>{reward}</> : <>0</>} AURA
										</p>
									</div>
									<div>
										<p className="text-sm">Current APR </p>
										<p className="text-xl text-primary">
											{Context.CurrentAPR}%
										</p>
									</div>
								</div>
								{success ? (
									<>
										<div className="flex justify-center py-5">
											<div className="loader"></div>
										</div>
									</>
								) : (
									<>
										<div className="flex justify-center py-5">
											{Context.AuraBalance < 10 ? (
												<>
													<button
														className="border border-gray-400 w-8/12 py-2 text-gray-400 rounded-md bg-opacity-0 cursor-not-allowed transition-all"
														disabled
														onClick={() => {
															approve();
														}}
													>
														Approve Tokens
													</button>
												</>
											) : (
												<>
													<button
														className="border border-primary w-8/12 py-2 text-primary rounded-md hover:bg-primary hover:text-black transition-all"
														onClick={() => {
															approve();
														}}
													>
														Approve Tokens
													</button>
												</>
											)}
										</div>
										<div className="flex justify-center py-3">
											{Context.AuraBalance < 10 ? (
												<>
													<button
														className="border border-gray-400 w-8/12 py-2 text-gray-400 rounded-md bg-opacity-0 cursor-not-allowed transition-all"
														disabled
													>
														Stake Now
													</button>
												</>
											) : Context.isStaked ? (
												<>
													<button
														className="border border-primary w-8/12 py-2 text-primary rounded-md hover:bg-primary hover:text-black transition-all"
														onClick={() => {
															reStake();
														}}
													>
														Restake
													</button>
												</>
											) : (
												<>
													<button
														className="border border-primary w-8/12 py-2 text-primary rounded-md hover:bg-primary hover:text-black transition-all"
														onClick={() => {
															stake();
														}}
													>
														Stake Now
													</button>
												</>
											)}
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Reward;
