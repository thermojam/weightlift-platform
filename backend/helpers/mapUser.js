const ROLES = require('../constants/roles');

const roleMap = {
    [ROLES.ADMIN]: 'ADMIN',
    [ROLES.MODERATOR]: 'MODERATOR',
    [ROLES.USER]: 'USER',
};

module.exports = function (user) {
    return {
        id: user.id,
        login: user.login,
        role: roleMap[user.role] || 'USER',
        isActive: user.isActive !== undefined ? user.isActive : true,
        registeredAt: user.createdAt,
    };
};
