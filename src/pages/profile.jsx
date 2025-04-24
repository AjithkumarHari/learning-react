import React, { useState } from 'react';
import { useStore } from '../store/authStore';
import editIcon from '../assets/edit-icon.png'
import ProfileUpdatePopup from '../components/ProfileUpdatePopup';
import PrimaryButton from '../components/form_elements/PrimaryButton';

const Profile = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const user = useStore((state) => state.user);

    return (
        <>
            <div class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
                <div class="rounded-t-lg h-32 overflow-hidden">
                    <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                </div>
                <div class="mx-auto w-48 h-48 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <img class="object-cover object-center h-full" src={user.profileImage ? user.profileImage : 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'} alt='Woman looking front' />
                </div>
                <div class="text-center mt-2">
                    <h2 class="font-semibold">{user.name}</h2>
                    <p class="text-gray-500">{user.email}</p>
                </div>
                <div class="p-4 border-t-2 border-gray-400 flex justify-center items-center mx-5 mt-5">
                    <PrimaryButton label="Update Profile" sufixImage={editIcon} onClick={() => setIsPopupOpen(true) } />
                </div>
            </div>
            <div className="p-10">
                <ProfileUpdatePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} userData={user} />
            </div>
        </>
    );
};

export default Profile;