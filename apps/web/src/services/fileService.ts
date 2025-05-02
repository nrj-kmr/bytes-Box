import socket from '../socket';

const API_URL = import.meta.env.API_URL || 'http://localhost:4000';

export const fetchFileTree = async () => {
    try {
        const response = await fetch(`${API_URL}/files`);
        const data = await response.json();
        return data.tree;
    } catch (error) {
        console.error('Error fetching file tree:', error);
        return [];
    }
}

export const fetchFileContent = async (path: string) => {
    try {
        const response = await fetch(`${API_URL}/files/content?path=${path}`);
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Error fetching file content:', error);
        return '';
    }
};

export const saveFileContent = (path: string, content: string) => {
    socket.emit('file:change', {
        path,
        content
    });
};