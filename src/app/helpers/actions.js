import Cookies from 'universal-cookie';

const cookies = new Cookies();

function logout(navigate) {
    cookies.remove("auth");
    navigate("/login");
}


function getUser() {
const auth = JSON.parse(cookies.get("auth")) || null;
if (auth) {
    return auth.user_id;
} else {
    return null;
}
}



export { getUser   , logout};