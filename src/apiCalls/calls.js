module.exports = function () {
    return {
      getAllTasks: function () {
        const headers = new Headers({
          Accept: "*/*",
        });
        fetch("localhost:3000/tasks", {
          method: "GET",
          headers: headers,
        })
          .then((response) => {
            console.log(response)
            if (response.ok) {
              return response.json();
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      },
      createTask: function (description) {
        const headers = new Headers({
          Accept: "*/*",
        });
        fetch("localhost:3000/task/", {
          method: "POST",
          headers: headers,
          body: new URLSearchParams({
            'description': description
          })
        })
          .then((response) => {
            console.log(response)
            if (response.ok) {
              return response.json();
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      },
      updateTask: function (id, description, done) {
        const url = "localhost:3000/task/" + id;
        const headers = new Headers({
            "Accept": "*/*",
          });
        fetch(url, {
            method:'PUT',
            headers: headers,
            body: new URLSearchParams({
              'description': description,
              'done': done
            })
        }).then(response => {
            if(!response.ok){
                return response.json();
            }
            }).catch((error) => {
            alert(error.message)
        });
      },
      deleteTask: function (id) {
        const url = "localhost:3000/task/" + id;
        const headers = new Headers({
            "Accept": "*/*",
          });
        fetch(url, {
            method:'DELETE',
            headers: headers,
        }).then(response => {
            if(!response.ok){
                return response.json();
            }
            }).then( data => alert("Task deleted with id: " + id)).catch((error) => {
            alert(error.message)
        });
      }
    };
  };