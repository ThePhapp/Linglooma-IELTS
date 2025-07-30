import { AuthContext } from '@/components/context/auth.context';
import React, { useContext } from 'react';
import { FcPlus } from "react-icons/fc";


const ProfileSettingsForm = () => {
    const { auth } = useContext(AuthContext);

    const username = auth?.user?.username;
    const email = auth?.user?.email;
    const gender = auth?.user?.gender;
    const phone = auth?.user?.phonenumber;
    const nationality = auth?.user?.nationality;

    return (
        <section className="flex-1">
            <article className="p-6 mb-6 bg-white rounded-lg">
                <div className="flex gap-4 items-center mb-6">
                    <div className="overflow-hidden w-12 h-12 rounded-full">
                        <img
                            src="/images/Profile1.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="font-semibold">{username}</h2>
                        <p className="text-gray-600">{email}</p>
                    </div>
                </div>
                <form className="gap-y-6">
                    <div className="mb-6">
                        <label htmlFor="fullName" className="block mb-2">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            value={username}
                            disabled // khong render name
                            className="p-3 w-full rounded-lg border border-solid"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="gender" className="block mb-2">Gender</label>
                        <div className="relative">
                            <input
                                id="gender-profile"
                                className="p-3 w-full bg-white rounded-lg border border-solid appearance-none"
                                disabled
                                value={gender}
                            />
                            <i className="ti ti-chevron-down absolute right-3 top-2/4 -translate-y-2/4" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="language" className="block mb-2">Nationality</label>
                        <div className="relative">
                            <input
                                id="language"
                                className="p-3 w-full bg-white rounded-lg border border-solid appearance-none"
                                value={nationality}
                                disabled
                            />

                            <i className="ti ti-chevron-down absolute right-3 top-2/4 -translate-y-2/4" />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="language" className="block mb-2">Phone number</label>
                        <div className="relative">
                            <input
                                id="phonenumber-profile"
                                className="p-3 w-full bg-white rounded-lg border border-solid appearance-none"
                                disabled
                                value={phone}
                            />
                            <i className="ti ti-chevron-down absolute right-3 top-2/4 -translate-y-2/4" />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/?locale=vi_VN" className="social-link">
                            <img src="/images/img_facebook_36x36.png" alt="Facebook" className="w-9 h-9" />
                        </a>
                        <a href="https://www.instagram.com/" className="social-link">
                            <img src="/images/img_instagram.png" alt="Instagram" className="w-9 h-9" />
                        </a>
                        <a href="https://www.linkedin.com/" className="social-link">
                            <img src="/images/img_linkedin.png" alt="LinkedIn" className="w-9 h-9" />
                        </a>
                        <a href="https://x.com/?lang=vi" className="social-link">
                            <img src="/images/img_twitter.png" alt="Twitter" className="w-9 h-9" />
                        </a>
                    </div>

                    <div>
                        <label className="block mb-2 mt-10">My email Address</label>
                        <div className="flex gap-5 items-center mb-2">
                            <i className="ti ti-mail text-blue-500" />
                            <span>{email}</span>
                            <span className="text-sm leading-5 text-gray-500">1 month ago</span>
                        </div>
                        <button type="button" className="text-blue-500 flex justify-content-center items-center gap-2">
                            <FcPlus />
                            Add Email Address
                        </button>
                    </div>
                </form>
            </article>
        </section>
    );
}

export default ProfileSettingsForm;
