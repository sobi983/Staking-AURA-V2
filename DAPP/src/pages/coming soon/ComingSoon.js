import React from "react";
import { useNavigate } from "react-router";
import "./ComingSoon.css";

const ComingSoon = () => {
	const Navigate = useNavigate();
	return (
		<>
			<div className="w-full bg-black">
				<main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
					<h1 className="md:text-9xl text-6xl font-extrabold text-white text-center">
						Coming Soon
					</h1>
					<button className="mt-5">
						<a
							className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
							href="/"
						>
							<span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

							<span
								className="relative block px-8 py-3 bg-primary back-btn rounded-md text-white cursor-pointer"
								onClick={() => Navigate("/")}
							>
								Go Home
							</span>
						</a>
					</button>
				</main>
			</div>
		</>
	);
};

export default ComingSoon;
