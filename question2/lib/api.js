let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA4OTI4LCJpYXQiOjE3NDM2MDg2MjgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjJiNzkzMWEyLTcyNDMtNDU1Ny1hZTljLTdkZWQ0NGRiNWZlZCIsInN1YiI6IjIyMDUxODY5QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MTg2OUBraWl0LmFjLmluIiwibmFtZSI6InByYXRlZWsgYWRpdHlhIiwicm9sbE5vIjoiMjIwNTE4NjkiLCJhY2Nlc3NDb2RlIjoibndwd3JaIiwiY2xpZW50SUQiOiIyYjc5MzFhMi03MjQzLTQ1NTctYWU5Yy03ZGVkNDRkYjVmZWQiLCJjbGllbnRTZWNyZXQiOiJ5U3V4RldCR3BUU3VUUFluIn0.Dx5rxE1Mf0SJIqFvHUEBrXK6Lg-J_pS-9qdIrInvpy4";


export async function getAuthToken() {
  return authToken;
}

export async function fetchWithAuth(url) {
  try {
    const token = await getAuthToken();
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

export async function getUsers() {
  return fetchWithAuth("http://20.244.56.144/evaluation-service/users");
}

export async function getUserPosts(userId) {
  return fetchWithAuth(`http://20.244.56.144/evaluation-service/users/${userId}/posts`);
}

export async function getPostComments(postId) {
  return fetchWithAuth(`http://20.244.56.144/evaluation-service/posts/${postId}/comments`);
}
