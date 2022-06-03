import React, { useState, createContext, useEffect } from "react";
import Web3 from "web3";
import AuraAbi from "../AuraAbi.json";
import StakingAbi from "../StakingAbi.json";
import axios from "axios";
require("dotenv").config();
const abiDecoder = require("abi-decoder");
const {
	REACT_APP_AURA_CONTRACT_ADDRESS,
	REACT_APP_STAKING_CONTRACT_ADDRESS,
	REACT_APP_TESTNET_API,
	REACT_APP_OPENSEA_API,
} = process.env;
export const AppContext = createContext();

const AppState = ({ children }) => {
	const [state, setState] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [connectedAccount, setConnectedAccount] = useState("");
	const [connected, setConnected] = useState(false);
	const [spilittedAccount, setspilittedAccount] = useState("Connect");
	const [AuraContract, setAuraContract] = useState("");
	const [StakingContract, setStakingContract] = useState("");
	const [AuraBalance, setAuraBalance] = useState();
	const [currentAPR, setCurrentAPR] = useState(0);
	const [approvedAmount, setApprovedAmount] = useState();
	const [stakeAmount, setStakeAmount] = useState(10);
	const [stakeTime, setStakeTime] = useState(14);
	const [CurrentAPR, setAPR] = useState();
	const [isStaked, setStaked] = useState(false);
	const [AccumulatedReward, setAccumulatedReward] = useState(0);
	const [PendingReward, setPendingReward] = useState(0);
	const [currentlyStaked, setCurrentlyStaked] = useState(0);
	const [totalWithdrawal, settotalWithdrawal] = useState(0);
	const [AllocatedRewards, setAllocatedRewards] = useState();
	const [totaldelegates, settotaldelegates] = useState(0);
	const [loading, setLoading] = useState(true);
	const [showOverlay, setShowOverlay] = useState(false);
	const [overlayMessage, setOverlayMessage] = useState("");
	const [transactions, setTransactions] = useState({});
	const [inpool, setinpool] = useState();
	const [minStake, setminStake] = useState(0);
	const connect = async () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
			const web3 = window.web3;
			const metaMaskAccount = await web3.eth.getAccounts();

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
			console.log(metaMaskAccount[0]);
			setConnectedAccount(metaMaskAccount[0]);
			setspilittedAccount(splitedMetaMaskAddress);
			setConnected(true);
			// console.log("CCC", connecctstatus);
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			window.alert(
				"Non-Ethereum browser detected. You should consider trying MetaMask!"
			);
		}
		console.log("connect", connectedAccount);
	};
	async function loadWeb3() {
		console.log("LOAD WEB3");
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		const AuraAddress = REACT_APP_AURA_CONTRACT_ADDRESS;
		const StakingAddress = REACT_APP_STAKING_CONTRACT_ADDRESS;
		const AuraCt = new web3.eth.Contract(AuraAbi, AuraAddress);
		const StakingCt = new web3.eth.Contract(StakingAbi, StakingAddress);
		console.log("AUra ct", AuraCt);
		setAuraContract(AuraCt);
		setStakingContract(StakingCt);
		// const apr = await StakingCt.methods.currentAPR().call();
		// setCurrentAPR(apr);
		setIsLoading(false);
		web3.eth.getAccounts(async function (err, metaMaskAccount) {
			if (metaMaskAccount.length == 0)
				console.log("User is not logged in to MetaMask");
			else {
				console.log("User is  logged in to MetaMask");
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
				setspilittedAccount(splitedMetaMaskAddress);
				console.log(metaMaskAccount[0]);
				setConnectedAccount(metaMaskAccount[0]);
				setConnected(true);
			}
		});
	}
	async function getData() {
		setShowOverlay(true);
		setOverlayMessage("Loading Details");
		console.log(overlayMessage, "overly msg");
		console.log("GET USER BALANCE");
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		console.log("staking page ", connectedAccount);
		console.log(AuraContract);
		const balance = await AuraContract.methods
			.balanceOf(connectedAccount)
			.call();
		console.log(balance, "balance");
		let format = web3.utils.fromWei(balance);
		format = Number(format).toFixed(2);
		setAuraBalance(format);
		const allowance = await AuraContract.methods
			.allowance(connectedAccount, REACT_APP_STAKING_CONTRACT_ADDRESS)
			.call();
		let aprvamount = web3.utils.fromWei(allowance);
		// aprvamount = Number(aprvamount).toFixed(2);
		setApprovedAmount(aprvamount);
		console.log(allowance, "approved tokens");
		const apr = await StakingContract.methods.CurrentAPR().call();
		console.log(apr);
		setAPR(apr);
		const isstaked = await StakingContract.methods
			.HasStake(connectedAccount)
			.call();
		setStaked(isstaked);
		console.log(isstaked);
		let accreward = await StakingContract.methods
			.TotalAccumulatedReward(connectedAccount)
			.call();
		accreward = Web3.utils.fromWei(accreward);
		accreward = Number(accreward).toFixed(2);
		setAccumulatedReward(accreward);
		const pendingreward = await StakingContract.methods
			.TotalPendingReward(connectedAccount)
			.call();
		let pendingrwd = Web3.utils.fromWei(pendingreward);
		let pendingdprecise = Number(pendingrwd).toFixed(2);
		console.log(pendingdprecise, "pending reward");
		setPendingReward(pendingdprecise);
		let currentstake = await StakingContract.methods
			.CurrentlyStaked(connectedAccount)
			.call();
		currentstake = web3.utils.fromWei(currentstake);
		currentstake = Number(currentstake).toFixed(2);
		setCurrentlyStaked(currentstake);

		let Withdrawal = await StakingContract.methods
			.TotalWithdrawal(connectedAccount)
			.call();
		Withdrawal = web3.utils.fromWei(Withdrawal);
		settotalWithdrawal(Withdrawal);
		let accReward = await StakingContract.methods.AllocationOfRewards().call();
		accReward = web3.utils.fromWei(accReward);
		accReward = Number(accReward).toFixed(2);
		setAllocatedRewards(accReward);
		let delegates = await StakingContract.methods.TotalDelegates().call();
		settotaldelegates(delegates);
		settotaldelegates(delegates);
		let pool = await StakingContract.methods.TotalStakedInPool().call();
		pool = web3.utils.fromWei(pool);
		pool = Number(pool).toFixed(2);
		setinpool(pool);
		let minstake = await StakingContract.methods.MinStakingAmount().call();
		minstake = web3.utils.fromWei(minstake);
		setminStake(minstake);
		setLoading(false);
		setShowOverlay(false);
	}

	useEffect(() => {
		loadWeb3();
		// getData();
		// decode();
	}, []);

	return (
		<AppContext.Provider
			value={{
				state,
				setState,
				connect,
				setConnected,
				connected,
				connectedAccount,
				setConnectedAccount,
				spilittedAccount,
				setspilittedAccount,
				loadWeb3,
				getData,
				AuraContract,
				isLoading,
				setAuraBalance,
				AuraBalance,
				StakingContract,
				setApprovedAmount,
				stakeAmount,
				setStakeAmount,
				stakeTime,
				setStakeTime,
				CurrentAPR,
				setAPR,
				approvedAmount,
				isStaked,
				setStaked,
				AccumulatedReward,
				setAccumulatedReward,
				PendingReward,
				setPendingReward,
				currentlyStaked,
				setCurrentlyStaked,
				totalWithdrawal,
				settotalWithdrawal,
				AllocatedRewards,
				setAllocatedRewards,
				showOverlay,
				loading,
				overlayMessage,
				setApprovedAmount,
				totaldelegates,
				inpool,
				minStake,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppState;
