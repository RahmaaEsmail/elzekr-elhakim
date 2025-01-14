"use client";

import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
// import { usePathname } from "next/navigation";
import React, {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
// import { AyahType, SurahType } from "./Home/Index";
// import Image from "next/image";
// import quranImage from "../../public/Quran.png";
// import bismillahImage from "../../public/bismillah.png";
// import ayahIcon from "../../public/ayah-icon.svg";
import Button from "./UI/Button";
import  { useLocation ,Link} from "react-router-dom";
import Loading from "./UI/Loading";
// import { useAppDispatch, useAppSelector } from "@/app/rtk/hooks";
// import {
// 	addSurah,
// 	removeSurah,
// 	updateSurahsListLS,
// } from "@/app/rtk/slices/listSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addSurah, removeSurah, updateSurahsListLS } from "../../store/slices/listSlice";

const ReadCom = () => {
	const {pathname} = useLocation();
	let surahNumber = Number(pathname.split("/")[pathname.split("/").length - 1]);

	const [surah, setSurah] = useState(null);
	const [currentAyah, setCurrentAyah] = useState(null);
	const [currentAyahNumber, setCurrentAyahNumber] = useState(1);

	let surahTextContainerRef = useRef(null);

	const [isSurahInList, setIsSurahInList] = useState(null);

	const state = useSelector(state => state.listSlice);
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			const ayahIsActive =
				surahTextContainerRef.current?.querySelector(".active");

			if (
				ayahIsActive?.offsetTop != null &&
				surahTextContainerRef.current != null
			) {
				let scrollLimit =
					ayahIsActive?.offsetTop -
					surahTextContainerRef.current?.offsetHeight -
					200;
				const scrollInterval = setInterval(() => {
					if (
						surahTextContainerRef.current != null &&
						surahTextContainerRef.current.scrollTop <= scrollLimit
					) {
						surahTextContainerRef.current.scrollTop =
							surahTextContainerRef.current.scrollTop += 50;
					} else {
						clearInterval(scrollInterval);
					}
				}, 1);
			}
		}, 1000);
	}, []);

	const fetchSurah = useCallback(async () => {
		try {
			const resp = await axios.get(
				`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
			);
			const { data } = resp;
			setSurah(data.data);
			setCurrentAyahNumber(data.data.ayahs[0].number);
			setCurrentAyah(data.data.ayahs[0]);
			const lastAyahFromLS = localStorage.getItem("lastAyah");
			if (lastAyahFromLS != null) {
				setLastAyah();
			}
		} catch (err) {
			console.log(err);
		}
	}, [surahNumber]);

	useEffect(() => {
		fetchSurah();
	}, [fetchSurah]);

	useEffect(() => {
		const lastAyahFromLS = localStorage.getItem("lastAyah");

		if (currentAyah) {
			if (lastAyahFromLS !== null) {
				const lastAyahObjFromLS = JSON.parse(lastAyahFromLS);

				lastAyahObjFromLS.map(
					(item) => {
						const isDuplicated = lastAyahObjFromLS.find(
							(item) =>
								item.surahNumber == surahNumber
						);

						if (item.surahNumber == surahNumber) {
							item.ayah = currentAyah;

							localStorage.setItem(
								"lastAyah",
								JSON.stringify(lastAyahObjFromLS)
							);
						} else if (item.surahNumber != surahNumber && !isDuplicated) {
							localStorage.setItem(
								"lastAyah",
								JSON.stringify(
									lastAyahObjFromLS.concat({ surahNumber, ayah: currentAyah })
								)
							);
						}
					}
				);
			} else {
				localStorage.setItem(
					"lastAyah",
					JSON.stringify([
						{
							surahNumber: surah?.number,
							ayah: currentAyah,
						},
					])
				);
			}
		}
	}, [currentAyah]);

	const setLastAyah = () => {
		const lastAyahFromLS = localStorage.getItem("lastAyah");

		if (lastAyahFromLS != null) {
			const lastAyahObjFromLS = JSON.parse(lastAyahFromLS);

			lastAyahObjFromLS.map((item) => {
				if (item.surahNumber == surahNumber) {
					setCurrentAyah(item.ayah);
					setCurrentAyahNumber(item.ayah.number);
				}
			});
		}
	};

	const checkIfSurahInTheList = useCallback(() => {
		let isDuplicated = false;

		state.list.map(
			(surah) => surah.number == surahNumber && (isDuplicated = true)
		);

		return isDuplicated;
	}, [state.list, surahNumber]);

	useEffect(() => {
		setIsSurahInList(checkIfSurahInTheList());
	}, [checkIfSurahInTheList]);

	const handleAddToList = (surah) => {
		dispatch(addSurah(surah));
		dispatch(updateSurahsListLS());
	};

	const handleRemoveFromList = (surah) => {
		dispatch(removeSurah(surah));
		dispatch(updateSurahsListLS());
	};

	return (
		<div className="h-full grid items-center container mx-auto  lg:px-4 lg:py-14">
			{surah ? (
				<>
					<div className="">
						<div className="flex justify-between items-center bg-gradient-to-l from-primary-color-5 to-primary-color max-w-[70rem] w-full h-40 mx-auto text-white p-4 rounded-t-md">
							<div className="p-3">
								<h2 className="text-2xl font-semibold">
									{surah?.name} - {surah?.englishName}
								</h2>
								<p className="text-xl mb-2">{surah?.englishNameTranslation}</p>
								<p className="text-lg !text-gray-200">
									{surah?.numberOfAyahs} Ayahs
								</p>
							</div>
							<div>
                <img		src={"/images/Quran.png"}
									alt="quranImage"
									quality={100}
									width={300}
									height={300}
									className="hidden md:block mb-8"/>

							</div>
						</div>
						<div className="max-w-[70rem] mx-auto bg-slate-50 rounded-bl-lg rounded-br-lg">
							<div className="flex justify-between items-center p-4 text-primary-gray">
								<h3 className="text-xl font-semibold w-full">
									{surah.englishName}
								</h3>
								<div className="text-center w-full">
									<h5 className="text-lg font-semibold">{surah.name}</h5>
									<h5>{surah.englishNameTranslation}</h5>
								</div>
								<h3 className="text-xl font-semibold w-full text-end">
									Ayah {currentAyahNumber}
								</h3>
							</div>
							<div className="w-full mt-8">
								<img
									src={"/images/bismillahImage"}
									alt="bismillahImage"
									quality={100}
									width={150}
									height={150}
									className="mx-auto"
								/>
							</div>
							<div
								ref={surahTextContainerRef}
								className="min-h-[20rem] max-h-[35rem] h-full text-2xl text-center font-semibold text-primary-gray mt-8 overflow-y-scroll bg-gradient-to-t from-primary-color-6"
								dir="rtl"
							>
								{surah.ayahs?.map((ayah) => (
									<div
										className="flex justify-center items-center gap-3 p-3"
										key={ayah.number}
									>
										<h1
											className={`text-xl md:text-2xl amiri-family ${
												currentAyahNumber == ayah.number &&
												"text-primary-color active"
											} hover:text-primary-color cursor-pointer`}
											onClick={async () => {
												setCurrentAyahNumber(ayah.number);
												setCurrentAyah(ayah);
											}}
										>
											{ayah.text}
										</h1>
										<div className="relative min-w-[50px] h-[50px] inline-block">
											<span className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-sm font-bold">
												{ayah.number}
											</span>
											<img
												src={"/images/ayah-icon.svg"}
												alt="ayahIcon"
												width={50}
												height={50}
											/>
										</div>
									</div>
								))}
							</div>
							<div className="relative border-t-2 p-4 flex flex-col-reverse md:flex-row justify-between items-center gap-4 mb-4 lg:mb-0 md:gap-12 bg-gradient-to-r from-primary-color-5 to-primary-color rounded-b-md">
								<div className="w-fit flex items-center gap-2 ">
                <Link
										to={
											surahNumber >= 114
												? "/"
												: `/readcom/${surahNumber + 1}`
										}
									>
										<Button
											text="التالى"
											icon={<IoIosArrowForward />}
											customStyles="bg-white !text-primary-color border px-4 py-2 flex-row-reverse"
										/>
									</Link>
                  <Link
										to={
											surahNumber <= 1 ? "/" : `/readcom/${surahNumber - 1}`
										}
									>
										<Button
											text="السابق"
											icon={<IoIosArrowBack />}
											customStyles="bg-white !text-primary-color border px-4 py-2"
										/>
									</Link>

								</div>
								<div className="w-full  flex items-center gap-2">
									<audio
										className="w-full h-full min-h-[45px]"
										src={`${currentAyah?.audio}`}
										controls
									/>

									<Button
										text=""
										icon={
											isSurahInList ? (
												<AiFillHeart size={28} className="text-primary-color" />
											) : (
												<AiOutlineHeart size={28} />
											)
										}
										customStyles="!text-primary-color bg-white"
										onclick={() =>
											isSurahInList
												? handleRemoveFromList(surah)
												: handleAddToList(surah)
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default ReadCom;
