
const Button = ({ text, icon, customStyles, onclick }) => {
	return (
		<button
      style={{fontSize:'13px'}}
			className={` text-primary-gray-2 flex items-center text-red-800 d-flex font-semibold capitalize f-c hover:opacity-90 px-3 py-2 rounded-md transition ${customStyles}`}
			onClick={onclick}
		>
			<span>{text}</span>
			<span>{icon}</span>
		</button>
	);
};

export default Button;
