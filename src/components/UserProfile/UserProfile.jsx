import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import UrlHistoryModal from '../UrlHistoryModal/UrlHistoryModal';

Modal.setAppElement('#root');

export default function UserProfileModal({ isOpen, onRequestClose }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const [editModalOpen, setEditModalOpen] = useState(false);



     const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onRequestClose(); 
    };


    const [historyModalOpen, setHistoryModalOpen] = useState(false);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
        >
            <div className="bg-white shadow-xl rounded-xl p-6 w-[90vw] max-w-lg mx-auto">
                <h2 className="text-[18px] font-semibold text-center mb-3 uppercase md:text-[24px] text-[#1c1c1c]">
                    Your profile
                </h2>
                <div className="flex flex-col items-start">
                    <h5 className="text-[24px] font-medium">{user?.name}</h5>
                    <p>{user?.email}</p>

                    <div className="w-full flex flex-col md:flex-row justify-between gap-4 mt-4">
                        <Button
                            onClick={handleLogout}
                            variant="outlined"
                            fullWidth
                            sx={{
                                px: 3,
                                py: 1.2,
                                borderRadius: 2,
                                borderColor: '#d53232',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                textTransform: 'none',
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                                color: '#d53232',
                                '&:hover': {
                                    borderColor: '#a82828',
                                    color: '#a82828',
                                    backgroundColor: 'rgba(213, 50, 50, 0.04)',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#ccc',
                                },
                            }}
                        >
                            <LogoutIcon sx={{ fontSize: 18, mr: 1 }} />
                            Log out
                        </Button>

                        <Button
                        onClick={() => setEditModalOpen(true)}
                            variant="outlined"
                            fullWidth
                            sx={{
                                px: 3,
                                py: 1.2,
                                borderRadius: 2,
                                borderColor: '#3255D5',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                textTransform: 'none',
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                                color: '#3255D5',
                                '&:hover': {
                                    borderColor: '#2a46af',
                                    color: '#2a46af',
                                    backgroundColor: 'rgba(50, 85, 213, 0.04)',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#ccc',
                                },
                            }}
                        >
                            <CreateIcon sx={{ fontSize: 18, mr: 1 }} />
                            Edit profile
                        </Button>
                        
                    <Button
   onClick={() => setHistoryModalOpen(true)}
    variant="outlined"
    fullWidth
    sx={{
        px: 3,
        py: 1.2,
        borderRadius: 2,
        borderColor: '#10b981',
        fontWeight: 'bold',
        fontSize: '14px',
        textTransform: 'none',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        color: '#10b981',
        '&:hover': {
            borderColor: '#059669',
            color: '#059669',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
        },
    }}
>
    🕘 URL History
</Button>

                    </div>
                </div>
            </div>
            <UrlHistoryModal isOpen={historyModalOpen} onClose={() => setHistoryModalOpen(false)} />

            <EditProfileModal isOpen={editModalOpen} onRequestClose={() => setEditModalOpen(false)} />
        </Modal>
        
    );
}
