import React from "react";

const PrimaryButton = ({
	label,
	onClick,
	disabled,
	prefilxImage,
	sufixImage,
	width = "fit",
}) => {
	return (
		<button className="primary-button gap-2" style={{ width }} onClick={onClick} disabled={disabled}>
			{prefilxImage && <img className="h-[15px]" src={prefilxImage} alt="" />}
			{label}
			{sufixImage && <img className="h-[15px]" src={sufixImage} alt="" />}
		</button>
	);
};

PrimaryButton.defaultProps = {
	onClick: () => { },
	disabled: false,
};

export default PrimaryButton;
