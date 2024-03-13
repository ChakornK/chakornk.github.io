"use client";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col justify-start items-center gap-4 bg-neutral-800 p-24 min-h-screen text-white">
			<h1 className="text-5xl poppins">ChakornK</h1>
			<h2 className="-mt-4 text-neutral-400">JavaScript developer</h2>
			<div className="flex gap-4">
				<Link
					href={"https://github.com/ChakornK"}
					target="_blank"
					className="flex justify-center items-center bg-[#fff] bg-opacity-5 hover:bg-opacity-10 rounded-lg w-12 h-12 transition-colors"
				>
					<FeatherIcon icon="github" />
				</Link>
				<Link
					href={"mailto:chakornk2007@gmail.com"}
					target="_blank"
					className="flex justify-center items-center bg-[#fff] bg-opacity-5 hover:bg-opacity-10 rounded-lg w-12 h-12 transition-colors"
				>
					<FeatherIcon icon="mail" />
				</Link>
			</div>

			<h1 className="mt-12 text-4xl poppins">Works</h1>
			<div className="flex flex-wrap gap-4">
				{[
					{
						url: "https://mission-monkey.lemon-studios.ca",
						title: "Mission Monkey",
						description: "Website for a funny monkey game.",
						image: "/img/MissionMonkey.png",
					},
					{
						url: "https://github.com/lemons-studios/lemon-studios-launcher",
						title: "Lemon Studios Launcher",
						description: "Launcher games made by Lemon Studios.",
						image: "/img/LemonStudios.png",
					},
					{
						url: "https://jheagles.netlify.app/",
						title: "JH Eagles app",
						description:
							"Horrible React Native app I made for a school project that I totally did not do the night before it was due.",
						image: "/img/JHEagles.png",
					},
				].map((e) => (
					<Link
						href={e.url}
						target="_blank"
						key={e.title}
						className="flex gap-5 border-[#fff1] bg-[#fff1] hover:bg-[#fff2] hover:scale-[1.02] shadow hover:shadow-sm p-6 border rounded-lg w-full md:w-[calc(100%/2-16px/2)] lg:w-[calc(100%/3-32px/3)] min-h-[8rem] transition-all duration-300"
					>
						{e.image && (
							<Image
								src={e.image}
								alt={e.title}
								width={96}
								height={96}
								className="shadow-sm rounded-lg w-24 h-24"
							/>
						)}
						<div className="flex flex-col gap-1">
							<p className="text-lg poppins">{e.title}</p>
							<p className="text-neutral-400 text-sm">{e.description}</p>
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
