const signIn = async () => {
    document.getElementById("errors").innerHTML = '<img src="assets/img/logo/fetch_loader.gif"/>';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
  
    const uri = `${host}/api/v1/users/signin`;
    const h = new Headers({ 'content-type': 'application/json' });
    const body = {
      email,
      password
    };
  
    const req = new Request(uri, {
      method: 'POST',
      headers: h,
      body: JSON.stringify(body),
    });

   try {
    const response = await fetch(req);
    const data = await response.json();
    if(data.errors){
        let errorString = ''
        for (var key in data.errors) {
            errorString = errorString + `<p>${data.errors[key]}</p>`;
        }
        document.getElementById("errors").innerHTML = errorString;
        return false
    }
    if(data.status === 401){
      document.getElementById("errors").innerHTML=`<p>${data.message}</p>`;
      return false
    }
    if(data.status === 200){
      setCookie('first_name', data.data.first_name, 1);
      localStorage.setItem("user_data", JSON.stringify(data.data));
      if(data.is_admin){
        window.location.replace("admin.html");
      }else{
        window.location.replace("index.html");
      }
      return false;
    }
   } catch(e){
       console.log(e);
   }
   
    return false;
  }