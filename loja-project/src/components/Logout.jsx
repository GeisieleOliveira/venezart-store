import React from 'react';

function Logout(){
    const handleLogout = async () => {
        try{
            const response = await 
            fetch('http://127.0.0.1:5000/api/signup',{
                method: 'POST',
                credentials: 'include'
            }
            );

            const data = await response.json();

            if(response.ok){
                alert(data.message);
                navigate("/login");
            }else{
                alert('Erro ao deslogar');
            }
        }catch(error){
            console.error('Erro ao fazer logout:', error);
        }
    };
}
export default Logout