import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import closeIcon from "../assets/close-icon.png";
import { userUpdate } from "../services/userService";
import { useStore } from "../store/authStore";
import { convertToBase64 } from "../utils/convertToBase64 ";
import InputField from "./form_elements/InputField";
import PrimaryButton from "./form_elements/PrimaryButton";

const ProfileUpdatePopup = ({ isOpen, onClose, userData }) => {
    const [visible, setVisible] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [notMatch, setNotMatch] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const { setUser } = useStore((state) => state);

    const methods = useForm({
        defaultValues: {
            name: userData.name,
        },
    });

    const { register, watch, handleSubmit, reset } = methods;

    const isPasswordChangeChecked = watch("changePassword", false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            setTimeout(() => setAnimate(true), 10);
        } else {
            setAnimate(false);
            setTimeout(() => setVisible(false), 300);
        }
        if (userData) {
            reset({
                name: userData.name,
            });
        }
        setPreviewUrl(userData.profileImage || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080");
    }, [isOpen, userData]);

    if (!visible) return null;

    const onSubmit = async (data) => {
        try {
            if (changePassword && data.newPassword !== data.confPassword) {
                setNotMatch(true);
                return;
            }
            const userId = userData.id;
            const updatedData = {
                name: data?.name,
            };

            if (data?.newPassword) {
                updatedData.password = data.newPassword;
            }

            if (imageFile) {
                updatedData.profileImage = await convertToBase64(imageFile);
            }
            const response = await userUpdate(userId, updatedData);
            setUser(response.user);
            onClose();
        } catch (error) { }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const imageURL = URL.createObjectURL(file);
            setPreviewUrl(imageURL);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs text-gray-700 w-full" onClick={onClose}>
            <div className={`bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-out ${animate ? "scale-100 opacity-100" : "scale-90 opacity-0"}`} onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Update Profile</h2>
                    <img src={closeIcon} className="h-[20px] cursor-pointer" alt="close" onClick={onClose} />
                </div>
                <div className="flex justify-center  w-full gap-5">
                    <div className="mx-auto relative justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${previewUrl})` }}
                    >
                        <div class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                            <input type="file" name="profile" id="upload_profile" hidden required onChange={handleImageChange} />
                            <label for="upload_profile">
                                <svg
                                    data-slot="icon"
                                    class="w-6 h-5 text-blue-700 cursor-pointer"
                                    fill="none"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                                    ></path>
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                                    ></path>
                                </svg>
                            </label>
                        </div>
                    </div>
                    <div className="w-[370px]">
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <InputField name="name" label="Enter Your Name"
                                        rules={{
                                            required: "This field is required",
                                        }}
                                    />
                                </div>
                                <div class="flex items-start mb-5">
                                    <div class="flex items-center h-5">
                                        <input {...register("changePassword")} id="changePassword" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-100" />
                                    </div>
                                    <label for="changePassword" class="ms-2 text-sm font-medium text-gray-700 ">Change password</label>
                                </div>
                                <div>
                                    <InputField name="newPassword" label="Enter New Password" type="password" maxLength={9} disabled={!isPasswordChangeChecked}
                                        rules={{
                                            required: isPasswordChangeChecked ? "New password is required" : false,
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
                                                message: "Must include a letter, number, and special character",
                                            },
                                        }}
                                    />
                                </div>
                                <div>
                                    <InputField name="confPassword" label="Confirm New Password" type="password" maxLength={9} disabled={!isPasswordChangeChecked}
                                        rules={{
                                            required: isPasswordChangeChecked ? "Confirmation required" : false,
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
                                                message: "Must include a letter, number, and special character",
                                            },
                                        }}
                                        onChange={() => setNotMatch(false)}
                                        customError={notMatch ? "Passwords do not match" : ""}
                                    />
                                </div>
                                <div className="flex justify-end mt-2">
                                    <PrimaryButton label="Save" />
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdatePopup;
