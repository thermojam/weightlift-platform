export const isAdminOrModerator = (role: string | undefined): boolean => {
    return role === 'ADMIN' || role === 'MODERATOR';
};

export const isAdmin = (role: string | undefined): boolean => {
    return role === 'ADMIN';
};

