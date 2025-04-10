import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import closeIcon from '../assets/close-icon.png';
import { userUpdate } from '../services/userService';
import { useStore } from '../store/authStore';

const ProfileUpdatePopup = ({ isOpen, onClose, userData }) => {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [notMatch, setNotMatch] = useState(false);

  const { setUser } = useStore((state) => state);

  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: userData.name,
    }
  });

  const isPasswordChangeChecked = watch('changePassword', false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 300);
    }
    reset();
  }, [isOpen]);

  if (!visible) return null;

  const onSubmit = async data => {
    try {
      console.log('Form data:', data);
      if (changePassword && data.newPassword !== data.confPassword) {
        setNotMatch(true);
        return;
      }
      const userId = userData.id
      const updatedData = {
        name: data.name,
        password: data.newPassword,
      }

      const response = await userUpdate(userId, updatedData);
      setUser(response.user);
      onClose();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs text-gray-700 w-full" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={`bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-out
          ${animate ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        <div className='flex justify-between items-center mb-4'>
          <h2 className="text-xl font-bold">Update Profile</h2>
          <img src={closeIcon} className='h-[20px]' alt="close" onClick={onClose} />
        </div>
        <div className="flex justify-center  w-full gap-5">
          <div class="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">
            <div class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
              <input type="file" name="profile" id="upload_profile" hidden required />
              <label for="upload_profile">
                <svg data-slot="icon" class="w-6 h-5 text-blue-700" fill="none"
                  stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                  </path>
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                  </path>
                </svg>
              </label>
            </div>
          </div>
          <div className='w-[370px]'>
            <form action="" onSubmit={handleSubmit(onSubmit)} >
              <div>
                <div class="relative mt-2 w-full pb-5">
                  <input {...register("name", { required: true })} type="text" id="name" class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                  <label for="name" class="origin-[0] peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-5 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"> Enter Your Name </label>
                  {errors.name && <span className="absolute bottom-0 left-0 text-red-500 text-xs pl-3">Enter a valid name</span>}
                </div>
              </div>

              <div class="flex items-start mb-5">
                <div class="flex items-center h-5">
                  <input id="changePassword"  {...register("changePassword")} type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-100" />
                </div>
                <label for="changePassword" class="ms-2 text-sm font-medium text-gray-700 ">Change password</label>
              </div>

              <div>
                <div class="relative mt-2 w-full pb-5">
                  <input {...register("newPassword", {
                    required: isPasswordChangeChecked ? "New password is required" : false,
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
                      message: "Must include a letter, number, and special character",
                    },
                  })} type="password" maxLength={9} id="newPassword" class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                  <label for="newPassword" class="origin-[0] peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"> Enter New Password</label>
                  {errors.newPassword && <span className="absolute bottom-0 left-0 text-red-500 text-xs pl-3">{errors.newPassword.message}</span>}
                </div>
              </div>
              <div>
                <div class="relative mt-2 w-full pb-5">
                  <input {...register("confPassword", {
                    required: isPasswordChangeChecked ? "Confirmation required" : false,
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
                      message: "Must include a letter, number, and special character",
                    },
                    onChange: () => setNotMatch(false),
                  })} type="password" maxLength={9} id="confPassword" class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
                  <label for="confPassword" class="origin-[0] peer-placeholder-shown:top-1/3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"> Confirm New Password</label>
                  {errors.confPassword && <span className="absolute bottom-0 left-0 text-red-500 text-xs pl-3">{errors.confPassword.message}</span>}
                  {notMatch && <span className="absolute bottom-0 left-0 text-red-500 text-xs pl-3 mt-5">Passwords do not match</span>}
                </div>
              </div>
              <div className='flex justify-end mt-2'>
                <button className="text-white w-[150px]">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  );
};
export default ProfileUpdatePopup;