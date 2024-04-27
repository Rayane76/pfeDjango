

function logout(navigate) {
    localStorage.removeItem("auth");
    navigate("/login");
}


function getUser() {
const auth = JSON.parse(localStorage.getItem("auth")) || null;
if (auth) {
    return auth.user_id;
} else {
    return null;
}
}



export { getUser   , logout};