/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./Nav.css";

export default function Nav() {
	const Context = useContext(AppContext);
	const Navigate = useNavigate();
	const [navbarOpen, setNavbarOpen] = useState(false);
	function showNav() {
		const navbtn = document.getElementById("mobile-menu-2");
		navbtn.classList.toggle("hidden");
	}

	const navbar = document.querySelector(".nav-fixed");
	window.onscroll = () => {
		if (window.scrollY > 10) {
			navbar.classList.add("nav-active");
		} else {
			navbar.classList.remove("nav-active");
		}
	};

	// $(document).ready(function () {
	// 	var scroll_start = 0;
	// 	var startchange = $("#startchange");
	// 	var offset = startchange.offset();
	// 	if (startchange.length) {
	// 		$(document).scroll(function () {
	// 			scroll_start = $(this).scrollTop();
	// 			if (scroll_start > offset.top) {
	// 				$(".navbar-default").css("background-color", "rgba(0,0,0,0.7");
	// 			} else {
	// 				$(".navbar-default").css("background-color", "transparent");
	// 			}
	// 		});
	// 	}
	// });

	return (
		<>
			<nav
				className="border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 fixed-top nav-fixed "
				id="nav"
			>
				<div className="container flex flex-wrap justify-between items-center mx-auto py-5">
					<a
						href="#"
						className="flex items-center"
						onClick={() => Navigate("/")}
					>
						<h1 className="text-primary font-bold text-3xl">AURA GOLD</h1>
					</a>
					<div className="flex items-center md:order-2">
						<div
							className="hidden z-50 my-4 text-base list-none bg-red-500 rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
							id="dropdown"
							style={{
								position: "absolute",
								inset: "0px auto auto 0px",
								transform: "translate3d(1015px, 1765.5px, 0px)",
							}}
							// style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(1015px, 1765.5px, 0px);"
							data-popper-placement="bottom"
						></div>
						<button
							data-collapse-toggle="mobile-menu-2"
							type="button"
							className="inline-flex items-center p-2 ml-1 text-sm text-white rounded-lg md:hidden "
							aria-controls="mobile-menu-2"
							aria-expanded="false"
							onClick={showNav}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-10 h-10"
								fill="#f5af04"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"
								></path>
							</svg>
							<svg
								className="hidden w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</div>
					<div
						className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1 navbar"
						id="mobile-menu-2"
					>
						<ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium text-right px-5">
							<li>
								<a
									className="text-lg cursor-pointer"
									onClick={() => Navigate("/Dragons")}
								>
									Tokonomics
								</a>
							</li>
							<li>
								<a
									className="text-lg cursor-pointer"
									onClick={() => Navigate("/ComingSoon")}
								>
									Market
								</a>
							</li>
							<li>
								<a
									className="text-lg cursor-pointer"
									onClick={() => Navigate("/staking")}
								>
									Staking
								</a>
							</li>
							<li>
								<a className="text-lg cursor-pointer">Roadmap</a>
							</li>
							<li>
								<a
									className="text-lg cursor-pointer"
									onClick={() => Navigate("/Team")}
								>
									Team
								</a>
							</li>
							<li>
								<a
									className="text-lg cursor-pointer"
									onClick={() =>
										window.open(
											"https://whitepaper.dragonsofmidgard.com/dragons-of-midgard/"
										)
									}
								>
									Whitepaper
								</a>
							</li>

							<li>
								<>
									<div
										onClick={Context.connect}
										className="connect-btn ms-auto text-md text-black cursor-pointer"
									>
										{Context.spilittedAccount}
									</div>
								</>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
