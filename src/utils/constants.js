export const frontendBaseUrl = "http://localhost:8000/"
export const baseUrl = "http://localhost:8000/api/"

// export const baseUrl = "http://localhost:8001/api/";
export const headers = { "Content-Type": "application/json" };

export const loggedInUser = JSON.parse(
    localStorage.getItem("piczanguUserDetails")
);

export const projectName = 'Job Crawler'
export const author = 'victor'
