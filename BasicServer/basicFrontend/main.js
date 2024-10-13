const displayUsers = async () => {
      try {
          // Make GET request using axios
          let response = await axios.get('http://localhost:2000/users');

          // The data is already parsed as JSON in axios
          let users = response.data.users;
          let display = document.querySelector('.right-pane');

          // Clear previous content (if necessary)
          display.innerHTML = "<h1 style='margin:5%' >Results</h1>";

          // Append each user's information
          users.forEach((user) => {
              display.innerHTML += `<p>id: ${user.id} name: ${user.name} age: ${user.age}</p>`;
          });
      } catch (error) {
          console.error('Error fetching users:', error);
      }
  }


  const displayUser = async () => {
    let id = document.getElementById('user').value;
    try {
        // Make GET request using axios
        let response = await axios.get(`http://localhost:2000/user?id=${id}`);

        // The data is already parsed as JSON in axios
        let user = response.data;
        let display = document.querySelector('.right-pane');

        // Preset content
        display.innerHTML = "<h1 style='margin:5%' >Results</h1>";

        // Append user's information
        display.innerHTML += `<p>id: ${user.id} name: ${user.name} age: ${user.age}</p>`;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
  }

  const addUser = async () => {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;

    try {
          // Define the data to be sent in the request body
          const newUser = {
              id: id,
              name: name,
              age: age
          };

          // Make the POST request
          const response = await axios.post('http://localhost:2000/add-user', newUser);


          let display = document.querySelector('.right-pane');
          // Preset content
          display.innerHTML = "<h1 style='margin:5%' >Results</h1>";

          // Append user's information
          display.innerHTML += `<p> user created </p>`;
      } catch (error) {
          // Preset content
          display.innerHTML = "<h1 style='margin:5%' >Results</h1>";

          // Append user's information
          display.innerHTML += `<p> Error </p>`;
      }
  }

  const updateUser = async () => {
      let id = document.getElementById('new-id').value;
      let name = document.getElementById('new-name').value;
      let age = document.getElementById('new-age').value;

      try {
          // Define the data to be sent in the request body
          const newUser = {
              id: id,
              name: name,
              age: age
          };

          // Make the PUT request
          const response = await axios.put(`http://localhost:2000/update-user?id=${id}`, newUser);

          // Log the response
          console.log();


          let display = document.querySelector('.right-pane');
          // Preset content
          display.innerHTML = "<h1 style='margin:5%' >Results</h1>";

          // Append user's information
          display.innerHTML += `<p>'User updated:', ${response.data.message} </p>`;
      } catch (error) {
          console.error('Error updating user:', error);
      }
  }

  const editUser  = async () => {
    let id = document.getElementById('user-id-choice').value;
    let choice = document.getElementById('choice').value;
    let value = document.getElementById('value').value;



    const url = `http://localhost:2000/patch-user?id=${id}&field=${choice}`;

     try {
       let field = {
         [choice]: value
       }

         const response = await fetch(url, {
             method: 'PATCH', // Use the PATCH method
             headers: {
                 'Content-Type': 'application/json', // Specify the content type
             },
             body: JSON.stringify(field), // Convert the field object to a JSON string
         });

         // Check if the response is ok (status in the range 200-299)
         if (!response.ok) {
             throw new Error(`Error: ${response.statusText}`); // Handle HTTP errors
         }

         const data = await response.json(); // Parse the response JSON
         console.log(data); // Log the response data
     } catch (error) {
         console.error("Error editing user:", error); // Log any errors that occur
     }
   }

  const deleteUser = async  () => {
    let id = document.getElementById('del').value;
    try {
        // Make GET request using axios
        let response = await axios.delete(`http://localhost:2000/user?id=${id}`);

        // The data is already parsed as JSON in axios
        let user = response.data.message;
        console.log(user)
        let display = document.querySelector('.right-pane');

        // Preset content
        display.innerHTML = "<h1 style='margin:5%' >Results</h1>";

        // Append user's information
        display.innerHTML += `<p>${user}</p>`;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
  }
