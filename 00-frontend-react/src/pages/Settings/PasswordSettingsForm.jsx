import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from "@/utils/axios.customize";
import { AuthContext } from '@/components/context/auth.context';


const PasswordSettingsForm = () => {

    const { auth, setAuth } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        gender: '',
        nationality: '',
        phonenumber: ''
    });

    useEffect(() => {
        if (auth?.user) {
            setFormData(prev => ({
                ...prev,
                ...auth.user
            }));
        }
    }, [auth]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            toast.error('New password and confirm password do not match');
            return;
        }

        const payload = {
            email: auth?.user?.email, // lấy email từ context
            username: formData.username,
            password: formData.newPassword || '',
            currentPassword: formData.currentPassword || '',
            gender: formData.gender,
            nationality: formData.nationality,
            phonenumber: formData.phonenumber
        };
        console.log("Payload gửi đi:", payload);

        try {
            const data = await axios.put(`/api/users/update`, payload);

            if (data.success === true) {
                toast.success('Cập nhật thành công');

                const updatedUser = {
                    email: auth.user.email, // giữ lại email
                    username: formData.username,
                    gender: formData.gender,
                    nationality: formData.nationality,
                    phonenumber: formData.phonenumber
                };


                //  Update Context
                setAuth(prev => ({
                    ...prev,
                    user: updatedUser
                }));

                // ✅ Reset password fields
                setFormData({
                    ...formData,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                toast.error(data.message || 'Cập nhật thất bại');
            }
        } catch (err) {
            if (err.response) {
                toast.error('Lỗi: ' + (err.response.data.message || 'Unknown error'));
            } else if (err.request) {
                toast.error('Không nhận được phản hồi từ server');
            } else {
                toast.error('Lỗi kết nối server: ' + (err.message || 'Unknown error'));
            }
        }
    };

    return (
        <section className="flex-1">
            <article className="p-6 bg-white rounded-lg">
                <form className="gap-y-6" onSubmit={handleSave}>
                    <div className="mb-6">
                        <label htmlFor="username" className="block mb-2">User Name</label>
                        <input
                            type="text"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="p-3 w-full rounded-lg border"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="currentPassword" className="block mb-2">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="p-3 w-full rounded-lg border"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="newPassword" className="block mb-2">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="p-3 w-full rounded-lg border"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="p-3 w-full rounded-lg border"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="gender" className="block mb-2">Gender</label>
                        <input
                            type="text"
                            id="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="p-3 w-full rounded-lg border"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="nationality" className="block mb-2">Nationality</label>
                        <input
                            type="text"
                            id="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            className="p-3 w-full rounded-lg border"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="phonenumber" className="block mb-2">Phone number</label>
                        <input
                            type="text"
                            id="phonenumber"
                            value={formData.phonenumber}
                            onChange={handleChange}
                            className="p-3 w-full rounded-lg border"
                        />
                    </div>
                    <button type="submit" className="py-3 w-full text-white bg-blue-500 rounded-lg">
                        Save
                    </button>
                </form>
            </article>
        </section>
    );
};

export default PasswordSettingsForm;
