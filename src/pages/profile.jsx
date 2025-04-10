import React, { useState } from 'react';
import { useStore } from '../store/authStore';
import editIcon from '../assets/edit-icon.png'
import ProfileUpdatePopup from '../components/ProfileUpdatePopup';

const Profile = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const user = useStore((state) => state.user);

    return (
        <div>
            <div class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
                <div class="rounded-t-lg h-32 overflow-hidden">
                    <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                </div>
                <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <img class="object-cover object-center h-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front' />
                </div>
                <div class="text-center mt-2">
                    <h2 class="font-semibold">{user.name}</h2>
                    <p class="text-gray-500">{user.email}</p>
                </div>
                <div class="p-4 border-t-2 border-gray-400 mx-8 mt-2">
                    <button class=" block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2 flex justify-center items-center gap-3"
                     onClick={() => setIsPopupOpen(true)}>
                        <img className='h-[15px]' src={editIcon} alt="" />Edit Profile
                    </button>
                </div>
            </div>
            <div className="p-10">
                <ProfileUpdatePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} userData={user} />
            </div>
        </div>
    );
};

export default Profile;