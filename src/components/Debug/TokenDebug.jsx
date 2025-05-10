import React from 'react';
import { useAuth } from '../../context/AuthContext';

const TokenDebug = () => {
    const { getToken } = useAuth();
    const token = getToken();

    return (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-md">
            <h3 className="text-lg font-bold mb-2">Token Debug</h3>
            <div className="break-all">
                <p className="text-sm">Token: {token || 'No token found'}</p>
            </div>
        </div>
    );
};

export default TokenDebug; 