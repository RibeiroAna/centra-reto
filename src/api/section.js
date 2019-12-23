/**
 * Returns whether the user may contribute to cirkuleroj
 * @param  {User} user
 * @param {Array} komitatanoj
 * @return {boolean}
 */
export async function mayUserEditASection (komitatanoj, user) {
    if ((!user) || (!komitatanoj))  {
        return false;
    } 
    return komitatanoj.includes(user.email);
}