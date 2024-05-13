export const base_url = "https://dummyjson.com";

export function Login(endPoint: any, data: any) {
  return new Promise((resolve, reject) => {
    fetch(base_url + endPoint, {
      method: "POST",
      headers: {
        // Authorization: 'Bearer ' + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 400) {
          reject("Bad Request"); // Reject the promise if status code is 400
        } else {
          resolve(response.json());
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function GetCurrentUser(endPoint: any, token: any) {
  return new Promise((resolve, reject) => {
    fetch(base_url + endPoint, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          reject(response); // Reject the promise if status code is 400
        } else {
          resolve(response.json());
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
